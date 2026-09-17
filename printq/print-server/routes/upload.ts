import express, { Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { converterService } from '../services/converter';
import { analyzerService } from '../services/analyzer';
import { Server as SocketIOServer } from 'socket.io';

export function createUploadRouter(io: SocketIOServer, uploadsDir: string) {
  const router = express.Router();

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, uploadsDir);
    },
    filename: (_req, file, cb) => {
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
      const ext = path.extname(file.originalname);
      cb(null, `file-${uniqueSuffix}${ext}`);
    },
  });

  const upload = multer({
    storage,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
    fileFilter: (_req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      if (converterService.isSupported(ext)) {
        cb(null, true);
      } else {
        cb(new Error(`Unsupported file format ${ext}. Allowed: PDF, DOCX, PPTX, XLSX, TXT.`));
      }
    },
  });

  router.post('/', upload.single('file'), async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const filePath = req.file.path;
      const originalName = req.file.originalname;
      const ext = path.extname(originalName).toLowerCase();
      const fileSize = req.file.size;
      const jobId = req.body.jobId;

      if (jobId) {
        io.to(`job:${jobId}`).emit('job:progress', { jobId, step: 'Converting file', progress: 30 });
      }

      // Convert to PDF if necessary
      let pdfPath = filePath;
      if (ext !== '.pdf') {
        pdfPath = await converterService.convertToPdf(filePath, uploadsDir);
      }

      if (jobId) {
        io.to(`job:${jobId}`).emit('job:progress', { jobId, step: 'Analyzing pages & color', progress: 70 });
      }

      // Analyze page count and color pages
      const analysis = await analyzerService.analyzePdf(pdfPath);

      if (jobId) {
        io.to(`job:${jobId}`).emit('job:progress', { jobId, step: 'Complete', progress: 100 });
      }

      return res.status(200).json({
        success: true,
        originalFile: path.basename(filePath),
        originalName,
        convertedPdf: path.basename(pdfPath),
        fileSize,
        pageCount: analysis.pageCount,
        colorPages: analysis.colorPages,
        bwPages: analysis.bwPages,
      });
    } catch (err: any) {
      console.error('[Upload Error]:', err);
      return res.status(500).json({ error: err.message || 'File processing failed' });
    }
  });

  return router;
}
