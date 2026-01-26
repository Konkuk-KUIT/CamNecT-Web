import { create } from 'zustand';
import { notificationList, type NotificationItem } from '../pages/home/notificationData';

type NotificationState = {
  items: NotificationItem[];
  markAsRead: (id: string) => void;
  setItems: (items: NotificationItem[]) => void;
};

export const useNotificationStore = create<NotificationState>((set) => ({
  items: notificationList,
  markAsRead: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, isRead: true } : item,
      ),
    })),
  setItems: (items) => set({ items }),
}));
