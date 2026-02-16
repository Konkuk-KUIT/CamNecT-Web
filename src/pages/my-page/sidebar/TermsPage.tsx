import { useNavigate } from "react-router-dom";
import { HeaderLayout } from "../../../layouts/HeaderLayout";
import { MainHeader } from "../../../layouts/headers/MainHeader";
import { TermsModal } from "../../../components/TermsModal";
import { useState } from "react";

export const TermsPage = () => {
    const navigate = useNavigate();
    const [modalState, setModalState] = useState<{
        isOpen: boolean;
        type: 'service' | 'privacy' | null;
    }>({
        isOpen: false,
        type: null
    });

    const openModal = (type: 'service' | 'privacy') => {
        setModalState({ isOpen: true, type });
    };

    const closeModal = () => {
        setModalState({ isOpen: false, type: null });
    };

    const menuItems = [
        { id: 'service', label: '서비스 이용약관', onClick: () => openModal('service')},
        { id: 'privacy', label: '개인정보 처리방침', onClick: () => openModal('privacy')}
    ];

    return (
        <>
            <HeaderLayout
                headerSlot={
                    <MainHeader
                        title="약관 및 정책"
                        leftAction={{ onClick: () => navigate(-1) }}
                    />
                }
            >
                <div className="w-full bg-white h-full">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={item.onClick}
                            className="w-full flex items-center justify-between px-[25px] py-[20px]"
                        >
                            <span className="text-m-16-hn text-gray-750">{item.label}</span>
                        </button>
                    ))}
                </div>
            </HeaderLayout>

            {modalState.type && (
                <TermsModal
                    isOpen={modalState.isOpen}
                    onClose={closeModal}
                    type={modalState.type}
                />
            )}
        </>
    );
};