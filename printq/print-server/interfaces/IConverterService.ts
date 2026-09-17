export interface IConverterService {
  convertToPdf(inputPath: string, outputDir?: string): Promise<string>;
  isSupported(extension: string): boolean;
}
