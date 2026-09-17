import express from 'express';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';
import { createUploadRouter } from './routes/upload';
import { createJobsRouter } from './routes/jobs';
import { requireApiKey } from './middleware/auth';
import { CleanupService } from './services/cleanup';

dotenv.config();

const app = express();
const server = http.createServer(app);
const PORT = process.env.PORT || 4000;
const uploadsDir = path.resolve(__dirname, 'uploads');

// CORS configuration for local Next.js frontend
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Real-time Socket.io server
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('[Socket] Client connected:', socket.id);

  // Join user-specific room
  socket.on('join:user', (userId: string) => {
    if (userId) {
      socket.join(`user:${userId}`);
      console.log(`[Socket] Client ${socket.id} joined user room: user:${userId}`);
    }
  });

  // Join operator room
  socket.on('join:operators', () => {
    socket.join('operators');
    console.log(`[Socket] Client ${socket.id} joined operators room`);
  });

  // Join specific job room for progress tracking during upload/conversion
  socket.on('join:job', (jobId: string) => {
    if (jobId) {
      socket.join(`job:${jobId}`);
      console.log(`[Socket] Client ${socket.id} joined job room: job:${jobId}`);
    }
  });

  socket.on('disconnect', () => {
    console.log('[Socket] Client disconnected:', socket.id);
  });
});

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'PrintQ Print Server',
    timestamp: new Date().toISOString(),
    uploadsDir,
  });
});

// Mount routes
app.use('/upload', createUploadRouter(io, uploadsDir));
app.use('/jobs', createJobsRouter(io, uploadsDir));

// Initialize File Retention & Cleanup
const retentionHours = Number(process.env.FILE_RETENTION_HOURS) || 24;
const cleanupService = new CleanupService(uploadsDir, retentionHours);
cleanupService.startScheduledCleanup(1); // Check every 1 hour

server.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`🚀 PrintQ Print Server running on port ${PORT}`);
  console.log(`📁 Uploads directory: ${uploadsDir}`);
  console.log(`🕒 Retention policy: ${retentionHours} hours`);
  console.log(`=========================================`);
});

export { app, server, io };
