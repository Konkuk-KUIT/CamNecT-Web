import { useCallback, useEffect, useRef, useState } from 'react';

type UseToastOptions = {
  duration?: number;
  fadeOutMs?: number;
};

export const useToast = (options: UseToastOptions = {}) => {
  const { duration = 2000, fadeOutMs = 300 } = options;
  const [isOpen, setIsOpen] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const timerRef = useRef<number | null>(null);
  const fadeTimerRef = useRef<number | null>(null);

  const clearTimers = () => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (fadeTimerRef.current !== null) {
      window.clearTimeout(fadeTimerRef.current);
      fadeTimerRef.current = null;
    }
  };

  const closeToast = useCallback(() => {
    setIsFading(true);
    fadeTimerRef.current = window.setTimeout(() => {
      setIsOpen(false);
      setIsFading(false);
    }, fadeOutMs);
  }, [fadeOutMs]);

  const openToast = useCallback(() => {
    clearTimers();
    setIsOpen(true);
    setIsFading(false);
    timerRef.current = window.setTimeout(() => {
      closeToast();
    }, duration);
  }, [closeToast, duration]);

  useEffect(() => () => clearTimers(), []);

  return {
    isOpen,
    isFading,
    openToast,
    closeToast,
  };
};

export default useToast;
