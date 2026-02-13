import { create } from "zustand";

type PopUpConfig = {
  title: string;
  content: string;
};

type CommunityErrorPopupState = {
  popUpConfig: PopUpConfig | null;
  setPopUpConfig: (config: PopUpConfig) => void;
  clearPopUpConfig: () => void;
};

export const useCommunityErrorPopupStore = create<CommunityErrorPopupState>((set) => ({
  popUpConfig: null,
  setPopUpConfig: (config) => set({ popUpConfig: config }),
  clearPopUpConfig: () => set({ popUpConfig: null }),
}));
