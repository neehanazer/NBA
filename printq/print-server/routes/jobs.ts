import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { printerService } from '../services/printer';
import { notificationService } from '../services/notification';
import { Server as SocketIOServer } from 'socket.io';

export function createJobsRouter(io: SocketIOServer, uploadsDir: string) {
  const router = express.Router();

  // Print command trigger
  router.post('/print', async (req: Request, res: Response) => {
    try {
      const { jobId, filename, copies, duplex, color, phone } = req.body;

      if (!filename) {
        return res.status(400).json({ error: 'Filename is required' });
      }

      const filePath = path.join(uploadsDir, filename);
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ error: 'File not found on print server' });
      }

      // Dispatch to printer
      const result = await printerService.print(filePath, {
        copies: Number(copies) || 1,
        duplex: Boolean(duplex),
        color: Boolean(color),
      });

      // Notify clients over Socket.io
      io.emit('job:statusChange', {
        jobId,
        status: 'PRINTING',
      });

      // Optionally notify via WhatsApp
      if (phone) {
        notificationService.sendWhatsApp(phone, 'job_printing', {
          jobId: jobId || 'Unknown',
          printer: 'Shop Printer',
        });
      }

      return res.status(200).json({
        success: true,
        printJobId: result.printJobId,
        message: result.message,
      });
    } catch (err: any) {
      console.error('[Jobs Route Print Error]:', err);
      return res.status(500).json({ error: err.message });
    }
  });

  // Query printer job status
  router.get('/:jobId/status', async (req: Request, res: Response) => {
    try {
      const printJobId = req.params.jobId;
      const status = await printerService.getJobStatus(printJobId);
      return res.status(200).json({ status });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // Cancel print job
  router.post('/:jobId/cancel', async (req: Request, res: Response) => {
    try {
      const printJobId = req.params.jobId;
      const cancelled = await printerService.cancelJob(printJobId);
      return res.status(200).json({ success: cancelled });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // Download / View PDF file
  router.get('/file/:filename', (req: Request, res: Response) => {
    const filename = path.basename(req.params.filename);
    const filePath = path.join(uploadsDir, filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    return res.sendFile(filePath);
  });

  // Send Notification
  router.post('/notify', async (req: Request, res: Response) => {
    try {
      const { type, phone, subscription, payload } = req.body;

      if (type === 'whatsapp' && phone) {
        await notificationService.sendWhatsApp(phone, payload?.template || 'job_update', payload?.params || {});
      } else if (type === 'push' && subscription) {
        await notificationService.sendWebPush(subscription, payload);
      }

      return res.status(200).json({ success: true });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  return router;
}
