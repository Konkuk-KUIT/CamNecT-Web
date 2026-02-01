import Toggle from "../../../components/Toggle/Toggle";

interface ChatPostAccordianProps {
    title: string;
    isOpen: boolean;
    requestCount: number;
    onClick: () => void;
}

export const ChatPostAccordian = ({ title, isOpen, requestCount, onClick }: ChatPostAccordianProps) => {
    return (
        <li 
            className="border-b-[1px] border-primary bg-green-50"
        >
            <button
                onClick={onClick}
                className="flex w-full gap-[4px] items-center justify-between px-[25px] py-[15px] cursor-pointer transition-colors"
            >
            <h2 className="flex items-center gap-1 min-w-0 text-[16px] font-semibold text-primary leading-[140%] tracking-[-0.64px]">
                <span className="truncate">{title}</span>
                <span className="flex-none">({requestCount})</span>
            </h2>
            <Toggle
                toggled={isOpen}
                strokeColor="var(--color-primary)"
            />
            </button>
        </li>
    )
}