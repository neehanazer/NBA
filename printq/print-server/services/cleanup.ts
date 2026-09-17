import fs from 'fs';
import path from 'path';

export class CleanupService {
  private uploadsDir: string;
  private retentionHours: number;

  constructor(uploadsDir: string, retentionHours: number = 24) {
    this.uploadsDir = uploadsDir;
    this.retentionHours = retentionHours;
  }

  async runCleanup(): Promise<number> {
    if (!fs.existsSync(this.uploadsDir)) return 0;

    let deletedCount = 0;
    const now = Date.now();
    const maxAgeMs = this.retentionHours * 60 * 60 * 1000;

    try {
      const files = fs.readdirSync(this.uploadsDir);
      for (const file of files) {
        if (file === '.gitkeep') continue;
        const filePath = path.join(this.uploadsDir, file);
        try {
          const stats = fs.statSync(filePath);
          if (now - stats.mtimeMs > maxAgeMs) {
            fs.unlinkSync(filePath);
            deletedCount++;
            console.log(`[Cleanup] Deleted expired file: ${file}`);
          }
        } catch (err: any) {
          console.warn(`[Cleanup] Could not inspect file ${file}:`, err.message);
        }
      }
    } catch (err: any) {
      console.error('[Cleanup] Error during file cleanup:', err.message);
    }

    return deletedCount;
  }

  startScheduledCleanup(intervalHours: number = 1) {
    console.log(`[Cleanup] Scheduled cleanup every ${intervalHours} hour(s) with retention of ${this.retentionHours}h`);
    setInterval(() => {
      this.runCleanup();
    }, intervalHours * 60 * 60 * 1000);
  }
}
