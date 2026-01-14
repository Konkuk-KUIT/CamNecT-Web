import { useState } from "react";
import { type EducationItem, type CareerItem, type CertificateItem } from "../../../types/mypage/mypageTypes";

type ModalType = 'image' | 'intro' | 'tag' | 'education' | 'career' | 'certificate' | null;

export function useProfileEditModals() {
    const [currentModal, setCurrentModal] = useState<ModalType>(null);
    const [editingItem, setEditingItem] = useState<EducationItem | CareerItem | CertificateItem | null>(null);

    const openModal = (type: ModalType, item?: any) => {
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