import { useState } from "react";
import { type EducationItem, type CareerItem, type CertificateItem } from "../../../types/mypage/mypageTypes";

type ModalType = 'image' | 'intro' | 'tags' | 'education' | 'career' | 'certificate' | null;
type EditingItemType = EducationItem | CareerItem | CertificateItem | null;

export function useProfileEditModals() {
    const [currentModal, setCurrentModal] = useState<ModalType>(null);
    const [editingItem, setEditingItem] = useState<EducationItem | CareerItem | CertificateItem | null>(null);

    const openModal = (type: ModalType, item?: EditingItemType) => {
        setCurrentModal(type);
        setEditingItem(item || null);
    };

    const closeModal = () => {
        setCurrentModal(null);
        setEditingItem(null);
    };

    return {
        currentModal,
        editingItem,
        openModal,
        closeModal
    };
}