import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { calculateCost } from '@/lib/pricing';

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const requestedRole = searchParams.get('role');

    // If user is authenticated
    const userRole = (session?.user as any)?.role;
    const userId = (session?.user as any)?.id;

    const isOperator = userRole === 'OPERATOR' || userRole === 'ADMIN' || requestedRole === 'operator';

    const whereClause: any = {};
    if (!isOperator && userId) {
      whereClause.userId = userId;
    }

    const jobs = await prisma.job.findMany({
      where: whereClause,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: { id: true, name: true, email: true, phone: true, role: true },
        },
      },
    });

    return NextResponse.json(jobs);
  } catch (err: any) {
    console.error('[Jobs GET Error]:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const body = await req.json();

    const {
      originalFile,
      originalName,
      convertedPdf,
      fileSize,
      pageCount = 1,
      colorPages = [],
      bwPages = 1,
      duplex = false,
      copies = 1,
    } = body;

    let userId = (session?.user as any)?.id;

    // If unauthenticated or dev testing, associate with first user or create a guest user
    if (!userId) {
      let guestUser = await prisma.user.findFirst();
      if (!guestUser) {
        guestUser = await prisma.user.create({
          data: {
            email: 'student@college.edu',
            name: 'Demo Student',
            password: 'demo_password_hash',
            role: 'STUDENT',
          },
        });
      }
      userId = guestUser.id;
    }

    // Retrieve active pricing
    const pricing = await prisma.pricingConfig.findFirst({
      where: { isActive: true },
      orderBy: { updatedAt: 'desc' },
    });

    const costBreakdown = calculateCost(
      pageCount,
      colorPages,
      duplex,
      copies,
      pricing || undefined
    );

    const job = await prisma.job.create({
      data: {
        userId,
        originalFile,
        originalName,
        convertedPdf: convertedPdf || null,
        fileSize,
        pageCount,
        colorPages,
        bwPages,
        duplex,
        copies,
        status: 'PRICED',
        cost: costBreakdown.total,
        costBreakdown: costBreakdown as any,
        paid: false,
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (err: any) {
    console.error('[Jobs POST Error]:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
