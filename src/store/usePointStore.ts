import { create } from 'zustand';

type PointState = {
  point: number;
  phoneNum: string;
  getPoint: () => number;
  setPoint: (point: number) => void;
  setPhoneNum: (phoneNum: string) => void;
  deductPoint: (amount: number) => void;
};

// 보안 및 데이터 정합성을 위해 persist(localStorage)를 제거하고 순수 메모리 스토어로 관리
export const usePointStore = create<PointState>((set, get) => ({
  point: 0,
  phoneNum: '',
  getPoint: () => get().point,
  setPoint: (point) => set({ point }),
  setPhoneNum: (phoneNum) => set({ phoneNum }),
  deductPoint: (amount) =>
    set((state) => ({ point: Math.max(0, state.point - amount) })),
}));
