// 하단 네비게이션 바
import type { IconName } from "../../components/Icon";
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

        if (location.pathname === path) {
            window.scrollTo({top: 0, behavior: "smooth"}); // 제일 위로 스크롤
            return;
        }

        navigate(path);        
    }

    return (
        <nav 
            className="fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[430px] bg-white border-t border-gray-100 z-50"
            style={{
                // env(safe-area) : 브라우저 화면 하단 여백 (브라우저의 하단 바가 가리는 영역)
                height: 'calc(56px + env(safe-area-inset-bottom))',
                paddingBottom: 'env(safe-area-inset-bottom)'
            }}
        >
            <ul className="flex justify-between items-center h-[56px]">
                {navList.map((nav) => {

                    // 현재 URL로 버튼 클릭여부 판단
                    // "/homexxx" 주소는 false, "/home/xxx" 주소는 true
                    const isActive = location.pathname === nav.path || location.pathname.startsWith(nav.path + '/');
                    
                    return (
                        <BottomNavButton key={nav.icon} icon={nav.icon} activeIcon={nav.activeIcon} label={nav.label} path={nav.path} hasBadge={nav.hasBadge} isActive={isActive} handleNavClick={() => handleNavClick(nav.path)}     />
                    )
                })}
            </ul>
        </nav>
    );
}