import { CostBreakdown, DashboardStats, Job, JobStatus, PricingConfig, PrintOptions, QueueStatusResponse } from '@/types';

async function handleResponse<T>(res: Response): Promise<T> {
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.error || json.message || `Request failed with status ${res.status}`);
  }
  return json as T;
}

export const api = {
  async getJobs(role?: string): Promise<Job[]> {
    const url = role ? `/api/jobs?role=${encodeURIComponent(role)}` : '/api/jobs';
    const res = await fetch(url);
    return handleResponse<Job[]>(res);
  },

  async getJob(id: string): Promise<Job> {
    const res = await fetch(`/api/jobs/${id}`);
    return handleResponse<Job>(res);
  },

  async updateJobOptions(id: string, options: PrintOptions): Promise<Job> {
    const res = await fetch(`/api/jobs/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(options),
    });
    return handleResponse<Job>(res);
  },

  async updateJobStatus(id: string, status: JobStatus): Promise<Job> {
    const res = await fetch(`/api/jobs/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    return handleResponse<Job>(res);
  },

  async payForJob(id: string, method: string = 'online'): Promise<{ success: boolean; job: Job }> {
    const res = await fetch(`/api/jobs/${id}/pay`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ method }),
    });
    return handleResponse<{ success: boolean; job: Job }>(res);
  },

  async getPricing(): Promise<PricingConfig> {
    const res = await fetch('/api/pricing');
    return handleResponse<PricingConfig>(res);
  },

  async updatePricing(pricing: Partial<PricingConfig>): Promise<PricingConfig> {
    const res = await fetch('/api/pricing', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pricing),
    });
    return handleResponse<PricingConfig>(res);
  },

  async getQueue(): Promise<{ queue: Job[]; total: number }> {
    const res = await fetch('/api/queue');
    return handleResponse<{ queue: Job[]; total: number }>(res);
  },

  async getJobQueueStatus(jobId: string): Promise<QueueStatusResponse> {
    const res = await fetch(`/api/queue?jobId=${encodeURIComponent(jobId)}`);
    return handleResponse<QueueStatusResponse>(res);
  },

  async getDashboardStats(): Promise<DashboardStats> {
    const res = await fetch('/api/dashboard/stats');
    return handleResponse<DashboardStats>(res);
  },
};
