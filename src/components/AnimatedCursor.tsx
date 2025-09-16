"use client";

import { useEffect, useRef, useState, type ReactElement } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface PointerPosition {
  x: number;
  y: number;
}

const INTERACTIVE_SELECTOR = "a, button, [role='button'], [data-cursor='interactive']";

export function AnimatedCursor(): ReactElement | null {
  const [isPointerFine, setIsPointerFine] = useState<boolean>(true);
  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [isInteractive, setIsInteractive] = useState<boolean>(false);

  const target = useRef<PointerPosition>({ x: 0, y: 0 });

  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);

  const smoothX = useSpring(mvX, { stiffness: 500, damping: 40, mass: 0.6 });
  const smoothY = useSpring(mvY, { stiffness: 500, damping: 40, mass: 0.6 });

  useEffect(() => {
    // Skip on touch devices / coarse pointers
    const isFine = window.matchMedia("(pointer: fine)").matches;
    setIsPointerFine(isFine);
    if (!isFine) return;

    const updatePosition = (e: PointerEvent) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      mvX.set(target.current.x);
      mvY.set(target.current.y);
    };

    const handleDown = () => setIsPressed(true);
    const handleUp = () => setIsPressed(false);

    const handleOver = (e: MouseEvent) => {
      const el = e.target as Element | null;
      if (!el) return;
      const interactive = (el.closest && el.closest(INTERACTIVE_SELECTOR)) as Element | null;
      setIsInteractive(Boolean(interactive));
    };

    window.addEventListener("pointermove", updatePosition, { passive: true });
    window.addEventListener("pointerdown", handleDown, { passive: true });
    window.addEventListener("pointerup", handleUp, { passive: true });
    window.addEventListener("mouseover", handleOver, { passive: true });

    return () => {
      window.removeEventListener("pointermove", updatePosition);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("mouseover", handleOver);
    };
  }, [mvX, mvY]);

  if (!isPointerFine) return null;

  const active = isPressed || isInteractive;

  return (
    <motion.div
      aria-hidden
      className="custom-cursor"
      style={{ x: smoothX, y: smoothY }}
    >
      <div
        className="custom-cursor-inner"
        style={{ transform: `translate(-50%, -50%) scale(${active ? 4    : 1})` }}
      />
      <div
        className="custom-cursor-outer"
        style={{ transform: `translate(-50%, -50%) scale(${active ? 1.5 : 1})` }}
      />
    </motion.div>
  );
}

export default AnimatedCursor;


