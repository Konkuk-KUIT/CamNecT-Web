import { useNavigate } from "react-router-dom";

interface RecruitPostProps {
    postId: string;
    authorId: string;
    authorName: string;
    title: string;
    contestName: string;
    bookmarkCount: number;
    recruitNow: boolean;
    createdAt: string;
}

export const RecruitPost = ({
    postId,
    authorName,
    title,
    contestName,
    recruitNow,
    bookmarkCount,
    createdAt,
}: RecruitPostProps) => {
    const navigate = useNavigate();
    return (
        <div
            className="flex flex-col items-start gap-[8px] px-[25px] py-[20px] border-b border-gray-150"
            onClick={() => navigate(`/recruit/post/${postId}`)}
        >
            {/* Tag */}
            <span
                className={`flex justify-center items-center px-[10px] py-[3px] rounded-[5px] text-r-12-hn border ${
                    recruitNow ? 'text-primary border-primary' : 'text-gray-650 border-gray-650'
                }`}
            >
                {recruitNow ? "모집 중" : "완료"}
            </span>

            {/* Title & Content */}
            <div className="flex flex-col gap-[5px]">
                <span className="text-b-16-hn text-gray-900 truncate">
                    {title}
                </span>
                <div className="text-r-14-hn text-gray-750">
                    {authorName} | {contestName}
                </div>
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-[5px] text-r-12-hn text-gray-650">
                <div className="flex items-center gap-[3px]">
                    <svg viewBox="0 0 11 12" fill="none" className="w-[11px] h-[12px] block shrink-0">
                        <path 
                            d="M9.22867 0.697692C9.962 0.775908 10.5 1.3558 10.5 2.03286V11.5L5.5 9.20853L0.5 11.5V2.03286C0.5 1.3558 1.03733 0.775908 1.77133 0.697692C4.24879 0.434103 6.75121 0.434103 9.22867 0.697692Z" 
                            stroke="#A1A1A1" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                        />
                    </svg>
                    <span>{bookmarkCount}</span>
                </div>
                <span>|</span>
                <span>{createdAt}</span>
            </div>
        </div>
    );
};