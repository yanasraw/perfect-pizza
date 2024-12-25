import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
  } catch (error) {
    console.log('[CHECKOUT_CALLBACK] Server error', error);

    return NextResponse.json({ message: 'Failed to receive order status' }, { status: 500 });
  }
}
