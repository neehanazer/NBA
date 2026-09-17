import prisma from './prisma';

export const SECONDS_PER_PAGE_DEFAULT = 3; // Estimated printer throughput: 20 pages per minute = 3s/page

export interface QueueEstimate {
  position: number;
  aheadCount: number;
  estimatedMinutes: number;
  totalActiveInQueue: number;
}

/**
 * Computes strict FCFS position and estimated wait time for a job.
 */
export async function calculateQueuePosition(jobId: string): Promise<QueueEstimate | null> {
  try {
    const targetJob = await prisma.job.findUnique({
      where: { id: jobId },
      select: { id: true, status: true, paid: true, createdAt: true },
    });

    if (!targetJob || !['QUEUED', 'PRINTING'].includes(targetJob.status)) {
      return null;
    }

    // Strict FCFS: jobs with status QUEUED or PRINTING, paid=true, created earlier
    const aheadCount = await prisma.job.count({
      where: {
        status: { in: ['QUEUED', 'PRINTING'] },
        paid: true,
        createdAt: { lt: targetJob.createdAt },
      },
    });

    const totalActiveInQueue = await prisma.job.count({
      where: {
        status: { in: ['QUEUED', 'PRINTING'] },
        paid: true,
      },
    });

    const position = aheadCount + 1;

    // Estimate based on historical average page count or fallback to 10
    const aggregate = await prisma.job.aggregate({
      where: { status: 'COMPLETED' },
      _avg: { pageCount: true },
    });

    const avgPages = Math.round(aggregate._avg.pageCount || 10);
    const estimatedSeconds = position * avgPages * SECONDS_PER_PAGE_DEFAULT;
    const estimatedMinutes = Math.max(1, Math.ceil(estimatedSeconds / 60));

    return {
      position,
      aheadCount,
      estimatedMinutes,
      totalActiveInQueue,
    };
  } catch (error) {
    console.error('Error calculating queue position:', error);
    return null;
  }
}
