import { exec } from 'child_process';
import util from 'util';
import { IPrinterService, PrintJobStatus, PrintOptions, PrintResult } from '../interfaces/IPrinterService';

const execPromise = util.promisify(exec);

export class PrinterService implements IPrinterService {
  private printerName: string;
  private isCupsAvailable: boolean = false;
  private simulatedJobs = new Map<string, { status: PrintJobStatus; timestamp: number }>();

  constructor() {
    this.printerName = process.env.CUPS_PRINTER_NAME || 'default';
    this.checkCupsAvailability();
  }

  private async checkCupsAvailability() {
    try {
      await execPromise('lpstat -r');
      this.isCupsAvailable = true;
      console.log('[Printer] CUPS daemon is active');
    } catch {
      this.isCupsAvailable = false;
      console.log('[Printer] CUPS not available on this host. Using simulated printer service for development.');
    }
  }

  async print(filePath: string, options: PrintOptions = {}): Promise<PrintResult> {
    const copies = options.copies || 1;
    const duplex = options.duplex ? '-o sides=two-sided-long-edge' : '-o sides=one-sided';
    const color = options.color ? '-o print-color-mode=color' : '-o print-color-mode=monochrome';

    if (this.isCupsAvailable) {
      try {
        const cmd = `lp -d "${this.printerName}" -n ${copies} ${duplex} ${color} "${filePath}"`;
        const { stdout } = await execPromise(cmd);
        // lp output format: "request id is printerName-123 (1 file(s))"
        const match = stdout.match(/request id is\s+([\w-]+)/i);
        const printJobId = match ? match[1] : `cups-${Date.now()}`;
        return {
          success: true,
          printJobId,
          message: `Job dispatched to CUPS printer ${this.printerName}`,
        };
      } catch (err: any) {
        console.error('[Printer] CUPS lp error:', err.message);
        throw new Error(`Failed to print via CUPS: ${err.message}`);
      }
    }

    // Simulated printing in development
    const mockJobId = `mock-cups-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    this.simulatedJobs.set(mockJobId, { status: 'PRINTING', timestamp: Date.now() });

    // Automatically transition to COMPLETED after 5 seconds
    setTimeout(() => {
      const job = this.simulatedJobs.get(mockJobId);
      if (job && job.status === 'PRINTING') {
        this.simulatedJobs.set(mockJobId, { status: 'COMPLETED', timestamp: Date.now() });
      }
    }, 5000);

    return {
      success: true,
      printJobId: mockJobId,
      message: `Simulated print dispatch: ${copies} copies of ${filePath}`,
    };
  }

  async getJobStatus(printJobId: string): Promise<PrintJobStatus> {
    if (this.isCupsAvailable) {
      try {
        const { stdout } = await execPromise(`lpstat -o "${printJobId}"`);
        if (stdout.includes(printJobId)) {
          return 'PRINTING';
        }
        return 'COMPLETED';
      } catch {
        return 'COMPLETED';
      }
    }

    const job = this.simulatedJobs.get(printJobId);
    if (!job) return 'COMPLETED';

    // Transition to completed after 5 seconds
    if (Date.now() - job.timestamp > 5000) {
      job.status = 'COMPLETED';
    }
    return job.status;
  }

  async cancelJob(printJobId: string): Promise<boolean> {
    if (this.isCupsAvailable) {
      try {
        await execPromise(`cancel "${printJobId}"`);
        return true;
      } catch {
        return false;
      }
    }

    if (this.simulatedJobs.has(printJobId)) {
      this.simulatedJobs.set(printJobId, { status: 'CANCELLED', timestamp: Date.now() });
      return true;
    }
    return true;
  }
}

export const printerService = new PrinterService();
