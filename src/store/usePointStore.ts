import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type PointState = {
  point: number;
  setPoint: (point: number) => void;
  deductPoint: (amount: number) => void;
};

export const usePointStore = create(
  persist<PointState>(
    (set) => ({
      point: 125000,
      setPoint: (point) => set({ point }),
      deductPoint: (amount) =>
        set((state) => ({ point: Math.max(0, state.point - amount) })),
    }),
    {
      name: 'point-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
