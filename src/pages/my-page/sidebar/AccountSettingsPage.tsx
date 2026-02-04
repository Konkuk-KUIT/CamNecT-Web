import { useNavigate } from "react-router-dom";
import { HeaderLayout } from "../../../layouts/HeaderLayout";
import { MainHeader } from "../../../layouts/headers/MainHeader";

export const AccountSettingsPage = () => {
    const navigate = useNavigate();

    const menuItems = [
        //{ id: 'id', label: '아이디 수정' },
        { id: 'password', label: '비밀번호 수정' },
        // { id: 'email', label: '이메일 수정' },
        // { id: 'phone', label: '전화번호 수정' }
    ];

    return (
        <HeaderLayout
            headerSlot={
                <MainHeader
                    title="계정관리"
                    leftAction={{ onClick: () => navigate(-1) }}
                />
            }
        >
            <div className="w-full h-full bg-white">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => navigate(item.id)}
                        className="w-full flex items-center justify-between px-[25px] py-[20px]"
                    >
                        <span className="text-m-16-hn text-gray-750">{item.label}</span>
                    </button>
                ))}
            </div>
        </HeaderLayout>
    );
};