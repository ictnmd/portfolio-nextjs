'use client';

import { useEffect, useState } from 'react';

// Extend Window interface for Next.js router
declare global {
  interface Window {
    next?: {
      router?: {
        prefetch: (href: string) => void;
      };
    };
  }
}

interface PrefetchStats {
  prefetchedRoutes: Set<string>;
  totalPrefetches: number;
  cacheHits: number;
  navigationTimes: number[];
}

export function PrefetchMonitor() {
  const [stats, setStats] = useState<PrefetchStats>({
    prefetchedRoutes: new Set(),
    totalPrefetches: 0,
    cacheHits: 0,
    navigationTimes: []
  });

  useEffect(() => {
    // Only run in development
    if (process.env.NODE_ENV !== 'development') return;

    // Access Next.js router on window object
    const nextRouter = window.next?.router;
    const originalPrefetch = nextRouter?.prefetch;
    
    if (originalPrefetch) {
      nextRouter.prefetch = function(href: string) {
        setStats(prev => ({
          ...prev,
          prefetchedRoutes: new Set([...prev.prefetchedRoutes, href]),
          totalPrefetches: prev.totalPrefetches + 1
        }));
        return originalPrefetch.call(this, href);
      };
    }

    // Monitor navigation performance
    const handleNavigationStart = () => {
      performance.mark('navigation-start');
    };

    const handleNavigationEnd = () => {
      performance.mark('navigation-end');
      
      // Check if navigation-start mark exists before measuring
      const startMark = performance.getEntriesByName('navigation-start')[0];
      if (startMark) {
        performance.measure('navigation-time', 'navigation-start', 'navigation-end');
        
        const measure = performance.getEntriesByName('navigation-time')[0];
        if (measure) {
          setStats(prev => ({
            ...prev,
            navigationTimes: [...prev.navigationTimes.slice(-9), measure.duration]
          }));
        }
      }
    };

    // Listen for route changes
    window.addEventListener('beforeunload', handleNavigationStart);
    window.addEventListener('load', handleNavigationEnd);

    return () => {
      window.removeEventListener('beforeunload', handleNavigationStart);
      window.removeEventListener('load', handleNavigationEnd);
    };
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null;

  const avgNavigationTime = stats.navigationTimes.length > 0 
    ? stats.navigationTimes.reduce((a, b) => a + b, 0) / stats.navigationTimes.length 
    : 0;

  return (
    <div className="fixed top-4 right-4 z-[9999] bg-black/80 text-white p-3 rounded-lg text-xs font-mono max-w-xs">
      <div className="mb-2 font-bold">Prefetch Monitor</div>
      <div>Routes Prefetched: {stats.prefetchedRoutes.size}</div>
      <div>Total Prefetches: {stats.totalPrefetches}</div>
      <div>Avg Nav Time: {avgNavigationTime.toFixed(2)}ms</div>
      <div className="mt-2">
        <div className="text-xs opacity-70">Prefetched Routes:</div>
        {Array.from(stats.prefetchedRoutes).map(route => (
          <div key={route} className="text-green-400">✓ {route}</div>
        ))}
      </div>
    </div>
  );
}
