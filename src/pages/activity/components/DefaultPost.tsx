import Category from '../../../components/Category';
import Icon from '../../../components/Icon';
import type { ActivityPost } from '../../../types/activityPost';
import { formatTimeAgo } from '../time';

type DefaultPostProps = {
  post: ActivityPost;
  showRecruitStatus?: boolean;
};

const DefaultPost = ({ post, showRecruitStatus = false }: DefaultPostProps) => {
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
      <div className='flex flex-wrap items-center' style={{ gap: '5px' }}>
        {showRecruitStatus ? (
          <span
            className={`inline-flex h-[22px] items-center justify-center rounded-[5px] border px-[10px] text-r-12 ${
              post.status === 'CLOSED'
                ? 'border-[var(--ColorGray2,#A1A1A1)] text-[var(--ColorGray2,#A1A1A1)]'
                : 'border-[var(--ColorMain,#00C56C)] text-[var(--ColorMain,#00C56C)]'
            }`}
          >
            {post.status === 'CLOSED' ? '모집 완료' : '모집 중'}
          </span>
        ) : null}
        {post.categories.map((category) => (
          <Category key={category} label={category} className='h-[20px] px-[6px]' />
        ))}
      </div>
      <div className='flex flex-col' style={{ gap: '7px' }}>
        <div className='flex items-center gap-[6px]'>
          <span className='text-sb-14 text-gray-900'>{post.author.name}</span>
          <span className='text-r-12 text-gray-750'>
            · {post.author.major} {post.author.studentId}학번
          </span>
        </div>
        <div className='flex items-start justify-between gap-[12px]'>
          <div className='flex min-w-0 flex-1 flex-col' style={{ gap: '7px' }}>
            <div className='text-sb-16-hn leading-[150%] text-gray-900'>{post.title}</div>

            <div className='line-clamp-2 text-r-16 text-gray-750'>{post.content}</div>

            <div className='flex items-center gap-[10px] text-r-12 text-gray-650'>
              <span className='flex items-center gap-[4px]'>
                <Icon name='like' className='h-[12px] w-[12px]' />
                {post.likes}
              </span>
              <span className='flex items-center gap-[4px]'>
                <Icon name='comment' className='h-[12px] w-[12px]' />
                {post.comments}
              </span>
              <span>{formatTimeAgo(post.createdAt)}</span>
            </div>
          </div>
          {thumbnailUrl ? (
            <img
              src={thumbnailUrl}
              alt=''
              className='h-[95px] w-[95px] shrink-0 rounded-[5px] object-cover'
            />
          ) : null}
        </div>
      </div>
    </article>
  );
};

export default DefaultPost;
