import Icon from "../Icon";
import type { BottomNavProps } from "./BottomNav";

interface BottomNavButtonProps extends BottomNavProps {
    isActive: boolean;
    handleNavClick: () => void;
}

// todo 커피챗 수신 시 Badge UI 구현
export const BottomNavButton = ({ icon, activeIcon, label, isActive, handleNavClick }: BottomNavButtonProps) => {
    
    return (
        <li className="max-w-[74px] w-full h-full flex justify-center">
            <button className="w-full h-full flex flex-col items-center justify-center gap-1.5" onClick={handleNavClick}>
                <Icon name={isActive? activeIcon : icon} />
                <p className={`text-[10px] font-medium leading-none tracking-[-0.4px] ${isActive ? "text-primary" : "text-gray-650"}`}>{label} </p>
            </button>
        </li>
    );
}