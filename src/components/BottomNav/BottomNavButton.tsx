import Icon from "../Icon";
import type { BottomNavProps } from "./BottomNav";

export const BottomNavButton = ({icon, activeIcon, label, hasBadge}: BottomNavProps) => {
    return (
        <li className="max-w-[74px] w-full h-full flex justify-center">
            <button className="w-full h-full flex flex-col items-center justify-center gap-1.5">
                <Icon name={icon} />
                <p className="text-[10px] font-medium leading-none tracking-[-0.4px] text-gray-650">{label} </p>
            </button>
        </li>
    );
}