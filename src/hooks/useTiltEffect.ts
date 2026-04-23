/**
 * Hook para efecto tilt 3D en elementos interactivos
 * Usa translateX/Y para simular perspectiva sin clip-path
 */
import { useRef, useCallback } from 'react';

interface TiltOptions {
  /** Grados máximos de rotación en X e Y */
  maxTilt?: number;
  /** Velocidad de transición al volver a posición neutral */
  resetSpeed?: number;
}

export function useTiltEffect<T extends HTMLElement>(options: TiltOptions = {}) {
  const { maxTilt = 10, resetSpeed = 300 } = options;
  const elementRef = useRef<T>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<T>) => {
    const el = elementRef.current;
    if (!el) return;

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }, [maxTilt]);

  const handleMouseLeave = useCallback(() => {
    const el = elementRef.current;
    if (!el) return;

    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  }, []);

  return {
    ref: elementRef,
    props: {
      onMouseMove: handleMouseMove,
      onMouseLeave: handleMouseLeave,
    },
  };
}