import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type PointState = {
  point: number;
  getPoint: () => number;
  setPoint: (point: number) => void;
  deductPoint: (amount: number) => void;
};

export const usePointStore = create<PointState>()(
  persist(
    (set, get) => ({
      point: 125000,
      getPoint: () => get().point,
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
