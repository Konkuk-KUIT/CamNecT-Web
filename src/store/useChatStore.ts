import { create } from 'zustand';

interface ChatState {
    totalUnreadCount: number;
    setTotalUnreadCount: (count: number) => void;
}

export const useChatStore = create<ChatState>((set) => ({
    totalUnreadCount: 0,
    setTotalUnreadCount: (count) => set({ totalUnreadCount: count }),
}));
