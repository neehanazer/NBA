import { Request, Response, NextFunction } from 'express';

export function requireApiKey(req: Request, res: Response, next: NextFunction) {
  const configuredKey = process.env.PRINT_SERVER_API_KEY;
  if (!configuredKey) {
    // If not configured, allow requests in local development
    return next();
  }

  const apiKeyHeader = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');

  if (!apiKeyHeader || apiKeyHeader !== configuredKey) {
    return res.status(401).json({ error: 'Unauthorized: Invalid or missing API key' });
  }

  next();
}
