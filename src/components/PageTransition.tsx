'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    scale: 0.8,
    rotateY: -15,
    filter: 'blur(10px)'
  },
  in: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    filter: 'blur(0px)'
  },
  out: {
    opacity: 0,
    scale: 1.1,
    rotateY: 15,
    filter: 'blur(10px)'
  }
};

const pageTransition = {
  type: 'spring' as const,
  stiffness: 300,
  damping: 30,
  duration: 0.6
};

export function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(true);
    const timer = setTimeout(() => setIsTransitioning(false), 600);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {/* Background transition effect */}
      <AnimatePresence mode="wait">
        {isTransitioning && (
          <motion.div
            key="transition-bg"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-0 z-40 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, rgba(244, 208, 63, 0.2) 0%, rgba(244, 208, 63, 0.1) 50%, transparent 100%)'
            }}
          />
        )}
      </AnimatePresence>

      {/* Page content transition */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="min-h-screen"
          style={{ transformOrigin: 'center center' }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Floating particles effect */}
      <AnimatePresence>
        {isTransitioning && (
          <div className="fixed inset-0 pointer-events-none z-30">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: 0,
                  opacity: 0
                }}
                animate={{ 
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                  scale: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ 
                  duration: 0.8,
                  delay: i * 0.1,
                  ease: "easeOut"
                }}
                className="absolute w-2 h-2 rounded-full"
                style={{ backgroundColor: '#f4d03f' }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default PageTransition;
