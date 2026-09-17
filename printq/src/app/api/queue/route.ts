import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { calculateQueuePosition } from '@/lib/queue';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const jobId = searchParams.get('jobId');

    if (jobId) {
      const positionData = await calculateQueuePosition(jobId);
      if (!positionData) {
        return NextResponse.json(
          { error: 'Job not currently in active queue' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        jobId,
        position: positionData.position,
        aheadCount: positionData.aheadCount,
        totalInQueue: positionData.totalActiveInQueue,
        estimatedWaitMinutes: positionData.estimatedMinutes,
      });
    }

    // Full queue for Operator / Board
    const queue = await prisma.job.findMany({
      where: {
        status: { in: ['QUEUED', 'PRINTING'] },
        paid: true,
      },
      orderBy: { createdAt: 'asc' }, // Strict FCFS
      include: {
        user: { select: { id: true, name: true, email: true, phone: true } },
      },
    });

    return NextResponse.json({
      queue,
      total: queue.length,
    });
  } catch (err: any) {
    console.error('[Queue Route Error]:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
