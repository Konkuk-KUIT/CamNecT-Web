// 하단 네비게이션 바
import type { IconName } from "../Icon";
import {BottomNavButton} from "./BottomNavButton";
import { useLocation, useNavigate } from "react-router-dom";
export interface BottomNavProps {
    icon: IconName;
    activeIcon: IconName; // 클릭 시 아이콘 
    label: string;
    path: string;
    hasBadge?: boolean;
}

const navList: BottomNavProps[] = [
    {
        icon: "home",
        activeIcon: "homeActive",
        label: "홈",
        path: "/home"
    },
    {
        icon: "alumni",
        activeIcon: "alumniActive",
        label: "동문 찾기",
        path: "/alumni"
    },
    {
        icon: "chat",
        activeIcon: "chatActive",
        label: "커피챗",
        path: "/chat",
        hasBadge: true
    },
    {
        icon: "activity",
        activeIcon: "activityActive",
        label: "대외활동",
        path: "/activity"
    },
    {
        icon: "me",
        activeIcon: "meActive",
        label: "마이 페이지",
        path: "/me"
    }
];


export const BottomNav = () => {
    const navigate = useNavigate();
    // 현재 URL 정보 hook (ex. /chat)
    // 주소가 바뀌면 재 렌더링
    const location = useLocation(); 

    const handleNavClick = (path: string) => {
        navigate(path);        
    }

    return (
        <nav className="fixed bottom-0 left-0 right-0 mx-auto 
        w-full max-w-[430px] h-[56px]">
            <ul className="flex justify-between items-center h-full">
                {navList.map((nav) => {

                    // 현재 URL로 버튼 클릭여부 판단
                    const isActive = location.pathname.startsWith(nav.path);
                    
                    return (
                        <BottomNavButton key={nav.icon} icon={nav.icon} activeIcon={nav.activeIcon} label={nav.label} path={nav.path} hasBadge={nav.hasBadge} isActive={isActive} handleNavClick={() => handleNavClick(nav.path)}     />
                    )
                })}
            </ul>
        </nav>
    );
}