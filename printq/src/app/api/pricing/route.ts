import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { DEFAULT_PRICING } from '@/lib/pricing';

export async function GET() {
  try {
    const pricing = await prisma.pricingConfig.findFirst({
      where: { isActive: true },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json(pricing || DEFAULT_PRICING);
  } catch (err: any) {
    return NextResponse.json(DEFAULT_PRICING);
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { ratePerPageBW, ratePerPageColor, duplexDiscount, currency, currencySymbol } = body;

    // Create or update pricing config
    const current = await prisma.pricingConfig.findFirst({
      where: { isActive: true },
    });

    let updated;
    if (current) {
      updated = await prisma.pricingConfig.update({
        where: { id: current.id },
        data: {
          ratePerPageBW: ratePerPageBW !== undefined ? Number(ratePerPageBW) : current.ratePerPageBW,
          ratePerPageColor: ratePerPageColor !== undefined ? Number(ratePerPageColor) : current.ratePerPageColor,
          duplexDiscount: duplexDiscount !== undefined ? Number(duplexDiscount) : current.duplexDiscount,
          currency: currency || current.currency,
          currencySymbol: currencySymbol || current.currencySymbol,
        },
      });
    } else {
      updated = await prisma.pricingConfig.create({
        data: {
          ratePerPageBW: Number(ratePerPageBW || DEFAULT_PRICING.ratePerPageBW),
          ratePerPageColor: Number(ratePerPageColor || DEFAULT_PRICING.ratePerPageColor),
          duplexDiscount: Number(duplexDiscount !== undefined ? duplexDiscount : DEFAULT_PRICING.duplexDiscount),
          currency: currency || DEFAULT_PRICING.currency,
          currencySymbol: currencySymbol || DEFAULT_PRICING.currencySymbol,
          isActive: true,
        },
      });
    }

    return NextResponse.json(updated);
  } catch (err: any) {
    console.error('[Pricing PUT Error]:', err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
