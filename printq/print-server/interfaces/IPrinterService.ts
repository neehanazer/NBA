export interface PrintOptions {
  duplex?: boolean;
  copies?: number;
  color?: boolean;
  pageRanges?: string;
}

export interface PrintResult {
  success: boolean;
  printJobId: string;
  message: string;
}

export type PrintJobStatus = 'PENDING' | 'PRINTING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';

export interface IPrinterService {
  print(filePath: string, options: PrintOptions): Promise<PrintResult>;
  getJobStatus(printJobId: string): Promise<PrintJobStatus>;
  cancelJob(printJobId: string): Promise<boolean>;
}
