'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { Job, JobStatus, PrintOptions } from '@/types';

export function useJobs(role?: string) {
  const queryClient = useQueryClient();

  const jobsQuery = useQuery({
    queryKey: ['jobs', role || 'user'],
    queryFn: () => api.getJobs(role),
    staleTime: 5000,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: JobStatus }) =>
      api.updateJobStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
      queryClient.invalidateQueries({ queryKey: ['queue'] });
      queryClient.invalidateQueries({ queryKey: ['stats'] });
    },
  });

  const updateOptionsMutation = useMutation({
    mutationFn: ({ id, options }: { id: string; options: PrintOptions }) =>
      api.updateJobOptions(id, options),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['jobs'] });
    },
  });

  return {
    jobs: jobsQuery.data || [],
    isLoading: jobsQuery.isLoading,
    isError: jobsQuery.isError,
    error: jobsQuery.error,
    refetch: jobsQuery.refetch,
    updateStatus: updateStatusMutation.mutateAsync,
    isUpdatingStatus: updateStatusMutation.isPending,
    updateOptions: updateOptionsMutation.mutateAsync,
  };
}

export function useJob(id: string) {
  return useQuery({
    queryKey: ['job', id],
    queryFn: () => api.getJob(id),
    enabled: Boolean(id),
    staleTime: 5000,
  });
}
