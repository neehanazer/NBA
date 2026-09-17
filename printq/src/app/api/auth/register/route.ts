import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import prisma from '@/lib/prisma';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phone: z.string().optional(),
  role: z.enum(['STUDENT', 'OPERATOR', 'ADMIN']).default('STUDENT'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email, password, phone, role } = parsed.data;
    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email: normalizedEmail,
        password: hashedPassword,
        phone: phone || null,
        role: role as any,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,
        createdAt: true,
      },
    });

    return NextResponse.json(
      { success: true, user, message: 'Account created successfully' },
      { status: 201 }
    );
  } catch (err: any) {
    console.error('[Register API Error]:', err);
    return NextResponse.json(
      { error: err.message || 'Registration failed' },
      { status: 500 }
    );
  }
}
