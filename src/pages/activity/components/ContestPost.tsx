import type { ActivityPost } from '../../../types/activityPost';
import { formatTimeAgo } from '../time';

type ContestPostProps = {
  post: ActivityPost;
};

const ContestPost = ({ post }: ContestPostProps) => {
  const thumbnailUrl = post.thumbnailUrl ?? post.postImages?.[0];

  return (
    <article
      className='flex flex-col'
      style={{
        gap: '10px',
        paddingBottom: '10px',
        borderBottom: '1px solid var(--ColorGray2,rgb(239, 239, 239))',
      }}
    >
      <div className='flex items-start justify-between gap-[12px]'>
        <div className='flex min-w-0 flex-1 flex-col' style={{ gap: '8px' }}>
          <div className='text-sb-16-hn leading-[150%] text-gray-900'>{post.title}</div>
          <div className='line-clamp-2 text-r-14 text-gray-750'>{post.content}</div>
          <div className='text-r-12 text-gray-650'>{formatTimeAgo(post.createdAt)}</div>
        </div>
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt=''
            className='h-[95px] w-[95px] shrink-0 rounded-[5px] object-cover'
          />
        ) : null}
      </div>
    </article>
  );
};

export default ContestPost;
