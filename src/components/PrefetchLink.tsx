'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

interface PrefetchLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  prefetchStrategy?: 'hover' | 'visible' | 'idle' | 'never';
  prefetchDelay?: number;
}

export function PrefetchLink({ 
  href, 
  children, 
  className = '', 
  onClick,
  prefetchStrategy = 'hover',
  prefetchDelay = 100
}: PrefetchLinkProps) {
  const router = useRouter();
  const linkRef = useRef<HTMLButtonElement>(null);
  const prefetchedRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const element = linkRef.current;
    if (!element) return;

    const prefetchRoute = () => {
      if (!prefetchedRef.current) {
        router.prefetch(href);
        prefetchedRef.current = true;
      }
    };

    const handlePrefetch = () => {
      if (prefetchStrategy === 'hover') {
        prefetchRoute();
      } else if (prefetchStrategy === 'visible') {
        // Use Intersection Observer for visibility-based prefetching
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting && !prefetchedRef.current) {
                prefetchRoute();
                observer.disconnect();
              }
            });
          },
          { threshold: 0.1 }
        );
        observer.observe(element);
        return () => observer.disconnect();
      } else if (prefetchStrategy === 'idle') {
        // Prefetch when browser is idle
        if ('requestIdleCallback' in window) {
          requestIdleCallback(() => {
            timeoutRef.current = setTimeout(prefetchRoute, prefetchDelay);
          });
        } else {
          timeoutRef.current = setTimeout(prefetchRoute, prefetchDelay);
        }
      }
    };

    const cleanup = handlePrefetch();

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (cleanup) cleanup();
    };
  }, [href, router, prefetchStrategy, prefetchDelay]);

  const handleClick = () => {
    onClick?.();
    router.push(href);
  };

  return (
    <button
      ref={linkRef}
      onClick={handleClick}
      className={className}
      onMouseEnter={() => {
        if (prefetchStrategy === 'hover' && !prefetchedRef.current) {
          router.prefetch(href);
          prefetchedRef.current = true;
        }
      }}
    >
      {children}
    </button>
  );
}

// Hook for programmatic prefetching
export function usePrefetch() {
  const router = useRouter();

  const prefetchRoute = (href: string) => {
    router.prefetch(href);
  };

  const prefetchRoutes = (routes: string[]) => {
    routes.forEach(route => router.prefetch(route));
  };

  return { prefetchRoute, prefetchRoutes };
}
