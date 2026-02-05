import { useNavigate } from 'react-router-dom';
import type { ActivityPost } from '../../types/activityPage/activityPageTypes';
import { formatOnlyDate, getDDay } from '../../utils/formatDate';

type ExternalActivityPostProps = {
  post: ActivityPost;
};

const ExternalActivityPost = ({ post }: ExternalActivityPostProps) => {
  const navigate = useNavigate();
  const thumbnailUrl = post.thumbnailUrl ?? post.postImages?.[0];
  const isJobPost = post.tab === 'job';
  const dDay = post.deadline ? getDDay(post.deadline) : null;

  return (
    <button
      className='flex flex-col gap-[10px] px-[25px] py-[20px] border-b border-gray-150 text-left w-full'
      onClick={() => navigate(`/activity/external/${post.id}`)}
    >
      {/* Tags */}
      <div className='flex flex-wrap gap-[5px]'>
        {post.categories.map((tag) => (
          <span
            key={tag}
            className='flex justify-center items-center px-[10px] py-[4px] rounded-[5px] text-r-12-hn border bg-green-50 text-primary border-primary'
          >
            {tag}
          </span>
        ))}
      </div>

      <div className='flex gap-[16px]'>
        <div className='flex-1 flex flex-col gap-[10px]'>
          {/* Title & Bookmark Count */}
          <div className='flex gap-[8px] items-center'>
            <span className='text-b-20-hn text-gray-900 line-clamp-2'>
              {post.title}
            </span>
            <div className='flex items-center gap-[3px]'>
              <svg viewBox='0 0 11 12' fill='none' className='w-[11px] h-[12px] block shrink-0'>
                <path 
                  d='M9.22867 0.697692C9.962 0.775908 10.5 1.3558 10.5 2.03286V11.5L5.5 9.20853L0.5 11.5V2.03286C0.5 1.3558 1.03733 0.775908 1.77133 0.697692C4.24879 0.434103 6.75121 0.434103 9.22867 0.697692Z' 
                  stroke='#A1A1A1' 
                  strokeLinecap='round' 
                  strokeLinejoin='round'
                />
              </svg>
              <span className='text-r-12-hn text-gray-650'>{post.saveCount}</span>
            </div>
          </div>

          <div className='flex flex-col gap-[30px] items-start'>
            <div className='flex flex-col gap-[5px] text-r-14-hn text-gray-750'>
              {isJobPost ? (
                <span className='text-r-14 min-h-[42px] line-clamp-2'>{post.content}</span>
              ) : (
                <>
                  {post.organizer && <span>{post.organizer}</span>}
                  {post.deadline && <span>접수 기간 : {formatOnlyDate(post.deadline)}</span>}
                </>
              )}
            </div>
            {dDay !== null && (
              <div className='flex justify-center items-center px-[12px] py-[6px] rounded-[20px] bg-primary text-b-14-hn text-white'>
                D-{dDay}
              </div>
            )}
          </div>
        </div>

        {/* Thumbnail with Bookmark Indicator */}
        {thumbnailUrl && (
          <div className='relative'>
            <img
              src={thumbnailUrl}
              alt={post.title}
              className='w-[94px] h-[134px] object-cover flex-shrink-0'
            />
            <svg
              viewBox='0 0 30 30'
              className='w-[30px] h-[30px] absolute top-[3px] right-[3px]'
            >
              <path
                d='M23.75 26.25L15 20L6.25 26.25V6.25C6.25 5.58696 6.51339 4.95107 6.98223 4.48223C7.45107 4.01339 8.08696 3.75 8.75 3.75H21.25C21.913 3.75 22.5489 4.01339 23.0178 4.48223C23.4866 4.95107 23.75 5.58696 23.75 6.25V26.25Z'
                fill={post.isBookmarked ? '#00C56C' : '#000000'}
                fillOpacity={post.isBookmarked ? 1 : 0.2}
                stroke='white'
                strokeWidth={1.5}
                strokeLinecap='round'
                strokeLinejoin='round'
                shapeRendering='crispEdges'
              />
            </svg>
          </div>
        )}
      </div>
    </button>
  );
};

export default ExternalActivityPost;

// import { useNavigate } from "react-router-dom";
// import type { ActivityListItem } from '../../../../types/activityPage/activityPageTypes';
// import { formatOnlyDate, getDDay } from "../../../../utils/formatDate";

// export const ExternalActivityPost = (post: ActivityListItem) => {
//     const navigate = useNavigate();
//     return (
//         <button
//             className="flex flex-col gap-[10px] px-[25px] py-[20px] border-b border-gray-150 text-left"
//             onClick={() => navigate(`/activity/post/${post.id}`)}
//         >
//             {/* Tags */}
//             <div className="flex flex-wrap gap-[5px]">
//                 {post.tags.map((tag) => (
//                     <span
//                         key={tag}
//                         className="flex justify-center items-center px-[10px] py-[4px] rounded-[5px] text-r-12-hn border bg-green-50 text-primary border-primary"
//                     >
//                         {tag}
//                     </span>
//                 ))}
//             </div>

//             <div className="flex gap-[16px]">
//                 <div className="flex-1 flex flex-col gap-[10px]">
//                     {/* Title & Content */}
//                     <div className="flex gap-[8px] items-center">
//                         <span className="text-b-20-hn text-gray-900 line-clamp-2">
//                             {post.title}
//                         </span>
//                         <div className="flex items-center gap-[3px]">
//                             <svg viewBox="0 0 11 12" fill="none" className="w-[11px] h-[12px] block shrink-0">
//                                 <path 
//                                     d="M9.22867 0.697692C9.962 0.775908 10.5 1.3558 10.5 2.03286V11.5L5.5 9.20853L0.5 11.5V2.03286C0.5 1.3558 1.03733 0.775908 1.77133 0.697692C4.24879 0.434103 6.75121 0.434103 9.22867 0.697692Z" 
//                                     stroke="#A1A1A1" 
//                                     strokeLinecap="round" 
//                                     strokeLinejoin="round"
//                                 />
//                             </svg>
//                             <span className="text-r-12-hn text-gray-650">{post.bookmarkCount}</span>
//                         </div>
//                     </div>

//                     <div className="flex flex-col gap-[30px] items-start">
//                         <div className="flex flex-col gap-[5px] text-r-14-hn text-gray-750">
//                             {post.tab == "job" ? (
//                                 <span className="text-r-14 min-h-[42px] line-clamp-2">{post.content}</span>
//                             ):(
//                                 <>
//                                     <span>{post.organizer}</span>
//                                     {post.deadline && <span>접수 기간 : {formatOnlyDate(post.deadline)}</span>}
//                                 </>
//                             )}
//                         </div>
//                         <div className="flex justify-center items-center px-[12px] py-[6px] rounded-[20px] bg-primary text-b-14-hn text-white">{post.deadline ? `D-${getDDay(post.deadline)}`: "D-n"}</div>
//                     </div>
//                 </div>

//                 {/* Thumbnail (optional) */}
//                 {post.posterImg && (
//                     <div className="relative">
//                         <img
//                             src={post.posterImg}
//                             alt={post.title}
//                             className="w-[94px] h-[134px] object-cover flex-shrink-0"
//                         />
//                         <svg
//                             viewBox="0 0 30 30"
//                             className="w-[30px] h-[30px] absolute top-[3px] right-[3px]"
//                         >
//                             <path
//                                 d="M23.75 26.25L15 20L6.25 26.25V6.25C6.25 5.58696 6.51339 4.95107 6.98223 4.48223C7.45107 4.01339 8.08696 3.75 8.75 3.75H21.25C21.913 3.75 22.5489 4.01339 23.0178 4.48223C23.4866 4.95107 23.75 5.58696 23.75 6.25V26.25Z"
//                                 fill={post.isBookmarked ? "#00C56C" : "#000000"}
//                                 fillOpacity={post.isBookmarked ? 1 : 0.2}
//                                 stroke="white"
//                                 strokeWidth={1.5}
//                                 strokeLinecap="round"
//                                 strokeLinejoin="round"
//                                 shapeRendering="crispEdges"
//                             />
//                         </svg>
//                     </div>
//                 )}
//             </div>
//         </button>
//     );
// };