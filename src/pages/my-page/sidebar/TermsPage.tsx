import { useNavigate } from "react-router-dom";
import { HeaderLayout } from "../../../layouts/HeaderLayout";
import { MainHeader } from "../../../layouts/headers/MainHeader";

export const TermsPage = () => {
    const navigate = useNavigate();

    const menuItems = [
        { id: 'service', label: '서비스 이용약관', onClick: () => alert("이용약관 외부링크")}, //TODO: 외부링크 연결
        { id: 'privacy', label: '개인정보 처리방침', onClick: () => alert("처리방침 외부링크")}
    ];

    return (
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
    );
};