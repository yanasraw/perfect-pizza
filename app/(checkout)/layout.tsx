import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { Container, Header } from '@/shared/components/shared';

export const metadata: Metadata = {
  title: 'Next Pizza | Checkout',
  description: 'Checkout',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-[#F4F1EE]">
      <Container>
        <Suspense>
          <Header hasSearch={false} hasCart={false}></Header>
        </Suspense>
        {children}
      </Container>
    </main>
  );
}
