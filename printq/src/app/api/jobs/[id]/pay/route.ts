import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getPaymentProvider } from '@/lib/payment';
import { calculateQueuePosition } from '@/lib/queue';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { method = 'online', paymentId } = body;

    const job = await prisma.job.findUnique({
      where: { id },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    const provider = getPaymentProvider(method === 'counter' ? 'counter' : 'dummy');
    const paymentResult = await provider.verifyPayment(
      paymentId || `pay_${Date.now()}`,
      `ord_${job.id}`
    );

    if (!paymentResult.success) {
      return NextResponse.json({ error: 'Payment verification failed' }, { status: 400 });
    }

    // Entering the FCFS queue!
    const updatedJob = await prisma.job.update({
      where: { id },
      data: {
        paid: true,
        paymentMethod: method,
        paymentId: paymentResult.paymentId,
        status: 'QUEUED',
      },
    });

    // Compute live queue position
    const queueEstimate = await calculateQueuePosition(updatedJob.id);

    // Update job record with calculated position
    if (queueEstimate?.position) {
      await prisma.job.update({
        where: { id: updatedJob.id },
        data: { queuePosition: queueEstimate.position },
      });
    }

    // Notify print server socket
    const printServerUrl = process.env.PRINT_SERVER_URL || 'http://localhost:4000';
    try {
      await fetch(`${printServerUrl}/jobs/notify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'push',
          payload: {
            title: 'Job Queued!',
            body: `Your document is #${queueEstimate?.position || 1} in line.`,
            jobId: updatedJob.id,
          },
        }),
      });
    } catch {
      // Dev fallback
    }

    return NextResponse.json({
      success: true,
      job: updatedJob,
      queuePosition: queueEstimate?.position || 1,
      estimatedMinutes: queueEstimate?.estimatedMinutes || 2,
    });
  } catch (err: any) {
    console.error('[Pay Route Error]:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
