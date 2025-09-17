'use client';

import dynamic from 'next/dynamic';
import type { ReactNode } from 'react';

const PageTransition = dynamic(() => import('@/components/PageTransition'), { ssr: false });
const ClientCurvedBottomNav = dynamic(() => import('@/components/ClientCurvedBottomNav'), { ssr: false });
const AnimatedCursor = dynamic(() => import('@/components/AnimatedCursor'), { ssr: false });
const PrefetchMonitor = dynamic(() => import('@/components/PrefetchMonitor').then(m => m.PrefetchMonitor), { ssr: false });

export function AppShellClient({ children }: { children: ReactNode }) {
  return (
    <>
      <PageTransition>
        {children}
      </PageTransition>
      <ClientCurvedBottomNav />
      <AnimatedCursor />
      <PrefetchMonitor />
    </>
  );
}

export default AppShellClient;


