import { useNavigate } from "react-router-dom";
import { type UserMini } from "../../../../types/mypage/mypageTypes";

interface CommunityPostType {
    postId: string;
    authorInfo: UserMini;
    title: string;
    preview: string;
    likeCount: number;
    commentCount: number;
    tags: string[];
    createdAt: string;
    thumbnailUrl?: string;
}

export const CommunityPost = ({
    postId,
    authorInfo,
    title,
    preview,
    tags,
    likeCount,
    commentCount,
    createdAt,
    thumbnailUrl,
}: CommunityPostType) => {
    const navigate = useNavigate();
    return (
        <div
            className="flex flex-col gap-[5px] px-[25px] pb-[20px] border-b border-gray-150 cursor-pointer"
            onClick={() => navigate(`/community/post/${postId}`)}
        >
            {/* Tags */}
            <div className="flex flex-wrap gap-[5px]">
                {tags.map((tag) => (
                    <span
                        key={tag}
                        className="flex justify-center items-center px-[10px] py-[4px] rounded-[5px] text-r-12-hn border bg-green-50 text-primary border-primary"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="">
                <span className="h-[22px] text-sb-16-hn text-gray-900 truncate">
                    {title}
                </span>
            </div>

            <div className="flex gap-[20px]">
                <div className="flex-1 flex flex-col gap-[7px]">
                    {/* Title & Content */}
                    <div className="flex flex-col gap-[5px]">
                        <div className="h-[45px] text-r-16 text-gray-750 whitespace-pre-line break-keep line-clamp-2">
                            {preview}
                        </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-[12px] text-R-12-hn text-gray-500">
                        <div className="flex items-center gap-[4px]">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M11.3333 14V12.6667C11.3333 11.9594 11.0524 11.2811 10.5523 10.781C10.0522 10.281 9.37391 10 8.66667 10H4C3.29276 10 2.61448 10.281 2.11438 10.781C1.61429 11.2811 1.33333 11.9594 1.33333 12.6667V14" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M6.33333 7.33333C7.80609 7.33333 9 6.13943 9 4.66667C9 3.19391 7.80609 2 6.33333 2C4.86057 2 3.66667 3.19391 3.66667 4.66667C3.66667 6.13943 4.86057 7.33333 6.33333 7.33333Z" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>{likeCount}</span>
                        </div>
                        <div className="flex items-center gap-[4px]">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                <path d="M14.6667 10C14.6667 10.3536 14.5262 10.6928 14.2761 10.9428C14.0261 11.1929 13.687 11.3333 13.3333 11.3333H4.66667L2 14V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H13.3333C13.687 2 14.0261 2.14048 14.2761 2.39052C14.5262 2.64057 14.6667 2.97971 14.6667 3.33333V10Z" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>{commentCount}</span>
                        </div>
                        {createdAt && (
                            <span>| {createdAt}</span>
                        )}
                    </div>
                </div>

                {/* Thumbnail (optional) */}
                {thumbnailUrl && (
                    <img
                        src={thumbnailUrl}
                        alt={title}
                        className="w-[80px] h-[80px] rounded-[8px] object-cover flex-shrink-0"
                    />
                )}
            </div>
        </div>
    );
};