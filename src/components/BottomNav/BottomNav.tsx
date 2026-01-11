// 하단 네비게이션 바
import type { IconName } from "../Icon";
import {BottomNavButton} from "./BottomNavButton";

export interface BottomNavProps {
    icon: IconName;
    activeIcon: IconName; // 클릭 시 아이콘 
    label: string;
    hasBadge?: boolean;
}

const navList: BottomNavProps[] = [
    {
        icon: "home",
        activeIcon: "homeActive",
        label: "홈"
    },
    {
        icon: "alumni",
        activeIcon: "alumniActive",
        label: "동문 찾기"
    },
    {
        icon: "chat",
        activeIcon: "chatActive",
        label: "커피챗",
        hasBadge: true
    },
    {
        icon: "activity",
        activeIcon: "activityActive",
        label: "대외활동"
    },
    {
        icon: "me",
        activeIcon: "meActive",
        label: "마이 페이지"
    }
];

export const BottomNav = () => {
    return (
        <nav className="fixed bottom-0 left-0 right-0 mx-auto 
        w-full max-w-[430px] h-[56px]">
            <ul className="flex justify-between items-center h-full">
                {navList.map((nav) => (
                    <BottomNavButton key={nav.icon} icon={nav.icon} activeIcon={nav.activeIcon} label={nav.label} hasBadge={nav.hasBadge} />
                ))}
            </ul>
        </nav>
    );
}