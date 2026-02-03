import { useNavigate } from "react-router-dom";
import type { InfoPost, QuestionPost } from '../../../../types/community';
import { formatTimeAgo } from "../../../../utils/formatDate";

type CommunityPostProps = (InfoPost|QuestionPost)

export const CommunityPost = (post: CommunityPostProps) => {
    const navigate = useNavigate();
    const isQuestionPost = 'answers' in post;
    return (
        <div
            className="flex flex-col gap-[10px] px-[25px] py-[20px] border-b border-gray-150 cursor-pointer"
            onClick={() => navigate(`/community/post/${post.id}`)}
        >
            {/* Tags */}
            <div className="flex flex-wrap gap-[5px]">
                {post.categories.map((tag) => (
                    <span
                        key={tag}
                        className="flex justify-center items-center px-[10px] py-[4px] rounded-[5px] text-r-12-hn border bg-green-50 text-primary border-primary"
                    >
                        {tag}
                    </span>
                ))}
            </div>

            <div className="flex gap-[20px]">
                <div className="flex-1 flex flex-col gap-[7px]">
                    <div className="flex flex-col gap-[7px]">
                        <div className="flex items-center gap-[3px]">
                            <span className="text-sb-14-hn text-gray-900">{post.author.name}</span>
                            <span className="text-r-12-hn text-gray-750">· {post.author.major} {post.author.studentId}학번</span>
                        </div>
                        <span className="text-sb-16-hn text-gray-900 truncate">
                            {post.title}
                        </span>
                        <div className="text-r-16 text-gray-750 whitespace-pre-line break-keep line-clamp-2 [overflow-wrap:anywhere]">
                            {post.content}
                        </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-[7px] text-r-12-hn text-gray-650">
                        <div className="flex items-center gap-[5px]">
                            <div className="flex items-center gap-[3px]">
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.5 5.5L5.5 1C5.89782 1 6.27936 1.15804 6.56066 1.43934C6.84196 1.72064 7 2.10218 7 2.5V4.5H9.83C9.97495 4.49836 10.1185 4.52825 10.2508 4.58761C10.383 4.64697 10.5008 4.73437 10.5959 4.84376C10.6911 4.95315 10.7613 5.08191 10.8017 5.22113C10.8421 5.36034 10.8518 5.50668 10.83 5.65L10.14 10.15C10.1038 10.3885 9.98272 10.6058 9.79895 10.762C9.61519 10.9182 9.38116 11.0027 9.14 11H3.5M3.5 5.5V11M3.5 5.5H2C1.73478 5.5 1.48043 5.60536 1.29289 5.79289C1.10536 5.98043 1 6.23478 1 6.5V10C1 10.2652 1.10536 10.5196 1.29289 10.7071C1.48043 10.8946 1.73478 11 2 11H3.5" stroke="#A1A1A1" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center gap-[3px]">
                                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10.5 5.22223C10.5019 5.95549 10.3306 6.67883 9.99999 7.33334C9.608 8.11764 9.0054 8.77732 8.25968 9.23849C7.51396 9.69966 6.65457 9.94411 5.77777 9.94445C5.04451 9.94636 4.32117 9.77504 3.66666 9.44445L0.5 10.5L1.55555 7.33334C1.22496 6.67883 1.05364 5.95549 1.05555 5.22223C1.05589 4.34543 1.30034 3.48604 1.76151 2.74032C2.22268 1.9946 2.88236 1.392 3.66666 1.00002C4.32117 0.669422 5.04451 0.498104 5.77777 0.500016H6.05555C7.21352 0.5639 8.30723 1.05266 9.12729 1.87271C9.94734 2.69277 10.4361 3.78648 10.5 4.94445V5.22223Z" stroke="#A1A1A1" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                                <span>{isQuestionPost ? post.answers : post.comments}</span>
                            </div>
                        </div>
                        <span>|</span>
                        <span>{formatTimeAgo(post.createdAt)}</span>
                    </div>
                </div>

                {/* Thumbnail (optional) */}
                {post.imageUrl && (
                    <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-[80px] h-[80px] rounded-[8px] object-cover flex-shrink-0"
                    />
                )}
            </div>
        </div>
    );
};