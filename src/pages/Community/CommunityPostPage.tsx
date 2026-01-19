import Category from '../../components/Category';
import Icon from '../../components/Icon';
import { HeaderLayout } from '../../layouts/HeaderLayout';
import { MainHeader } from '../../layouts/headers/MainHeader';

type AuthorInfo = {
  name: string;
  major: string;
  studentId: string;
  profileImageUrl?: string;
};

type CommentItem = {
  id: string;
  author: AuthorInfo;
  content: string;
  createdAt: string;
  replies?: CommentItem[];
};

const postData = {
  boardType: '정보',
  title: '진로 고민하는 후배들에게 공유하고 싶은 내용',
  likes: 24,
  comments: 6,
  createdAt: '25.01.31 04:01',
  author: {
    name: '박원빈',
    major: '컴퓨터공학부',
    studentId: '20',
    profileImageUrl: '',
  },
  content:
    '요즘 어떤 분야로 진로를 잡을지 고민이 많아서, 제가 정리했던 자료와 멘토링에서 들었던 이야기를 나눠보려고 합니다. 도움이 되길 바랍니다.',
  categories: ['취업', '진로', '멘토링'],
};

const commentList: CommentItem[] = [
  {
    id: 'comment-1',
    author: {
      name: '김은지',
      major: '경영학부',
      studentId: '22',
    },
    content: '정리해주신 자료가 깔끔해서 이해가 쉬웠어요. 감사합니다!',
    createdAt: '25.01.31 06:12',
    replies: [
      {
        id: 'comment-1-1',
        author: {
          name: '박원빈',
          major: '컴퓨터공학부',
          studentId: '20',
        },
        content: '도움이 되었다니 다행이에요. 추가 질문 있으면 남겨주세요!',
        createdAt: '25.01.31 07:05',
      },
    ],
  },
  {
    id: 'comment-2',
    author: {
      name: '정가을',
      major: '디자인컨버전스학부',
      studentId: '20',
    },
    content: '이런 경험 공유가 더 많아졌으면 좋겠어요.',
    createdAt: '25.01.31 09:41',
  },
];

const CommunityPostPage = () => {
  const renderComment = (comment: CommentItem, isReply = false) => {
    const hasProfileImage = Boolean(comment.author.profileImageUrl);

    return (
      <div
        key={comment.id}
        className={`flex flex-col gap-[12px] ${isReply ? 'ml-[18px] border-l border-[#ECECEC] pl-[12px]' : ''}`}
      >
        <div className='flex items-start gap-[10px]'>
          {hasProfileImage ? (
            <img
              src={comment.author.profileImageUrl}
              alt={`${comment.author.name} 프로필`}
              className='h-[28px] w-[28px] rounded-full object-cover'
            />
          ) : (
            <div className='h-[28px] w-[28px] rounded-full bg-[#ECECEC]' aria-hidden='true' />
          )}
          <div className='flex flex-col gap-[4px]'>
            <div className='text-[14px] font-semibold text-[var(--ColorBlack,#202023)]'>
              {comment.author.name}
            </div>
            <div className='text-[12px] text-[var(--ColorGray3,#646464)]'>
              {comment.author.major} {comment.author.studentId}학번
            </div>
          </div>
        </div>
        <div className='text-[14px] leading-[150%] text-[var(--ColorGray3,#646464)]'>
          {comment.content}
        </div>
        <div className='text-[12px] text-[var(--ColorGray2,#A1A1A1)]'>
          {comment.createdAt}
        </div>
        {comment.replies && comment.replies.length > 0 ? (
          <div className='flex flex-col gap-[16px]'>
            {comment.replies.map((reply) => renderComment(reply, true))}
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <HeaderLayout
      headerSlot={<MainHeader title='커뮤니티' rightActions={[{ icon: 'option' }]} />}
    >
      <main className='flex w-full justify-center bg-white'>
        <div className='flex w-full max-w-[720px] flex-col sm:px-[25px]'>
          <section className='flex flex-col gap-[35px] border-b border-[#ECECEC] px-5 pb-[30px] pt-[22px] sm:px-[25px]'>
            <div className='flex flex-col gap-[20px]'>
              <div className='text-[12px] font-normal text-[var(--ColorMain,#00C56C)]'>
                {postData.boardType} 게시판 &gt;
              </div>
              <div className='flex flex-col gap-[13px]'>
                <div className='text-[24px] font-bold leading-[130%] text-black'>
                  {postData.title}
                </div>
                <div className='flex flex-wrap items-center gap-[10px] text-[12px] text-[var(--ColorGray3,#646464)]'>
                  <div className='flex items-center gap-[5px]'>
                    <div className='flex items-center gap-[3px]'>
                      <Icon name='like' className='h-[14px] w-[14px]' />
                      <span>{postData.likes}</span>
                    </div>
                    <div className='flex items-center gap-[3px]'>
                      <Icon name='comment' className='h-[14px] w-[14px]' />
                      <span>{postData.comments}</span>
                    </div>
                  </div>
                  <span className='text-[var(--ColorGray2,#A1A1A1)]'>
                    {postData.createdAt}
                  </span>
                </div>
              </div>
            </div>

            <div className='flex justify-between gap-[12px] border-b border-[#ECECEC] pb-[15px] sm:flex-row sm:items-center '>
              <div className='flex items-center gap-[10px]'>
                {postData.author.profileImageUrl ? (
                  <img
                    src={postData.author.profileImageUrl}
                    alt={`${postData.author.name} 프로필`}
                    className='h-[32px] w-[32px] rounded-full object-cover'
                  />
                ) : (
                  <div className='h-[32px] w-[32px] rounded-full bg-[#ECECEC]' aria-hidden='true' />
                )}
                <div className='flex flex-col gap-[4px]'>
                  <div className='text-[14px] font-semibold text-[var(--ColorBlack,#202023)]'>
                    {postData.author.name}
                  </div>
                  <div className='text-[12px] text-[var(--ColorGray3,#646464)]'>
                    {postData.author.major} {postData.author.studentId}학번
                  </div>
                </div>
              </div>
              <button
                type='button'
                className='inline-flex items-center justify-center rounded-[10px] border border-[var(--ColorMain,#00C56C)] px-[10px] py-[6px] text-[12px] font-normal text-[var(--ColorMain,#00C56C)]'
              >
                커피챗 보내기
              </button>
            </div>

            <div className='flex flex-col gap-[20px]'>
              <div className='text-[16px] leading-[160%] text-[var(--ColorGray3,#646464)]'>
                {postData.content}
              </div>
              <div className='flex flex-wrap gap-[5px]'>
                {postData.categories.map((category) => (
                  <Category key={category} label={category} />
                ))}
              </div>
            </div>
          </section>

          <section className='flex flex-col gap-[35px] border-b border-[#ECECEC] px-[25px] py-[20px]'>
            {commentList.map((comment) => renderComment(comment))}
          </section>
        </div>
      </main>
    </HeaderLayout>
  );
};

export default CommunityPostPage;
