'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { useSocket } from './useSocket';

export function useQueue() {
  const queryClient = useQueryClient();

  const queueQuery = useQuery({
    queryKey: ['queue'],
    queryFn: () => api.getQueue(),
    staleTime: 5000,
  });

  useSocket({
    onQueueUpdate: () => {
      queryClient.invalidateQueries({ queryKey: ['queue'] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
    onStatusChange: () => {
      queryClient.invalidateQueries({ queryKey: ['queue'] });
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });

  return {
    queue: queueQuery.data?.queue || [],
    totalInQueue: queueQuery.data?.total || 0,
    isLoading: queueQuery.isLoading,
    refetch: queueQuery.refetch,
  };
}

export function useJobQueueStatus(jobId: string | null) {
  const queryClient = useQueryClient();

  const statusQuery = useQuery({
    queryKey: ['queue-status', jobId],
    queryFn: () => (jobId ? api.getJobQueueStatus(jobId) : null),
    enabled: Boolean(jobId),
    refetchInterval: 10000, // Refetch every 10s as backup to socket
  });

  useSocket(
    {
      onStatusChange: (payload) => {
        if (payload.jobId === jobId) {
          queryClient.invalidateQueries({ queryKey: ['queue-status', jobId] });
        }
      },
    },
    { jobId: jobId || undefined }
  );

  return {
    queueStatus: statusQuery.data,
    isLoading: statusQuery.isLoading,
  };
}
