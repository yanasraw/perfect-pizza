import { prisma } from '@/prisma/prisma-client';
import { IStory } from '@/shared/services/stories';
import { NextResponse } from 'next/server';

export async function GET() {
  const data = await prisma.story.findMany({
    include: {
      items: true,
    },
  });
  if (!data) return NextResponse.json({ error: 'Stories not found' }, { status: 404 });
  return NextResponse.json(data);
}
