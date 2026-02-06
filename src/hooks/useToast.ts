import { useCallback, useEffect, useState } from 'react';

type UseToastOptions = {
  fadeDelayMs?: number;
  autoCloseMs?: number;
};

export const useToast = ({
  fadeDelayMs = 1500,
  autoCloseMs = 3500,
}: UseToastOptions = {}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFading, setIsFading] = useState(false);
  const [triggerKey, setTriggerKey] = useState(0);

  useEffect(() => {
    if (!isOpen) return;
    const fadeTimer = window.setTimeout(() => setIsFading(true), fadeDelayMs);
    const closeTimer = window.setTimeout(() => {
      setIsFading(false);
      setIsOpen(false);
    }, autoCloseMs);
    return () => {
      window.clearTimeout(fadeTimer);
      window.clearTimeout(closeTimer);
    };
  }, [autoCloseMs, fadeDelayMs, isOpen, triggerKey]);

  const openToast = useCallback(() => {
    setIsFading(false);
    setIsOpen(true);
    setTriggerKey((prev) => prev + 1);
  }, []);

  return {
    isOpen,
    isFading,
    openToast,
  };
};
