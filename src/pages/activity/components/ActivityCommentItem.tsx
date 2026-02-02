import type { ActivityComment } from '../../../types/activityPost';

type ActivityCommentItemProps = {
  comment: ActivityComment;
  isReply?: boolean;
};

const ActivityCommentItem = ({ comment, isReply = false }: ActivityCommentItemProps) => {
  return (
    <div
      className={`flex flex-col gap-[6px] py-[12px] ${
        isReply ? 'pl-[20px] border-l border-[#ECECEC]' : ''
      }`}
    >
      <div className='text-sb-14 text-[var(--ColorBlack,#202023)]'>
        {comment.author.name}
      </div>
      <div className='text-r-14 text-[var(--ColorGray3,#646464)]'>
        {comment.content}
      </div>
      <div className='text-r-12 text-[var(--ColorGray2,#A1A1A1)]'>{comment.createdAt}</div>
    </div>
  );
};

export default ActivityCommentItem;
