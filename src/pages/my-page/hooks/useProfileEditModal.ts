import { useState } from "react";

type ModalType = 'image' | 'intro' | 'tags' | 'education' | 'career' | 'certificate' | null;

export function useProfileEditModals() {
    const [currentModal, setCurrentModal] = useState<ModalType>(null);

    const openModal = (type: ModalType) => {
        setCurrentModal(type);
    };

    const closeModal = () => {
        setCurrentModal(null);
    };

    return {
        currentModal,
        openModal,
        closeModal
    };
}