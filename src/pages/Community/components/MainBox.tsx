import Card from '../../../components/Card';
import Category from '../../../components/Category';
import type { InfoPost } from '../data';
import { formatTimeAgo } from '../time';

type MainBoxPost = InfoPost & {
  authorProfileImageUrl?: string;
  postImageUrl?: string;
};

type MainBoxProps = {
  post: MainBoxPost;
};

const MainBox = ({ post }: MainBoxProps) => {
  const postImageUrl = post.postImageUrl ?? post.imageUrl;

  return (
    <Card
      width="100%"
      height="246px"
      className="flex flex-col"
      style={{ padding: '20px', gap: '24px' }}
    >
      <div className='flex flex-col' style={{ gap: '15px' }}>
        <div className='flex flex-col' style={{ gap: '10px' }}>
          <div className='flex' style={{ gap: '15px' }}>
            {post.authorProfileImageUrl ? (
              <img
                src={post.authorProfileImageUrl}
                alt={`${post.author.name} 프로필`}
                className='h-[48px] w-[48px] rounded-full object-cover'
              />
            ) : (
              <div
                className='h-[48px] w-[48px] rounded-full'
                style={{ backgroundColor: '#D5D5D5' }}
                aria-hidden
              />
            )}
            <div className='flex flex-col justify-center' style={{ gap: '3px' }}>
              <div className='text-sb-14' style={{ color: 'var(--ColorBlack, #202023)' }}>
                {post.author.name}
              </div>
              <div className='text-r-12' style={{ color: 'var(--ColorGray3, #646464)' }}>
                {post.author.major} {post.author.studentId}학번
              </div>
            </div>
          </div>

          <div className='flex' style={{ gap: '15px' }}>
            <div className='flex flex-1 flex-col' style={{ gap: '7px' }}>
              <div
                className='text-sb-16-hn'
                style={{
                  color: 'var(--ColorBlack, #202023)',
                  display: '-webkit-box',
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {post.title}
              </div>
              <div className='line-clamp-2 text-r-14' style={{ color: 'var(--ColorGray3, #646464)' }}>
                {post.content}
              </div>
            </div>
            {postImageUrl && (
              <img
                src={postImageUrl}
                alt=''
                className='h-[80px] w-[80px] rounded-[8px] object-cover'
              />
            )}
          </div>
        </div>

        <div className='flex flex-wrap items-center' style={{ gap: '5px' }}>
          {post.categories.map((category) => (
            <Category key={category} label={category} height={20} className='px-[6px]' />
          ))}
        </div>
      </div>

        <div className='flex items-center justify-between text-r-12' style={{ color: 'var(--ColorGray3, #646464)' }}>
        <div className='flex items-center' style={{ gap: '10px' }}>
          <span className='flex items-center gap-[4px]'>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.5 5.5L5.5 1C5.89782 1 6.27936 1.15804 6.56066 1.43934C6.84196 1.72064 7 2.10218 7 2.5V4.5H9.83C9.97495 4.49836 10.1185 4.52825 10.2508 4.58761C10.383 4.64697 10.5008 4.73437 10.5959 4.84376C10.6911 4.95315 10.7613 5.08191 10.8017 5.22113C10.8421 5.36034 10.8518 5.50668 10.83 5.65L10.14 10.15C10.1038 10.3885 9.98272 10.6058 9.79895 10.762C9.61519 10.9182 9.38116 11.0027 9.14 11H3.5M3.5 5.5V11M3.5 5.5H2C1.73478 5.5 1.48043 5.60536 1.29289 5.79289C1.10536 5.98043 1 6.23478 1 6.5V10C1 10.2652 1.10536 10.5196 1.29289 10.7071C1.48043 10.8946 1.73478 11 2 11H3.5" stroke="#A1A1A1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {post.likes}
          </span>
          <span className='flex items-center gap-[4px]'>
            <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5 5.22223C10.5019 5.95549 10.3306 6.67883 9.99999 7.33334C9.608 8.11764 9.0054 8.77732 8.25968 9.23849C7.51396 9.69966 6.65457 9.94411 5.77777 9.94445C5.04451 9.94636 4.32117 9.77504 3.66666 9.44445L0.5 10.5L1.55555 7.33334C1.22496 6.67883 1.05364 5.95549 1.05555 5.22223C1.05589 4.34543 1.30034 3.48604 1.76151 2.74032C2.22268 1.9946 2.88236 1.392 3.66666 1.00002C4.32117 0.669422 5.04451 0.498104 5.77777 0.500016H6.05555C7.21352 0.5639 8.30723 1.05266 9.12729 1.87271C9.94734 2.69277 10.4361 3.78648 10.5 4.94445V5.22223Z" stroke="#A1A1A1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {post.comments}
          </span>
        </div>
        <span>{formatTimeAgo(post.createdAt)}</span>
      </div>
    </Card>
  );
};

export type { MainBoxPost };
export default MainBox;
