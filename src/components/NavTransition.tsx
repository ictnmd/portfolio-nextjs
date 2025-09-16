'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useEffect, useState } from 'react';

interface NavTransitionProps {
  isActive: boolean;
  children: ReactNode;
}

export function NavTransition({ isActive, children }: NavTransitionProps) {
  const [showTransition, setShowTransition] = useState(false);

  useEffect(() => {
    if (isActive) {
      setShowTransition(true);
      const timer = setTimeout(() => setShowTransition(false), 800);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  return (
    <div className="relative">
      {/* Ripple effect */}
      <AnimatePresence>
        {showTransition && (
          <motion.div
            initial={{ scale: 0, opacity: 0.8 }}
            animate={{ scale: 4, opacity: 0 }}
            exit={{ scale: 6, opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 rounded-full pointer-events-none z-50"
            style={{ 
              backgroundColor: 'rgba(244, 208, 63, 0.3)',
              transformOrigin: 'center'
            }}
          />
        )}
      </AnimatePresence>

      {/* Wave effect */}
      <AnimatePresence>
        {showTransition && (
          <motion.div
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 3, opacity: 0 }}
            exit={{ scale: 5, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="absolute inset-0 border-2 rounded-full pointer-events-none z-40"
            style={{ 
              borderColor: 'rgba(244, 208, 63, 0.4)',
              transformOrigin: 'center'
            }}
          />
        )}
      </AnimatePresence>

      {children}
    </div>
  );
}

export default NavTransition;
