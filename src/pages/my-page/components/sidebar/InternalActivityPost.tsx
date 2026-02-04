import { useNavigate } from "react-router-dom";
import type { ActivityListItem } from '../../../../types/activityPage/activityPageTypes';

export const InternalActivityPost = (post: ActivityListItem) => {
    const navigate = useNavigate();
    return (
        <button
            className="flex flex-col gap-[10px] px-[25px] py-[20px] border-b border-gray-150"
            onClick={() => navigate(`/activity/post/${post.id}`)}
        >
            {/* Tags */}
            <div className="flex flex-wrap gap-[5px]">
                {post.tags.map((tag) => (
                    <span
                        key={tag}
                        className={`flex justify-center items-center px-[10px] py-[4px] rounded-[5px] text-r-12-hn border ${
                            tag === '모집중'
                                ? 'text-primary border-primary'
                                : 'bg-green-50 text-primary border-primary'
                        }`}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex gap-[20px]">
                <div className="min-w-0 flex-1 flex flex-col gap-[10px]">
                    {/* Title & Content */}
                    <div className="flex flex-col gap-[5px]">
                        <span className="text-sb-16-hn text-gray-900 truncate">
                            {post.title}
                        </span>
                        <div className="text-r-16 text-gray-750 whitespace-pre-line break-keep line-clamp-2 [overflow-wrap:anywhere]">
                            {post.content}
                        </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-[3px]">
                        <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path 
                                d="M9.22867 0.697692C9.962 0.775908 10.5 1.3558 10.5 2.03286V11.5L5.5 9.20853L0.5 11.5V2.03286C0.5 1.3558 1.03733 0.775908 1.77133 0.697692C4.24879 0.434103 6.75121 0.434103 9.22867 0.697692Z" 
                                stroke="#A1A1A1" 
                                strokeLinecap="round" 
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="text-r-12-hn text-gray-650">{post.bookmarkCount}</span>
                    </div>
                </div>

                {/* Thumbnail (optional) */}
                {post.posterImg && (
                    <img
                        src={post.posterImg}
                        alt={post.title}
                        className="w-[95px] h-[95px] rounded-[5px] object-cover flex-shrink-0"
                    />
                )}
            </div>
        </button>
    );
};