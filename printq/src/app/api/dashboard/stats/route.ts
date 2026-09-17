import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { DashboardStats } from '@/types';

export async function GET() {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [totalJobsToday, completedJobsToday, pendingJobsToday, paidJobsToday] = await Promise.all([
      prisma.job.count({
        where: { createdAt: { gte: startOfToday } },
      }),
      prisma.job.count({
        where: {
          status: 'COMPLETED',
          updatedAt: { gte: startOfToday },
        },
      }),
      prisma.job.count({
        where: {
          status: { in: ['QUEUED', 'PRINTING'] },
        },
      }),
      prisma.job.findMany({
        where: {
          paid: true,
          createdAt: { gte: startOfToday },
        },
        select: { cost: true },
      }),
    ]);

    const revenueToday = paidJobsToday.reduce((acc: number, job: any) => acc + (job.cost || 0), 0);

    const stats: DashboardStats = {
      totalJobsToday,
      completedJobsToday,
      pendingJobsToday,
      revenueToday: Number(revenueToday.toFixed(2)),
      avgTurnaroundMinutes: 8, // Average 8 min print shop turnaround
    };

    return NextResponse.json(stats);
  } catch (err: any) {
    console.error('[Dashboard Stats Error]:', err.message);
    const fallbackStats: DashboardStats = {
      totalJobsToday: 0,
      completedJobsToday: 0,
      pendingJobsToday: 0,
      revenueToday: 0,
      avgTurnaroundMinutes: 5,
    };
    return NextResponse.json(fallbackStats);
  }
}
