import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { JobStatus } from '@/types';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { status, errorMessage, printJobId } = body;

    const validStatuses: JobStatus[] = [
      'UPLOADED',
      'CONVERTING',
      'ANALYZED',
      'PRICED',
      'QUEUED',
      'PRINTING',
      'COMPLETED',
      'FAILED',
      'CANCELLED',
    ];

    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: `Invalid status: ${status}` }, { status: 400 });
    }

    const dataToUpdate: any = {
      status,
    };

    if (printJobId) dataToUpdate.printJobId = printJobId;
    if (errorMessage) dataToUpdate.errorMessage = errorMessage;

    if (status === 'COMPLETED') {
      const retentionHours = Number(process.env.FILE_RETENTION_HOURS) || 24;
      dataToUpdate.completedAt = new Date();
      dataToUpdate.fileExpiresAt = new Date(Date.now() + retentionHours * 60 * 60 * 1000);
    }

    const updatedJob = await prisma.job.update({
      where: { id },
      data: dataToUpdate,
      include: {
        user: { select: { id: true, name: true, phone: true } },
      },
    });

    // Notify print server to emit socket event
    const printServerUrl = process.env.PRINT_SERVER_URL || 'http://localhost:4000';
    try {
      await fetch(`${printServerUrl}/jobs/notify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'whatsapp',
          phone: updatedJob.user?.phone,
          payload: {
            template: `job_${status.toLowerCase()}`,
            params: { jobId: updatedJob.id, status },
          },
        }),
      });
    } catch {
      // Print server may be offline during development, safe to ignore
    }

    return NextResponse.json(updatedJob);
  } catch (err: any) {
    console.error('[Job Status Error]:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
