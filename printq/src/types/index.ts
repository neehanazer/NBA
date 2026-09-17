export type Role = 'STUDENT' | 'OPERATOR' | 'ADMIN';

export type JobStatus =
  | 'UPLOADED'
  | 'CONVERTING'
  | 'ANALYZED'
  | 'PRICED'
  | 'QUEUED'
  | 'PRINTING'
  | 'COMPLETED'
  | 'FAILED'
  | 'CANCELLED';

export interface UserSummary {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  role: Role;
}

export interface CostBreakdown {
  colorPages: number;
  bwPages: number;
  colorCost: number;
  bwCost: number;
  subtotal: number;
  duplexDiscount: number;
  copies: number;
  total: number;
}

export interface Job {
  id: string;
  userId: string;
  user?: UserSummary;
  originalFile: string;
  originalName: string;
  convertedPdf?: string | null;
  fileSize?: number | null;
  pageCount?: number | null;
  colorPages: number[];
  bwPages?: number | null;
  duplex: boolean;
  copies: number;
  status: JobStatus;
  cost?: number | null;
  costBreakdown?: CostBreakdown | null;
  paid: boolean;
  paymentMethod?: string | null;
  paymentId?: string | null;
  queuePosition?: number | null;
  printJobId?: string | null;
  errorMessage?: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  completedAt?: string | Date | null;
  fileExpiresAt?: string | Date | null;
}

export interface PricingConfig {
  id: string;
  ratePerPageBW: number;
  ratePerPageColor: number;
  duplexDiscount: number;
  currency: string;
  currencySymbol: string;
  isActive: boolean;
  updatedAt: string | Date;
  updatedBy?: string | null;
}

export interface PrintOptions {
  duplex: boolean;
  copies: number;
}

export interface QueueStatusResponse {
  jobId: string;
  position: number;
  aheadCount: number;
  totalInQueue: number;
  estimatedWaitMinutes: number;
}

export interface DashboardStats {
  totalJobsToday: number;
  completedJobsToday: number;
  pendingJobsToday: number;
  revenueToday: number;
  avgTurnaroundMinutes: number;
}

export interface SocketServerToClientEvents {
  'job:statusChange': (payload: { jobId: string; status: JobStatus; queuePosition?: number }) => void;
  'queue:update': (payload: { queue: Job[] }) => void;
  'job:progress': (payload: { jobId: string; step: string; progress: number }) => void;
}

export interface SocketClientToServerEvents {
  'join:user': (userId: string) => void;
  'join:operators': () => void;
}
