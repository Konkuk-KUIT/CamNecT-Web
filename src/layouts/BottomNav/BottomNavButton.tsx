import Icon from "../../components/Icon";
import type { BottomNavProps } from "./BottomNav";
import { useUnreadCountQuery } from "../../hooks/useChatQuery";

interface BottomNavButtonProps extends BottomNavProps {
    isActive: boolean;
    handleNavClick: () => void;
}

export const BottomNavButton = ({ icon, activeIcon, label, isActive, handleNavClick }: BottomNavButtonProps) => {
    const { data: totalUnreadCount = 0 } = useUnreadCountQuery();
    
    // 커피챗 탭이고 안 읽은 메시지가 있을 때 배지 표시
    const showBadge = label === "커피챗" && totalUnreadCount > 0;

    return (
        <li className="max-w-[74px] w-full h-full flex justify-center">
            <button className="w-full h-full flex flex-col items-center justify-center gap-1.5 relative" onClick={handleNavClick}>
                <div className="relative">
                    <Icon name={isActive ? activeIcon : icon} />
                    {showBadge && (
                        <div className="absolute -top-[2px] -right-[4px] min-w-[12px] h-[12px] rounded-full bg-red flex items-center justify-center px-[4px]">
                            <span className="text-[9px] font-bold text-white leading-none">
                                {totalUnreadCount > 99 ? '99+' : totalUnreadCount}
                            </span>
                        </div>
                    )}
                </div>
                <p className={`text-[10px] font-medium leading-none tracking-[-0.4px] ${isActive ? "text-primary" : "text-gray-650"}`}>
                    {label}
                </p>
            </button>
        </li>
    );
}