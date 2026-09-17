import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { calculateCost } from '@/lib/pricing';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const job = await prisma.job.findUnique({
      where: { id },
      include: {
        user: { select: { id: true, name: true, email: true, phone: true } },
      },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { duplex, copies } = body;

    const existingJob = await prisma.job.findUnique({
      where: { id },
    });

    if (!existingJob) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    const updatedDuplex = duplex !== undefined ? Boolean(duplex) : existingJob.duplex;
    const updatedCopies = copies !== undefined ? Math.max(1, Number(copies)) : existingJob.copies;

    // Recalculate cost
    const pricing = await prisma.pricingConfig.findFirst({
      where: { isActive: true },
      orderBy: { updatedAt: 'desc' },
    });

    const costBreakdown = calculateCost(
      existingJob.pageCount || 1,
      existingJob.colorPages || [],
      updatedDuplex,
      updatedCopies,
      pricing || undefined
    );

    const updatedJob = await prisma.job.update({
      where: { id },
      data: {
        duplex: updatedDuplex,
        copies: updatedCopies,
        cost: costBreakdown.total,
        costBreakdown: costBreakdown as any,
      },
    });

    return NextResponse.json(updatedJob);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const cancelledJob = await prisma.job.update({
      where: { id },
      data: {
        status: 'CANCELLED',
      },
    });

    return NextResponse.json({ success: true, job: cancelledJob });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
