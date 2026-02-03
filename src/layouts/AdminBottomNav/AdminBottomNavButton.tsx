import Icon from "../../components/Icon";
import type { AdminBottomNavProps } from "./AdminBottomNav";

interface AdminBottomNavButtonProps extends AdminBottomNavProps {
    isActive: boolean;
    handleNavClick: () => void;
}

export const AdminBottomNavButton = ({ icon, activeIcon, label, isActive, handleNavClick }: AdminBottomNavButtonProps) => {

    return (
        <li className="max-w-[74px] w-full h-full flex justify-center">
            <button className="w-full h-full flex flex-col items-center justify-center gap-1.5" onClick={handleNavClick}>
                <Icon name={isActive? activeIcon : icon} />
                <p className={`text-[10px] font-medium leading-none tracking-[-0.4px] ${isActive ? "text-primary" : "text-gray-650"}`}>{label} </p>
            </button>
        </li>
    );
}
