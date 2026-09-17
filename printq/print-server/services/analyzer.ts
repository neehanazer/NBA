import fs from 'fs';
import { exec } from 'child_process';
import util from 'util';
import { PDFDocument } from 'pdf-lib';

const execPromise = util.promisify(exec);

export interface AnalysisResult {
  pageCount: number;
  colorPages: number[];
  bwPages: number;
}

export class AnalyzerService {
  /**
   * Analyzes a PDF to determine total pages and which pages contain color.
   */
  async analyzePdf(pdfPath: string): Promise<AnalysisResult> {
    if (!fs.existsSync(pdfPath)) {
      throw new Error(`PDF file not found at: ${pdfPath}`);
    }

    let pageCount = 1;
    try {
      const buffer = fs.readFileSync(pdfPath);
      const pdfDoc = await PDFDocument.load(buffer, { ignoreEncryption: true });
      pageCount = pdfDoc.getPageCount();
    } catch (err: any) {
      console.warn(`[Analyzer] pdf-lib count failed: ${err.message}. Estimating from file.`);
      const content = fs.readFileSync(pdfPath, 'utf-8');
      const matches = content.match(/\/Type\s*\/Page[^s]/g);
      pageCount = matches ? matches.length : 1;
    }

    // Try Ghostscript inkcov device for per-page CMYK ink coverage
    const colorPages: number[] = [];
    try {
      const gsCommand = `gs -q -o - -sDEVICE=inkcov "${pdfPath}"`;
      const { stdout } = await execPromise(gsCommand);
      
      const lines = stdout.split('\n');
      let pageNum = 1;
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        const parts = trimmed.split(/\s+/).map(Number);
        // Format: Cyan Magenta Yellow Black (CMYK)
        if (parts.length >= 3 && !parts.some(isNaN)) {
          const [c, m, y] = parts;
          if (c > 0.001 || m > 0.001 || y > 0.001) {
            colorPages.push(pageNum);
          }
          pageNum++;
        }
      }
    } catch {
      // If Ghostscript is not installed (e.g. dev environment), inspect if any RGB/CMYK stream colors exist or default to BW
      try {
        const content = fs.readFileSync(pdfPath, 'utf-8');
        if (/(\/DeviceRGB|\/DeviceCMYK|rg\b|RG\b|k\b|K\b)/.test(content) && pageCount > 0) {
          // Heuristic: mark page 1 as color if document has color colorspace
          colorPages.push(1);
        }
      } catch {
        // Dev fallback
      }
    }

    const bwPages = Math.max(0, pageCount - colorPages.length);

    return {
      pageCount,
      colorPages,
      bwPages,
    };
  }
}

export const analyzerService = new AnalyzerService();
