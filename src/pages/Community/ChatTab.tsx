import Category from '../../components/Category';
import type { ChatPost } from './data';
import { formatTimeAgo } from './time';

type ChatTabProps = {
  posts: ChatPost[];
};

const ChatTab = ({ posts }: ChatTabProps) => {
  return (
    <div className='flex flex-col bg-white' style={{ padding: '20px 25px', gap: '12px' }}>
      {posts.map((post) => (
        <article
          key={post.id}
          className='flex flex-col'
          style={{
            gap: '10px',
            paddingBottom: '10px',
            borderBottom: '1px solid var(--Color_Gray_B, #FCFCFC)',
          }}
        >
          <div className='flex flex-wrap items-center' style={{ gap: '5px' }}>
            {post.categories.map((category) => (
              <Category key={category} label={category} height={20} className='px-[6px]' />
            ))}
          </div>

          <div className='flex flex-col' style={{ gap: '7px' }}>
            <div
              style={{
                color: 'var(--ColorBlack, #202023)',
                fontFamily: 'Pretendard',
                fontWeight: 600,
                fontSize: '16px',
                lineHeight: '150%',
              }}
            >
              {post.title}
            </div>
            <div
              style={{
                color: 'var(--ColorGray3, #646464)',
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '150%',
              }}
            >
              {post.content}
            </div>
            <div
              className='flex items-center gap-[10px]'
              style={{
                color: 'var(--ColorGray2, #A1A1A1)',
                fontFamily: 'Pretendard',
                fontWeight: 400,
                fontSize: '12px',
                lineHeight: '140%',
              }}
            >
              <span>좋아요 {post.likes}</span>
              <span>댓글 {post.comments}</span>
              <span>{formatTimeAgo(post.createdAt)}</span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default ChatTab;
