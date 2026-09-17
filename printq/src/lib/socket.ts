import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function getSocket(): Socket | null {
  if (typeof window === 'undefined') return null;

  if (!socket) {
    const serverUrl = process.env.NEXT_PUBLIC_PRINT_SERVER_URL || 'http://localhost:4000';
    socket = io(serverUrl, {
      autoConnect: true,
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
      transports: ['websocket', 'polling'],
    });

    socket.on('connect', () => {
      console.log('Connected to PrintQ real-time socket server:', socket?.id);
    });

    socket.on('connect_error', (err) => {
      console.warn('Socket connection warning (print server may be offline):', err.message);
    });
  }

  return socket;
}
