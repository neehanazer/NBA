'use client';

import { useEffect } from 'react';
import { getSocket } from '@/lib/socket';

export function useSocket(
  eventHandlers?: {
    onStatusChange?: (payload: { jobId: string; status: any; queuePosition?: number }) => void;
    onQueueUpdate?: (payload: { queue: any[] }) => void;
    onProgress?: (payload: { jobId: string; step: string; progress: number }) => void;
  },
  rooms?: { userId?: string; operator?: boolean; jobId?: string }
) {
  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;

    if (rooms?.userId) {
      socket.emit('join:user', rooms.userId);
    }
    if (rooms?.operator) {
      socket.emit('join:operators');
    }
    if (rooms?.jobId) {
      socket.emit('join:job', rooms.jobId);
    }

    if (eventHandlers?.onStatusChange) {
      socket.on('job:statusChange', eventHandlers.onStatusChange);
    }
    if (eventHandlers?.onQueueUpdate) {
      socket.on('queue:update', eventHandlers.onQueueUpdate);
    }
    if (eventHandlers?.onProgress) {
      socket.on('job:progress', eventHandlers.onProgress);
    }

    return () => {
      if (eventHandlers?.onStatusChange) socket.off('job:statusChange', eventHandlers.onStatusChange);
      if (eventHandlers?.onQueueUpdate) socket.off('queue:update', eventHandlers.onQueueUpdate);
      if (eventHandlers?.onProgress) socket.off('job:progress', eventHandlers.onProgress);
    };
  }, [rooms?.userId, rooms?.operator, rooms?.jobId, eventHandlers]);
}
