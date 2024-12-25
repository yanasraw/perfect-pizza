import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get('code');

    if (!code) {
      return NextResponse.json({ error: 'Code not found' }, { status: 400 });
    }

    const verificationCode = await prisma.verificationCode.findFirst({
      where: {
        code: code,
      },
    });

    if (!verificationCode) {
      return NextResponse.json({ error: 'Code not found' }, { status: 400 });
    }

    await prisma.user.update({
      where: {
        id: verificationCode.id,
      },
      data: {
        verified: new Date(),
      },
    });

    await prisma.verificationCode.delete({
      where: {
        id: verificationCode.id,
      },
    });

    return NextResponse.redirect(new URL('/?verified', req.url));
  } catch (error) {
    console.log('[AUTH_VERIFY] Server error', error);

    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
