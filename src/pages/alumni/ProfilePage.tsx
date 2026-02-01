import { useMemo, useState } from 'react';
import { Navigate, useParams, useSearchParams } from 'react-router-dom';
import Category from '../../components/Category';
import CoffeeChatButton from './components/CoffeeChatButton';
import CoffeeChatModal from './components/CoffeeChatModal';
import { HeaderLayout } from '../../layouts/HeaderLayout';
import { alumniList } from './data';
import { MainHeader } from '../../layouts/headers/MainHeader';

const profilePlaceholder =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='84' height='84'><rect width='84' height='84' fill='%23D5D5D5'/></svg>";
const portfolioPlaceholder =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='90'><rect width='160' height='90' fill='%23D5D5D5'/></svg>";

type AlumniProfilePageProps = {
  enableCoffeeChatModal?: boolean;
};

export const AlumniProfilePage = ({
  enableCoffeeChatModal = true,
}: AlumniProfilePageProps) => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  // URL 파라미터를 기준으로 프로필을 찾습니다.
  const profile = useMemo(() => alumniList.find((item) => item.id === id), [id]);
  // 잘못된 id 접근 시 목록으로 리다이렉트합니다.
  if (!profile) {
    return <Navigate to='/alumni' replace />;
  }
  const shouldOpenCoffeeChat = searchParams.get('coffeeChat') === '1';
  const modalKey = `${profile.id}-${enableCoffeeChatModal ? '1' : '0'}-${shouldOpenCoffeeChat ? '1' : '0'}`;

  return (
    <AlumniProfileContent
      key={modalKey}
      profile={profile}
      enableCoffeeChatModal={enableCoffeeChatModal}
      shouldOpenCoffeeChat={shouldOpenCoffeeChat}
    />
  );
};

type AlumniProfileContentProps = {
  profile: (typeof alumniList)[number];
  enableCoffeeChatModal: boolean;
  shouldOpenCoffeeChat: boolean;
};

const AlumniProfileContent = ({
  profile,
  enableCoffeeChatModal,
  shouldOpenCoffeeChat,
}: AlumniProfileContentProps) => {
  // 팔로우 상태 및 팔로워 수는 즉시 반영하기 위해 로컬 상태로 관리합니다.
  const [isFollowing, setIsFollowing] = useState(profile.isFollowing);
  const [followerCount, setFollowerCount] = useState(profile.followerCount);
  // 쿼리 파라미터에 따라 커피챗 모달을 초기 상태로 열 수 있습니다.
  const [isCoffeeChatOpen, setIsCoffeeChatOpen] = useState(
    enableCoffeeChatModal && shouldOpenCoffeeChat,
  );

  // 팔로우/언팔로우 토글과 카운트 반영.
  const handleFollowToggle = () => {
    const next = !isFollowing;
    setIsFollowing(next);
    setFollowerCount((count) => Math.max(0, count + (next ? 1 : -1)));
    // TODO: sync follow/unfollow state with API and refetch counts.
  };

  // 커피챗 요청 모달 제출 처리.
  const handleCoffeeChatSubmit = (payload: { categories: string[]; message: string }) => {
    // TODO: send selected categories and message to coffee chat request API.
    void payload;
  };

  return (
    <HeaderLayout headerSlot=
      {
        <MainHeader title='프로필' />
      }>
      {/* 프로필 본문 영역 */}
      <div className='flex flex-col bg-white [gap:clamp(18px,6cqw,24px)]'>
        {/* 프로필 상단 영역 */}
        <section className='flex flex-col [padding:clamp(32px,10cqw,40px)_clamp(18px,7cqw,25px)_0] [gap:clamp(18px,6cqw,24px)]'>
          <div
            className='grid items-start [grid-template-columns:auto_minmax(0,1fr)] [column-gap:clamp(24px,6cqw,32px)] [row-gap:clamp(14px,4.5cqw,20px)]'
          >
            {profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt={`${profile.author.name} 프로필`}
                className='h-[clamp(64px,22.4cqw,84px)] w-[clamp(64px,22.4cqw,84px)] shrink-0 rounded-full object-cover'
              />
            ) : (
              <div
                className='h-[clamp(64px,22.4cqw,84px)] w-[clamp(64px,22.4cqw,84px)] shrink-0 rounded-full'
                style={{ background: `url("${profilePlaceholder}") center/cover` }}
                aria-hidden
              />
            )}

            {/* 이름/학과/팔로우 버튼/카테고리 영역 */}
            <div className='flex min-w-0 flex-1 flex-col [gap:clamp(10px,3.5cqw,14px)]'>
              <div
                className='flex items-start justify-between [gap:clamp(10px,3.5cqw,14px)]'
              >
                <div className='flex flex-col'>
                  <div className='text-sb-18 tracking-[-0.04em] text-[color:var(--ColorBlack,#202023)]'>
                    {profile.author.name}
                  </div>
                  <div className='text-r-12 text-[color:var(--ColorGray3,#646464)]'>
                    {profile.author.major} {profile.author.studentId}학번
                  </div>
                </div>

                {/* 팔로우 토글 버튼 */}
                <button
                  type='button'
                  onClick={handleFollowToggle}
                  className={`flex items-center justify-center border border-[var(--ColorMain,#00C56C)] [width:clamp(54px,18cqw,62px)] [height:clamp(22px,7cqw,25px)] [padding:clamp(2px,1cqw,3px)_clamp(5px,2cqw,7px)] [gap:clamp(3px,1.5cqw,5px)] rounded-[clamp(4px,1.6cqw,6px)] ${isFollowing ? 'bg-[var(--ColorMain,#00C56C)]' : 'bg-transparent'
                    }`}
                >
                  {isFollowing ? (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='9'
                      height='9'
                      viewBox='0 0 17 15'
                      fill='none'
                      aria-hidden
                    >
                      <path
                        d='M0.75 7.97222L6.75 13.75L15.75 0.75'
                        stroke='#FFFFFF'
                        strokeWidth='1.5'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='10'
                      height='10'
                      viewBox='0 0 10 10'
                      fill='none'
                      aria-hidden
                    >
                      <path
                        d='M8 2.75V4.25M8 4.25V5.74999M8 4.25H9.5M8 4.25H6.5M5.375 2.1875C5.375 2.63505 5.19721 3.06427 4.88074 3.38074C4.56427 3.69721 4.13505 3.875 3.6875 3.875C3.23995 3.875 2.81072 3.69721 2.49426 3.38074C2.17779 3.06427 2 2.63505 2 2.1875C2 1.73995 2.17779 1.31072 2.49426 0.994257C2.81072 0.67779 3.23995 0.5 3.6875 0.5C4.13505 0.5 4.56427 0.67779 4.88074 0.994257C5.19721 1.31072 5.375 1.73995 5.375 2.1875ZM0.5 8.61749V8.56249C0.5 7.71712 0.835825 6.90636 1.4336 6.30859C2.03137 5.71082 2.84212 5.375 3.6875 5.375C4.53288 5.375 5.34363 5.71082 5.9414 6.30859C6.53918 6.90636 6.875 7.71712 6.875 8.56249V8.61699C5.91274 9.19654 4.81031 9.50189 3.687 9.49999C2.5215 9.49999 1.431 9.17749 0.5 8.61699V8.61749Z'
                        stroke='#00C56C'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  )}
                  <span
                    className={`font-normal leading-normal [font-size:clamp(9px,2.8cqw,10px)] ${isFollowing ? 'text-[color:var(--ColorWhite,#FFF)]' : 'text-[color:var(--ColorMain,#00C56C)]'
                      }`}
                  >
                    {isFollowing ? '팔로잉' : '팔로우'}
                  </span>
                </button>
              </div>

              <div className='flex flex-wrap [gap:clamp(3px,1.5cqw,5px)]'>
                {profile.categories.map((category) => (
                  <Category key={category} label={category} />
                ))}
              </div>
            </div>

            {/* 팔로우 통계가 공개인 경우에만 표시 */}
            {profile.privacy.showFollowStats && (
              <div
                className='flex flex-col [gap:clamp(6px,2.2cqw,8px)] [grid-column:1/2] [grid-row:2/3]'
              >
                <div
                  className='flex flex-col [gap:clamp(2px,2cqw,4px)] [padding:11px_clamp(2px,1cqw,3px)] pl-[3px]'
                >
                  <div className='flex items-center [gap:clamp(2px,1cqw,3px)]'>
                    <span className='text-r-14 text-[color:var(--ColorBlack,#202023)]'>
                      팔로잉
                    </span>
                    <span className='text-sb-14 text-[color:var(--ColorBlack,#202023)]'>
                      {profile.followingCount}
                    </span>
                  </div>
                  <div className='flex items-center [gap:clamp(2px,1cqw,3px)]'>
                    <span className='text-r-14 text-[color:var(--ColorBlack,#202023)]'>
                      팔로워
                    </span>
                    <span className='text-sb-14 text-[color:var(--ColorBlack,#202023)]'>
                      {followerCount}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 팔로우 통계 비공개일 때 레이아웃 유지용 빈 영역 */}
            {!profile.privacy.showFollowStats && (
              <div
                aria-hidden
                className='h-full [grid-column:1/2] [grid-row:2/3]'
              />
            )}

            {/* 소개글 영역 */}
            <p
              className='line-clamp-3 text-r-14 text-[color:var(--ColorGray2,#A1A1A1)] [padding-top:clamp(8px,3cqw,11px)] [grid-column:2/3] [grid-row:2/3]'
            >
              {profile.intro}
            </p>

          </div>
        </section>

        {/* 커피챗 요청 버튼 영역 */}
        <section className='flex [padding:0_clamp(18px,7cqw,25px)_clamp(24px,8cqw,30px)]'>
          <CoffeeChatButton
            onClick={() => {
              if (!enableCoffeeChatModal) return;
              setIsCoffeeChatOpen(true);
            }}
          />
        </section>

        {/* 구분선 */}
        <div className='h-[10px] bg-gray-150' />

        {/* 포트폴리오/학력/경력/자격증 영역 */}
        <section className='flex flex-col gap-[30px] px-[25px] py-[30px]'>
          {/* 포트폴리오 섹션 */}
          {profile.privacy.showPortfolio && (
            <div className='flex flex-col gap-[10px]'>
              <div className='flex items-center justify-between'>
                <span className='text-SB-18 text-gray-900'>포트폴리오</span>
                <button
                  type='button'
                  className='flex items-center gap-[2px] text-R-12-hn text-gray-650'
                  onClick={() => {
                    // TODO: 포트폴리오 전체보기 라우터 연결 필요.
                  }}
                >
                  전체보기
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='4'
                    height='9'
                    viewBox='0 0 4 9'
                    fill='none'
                    aria-hidden
                  >
                    <path
                      d='M0.75 0.75L3 4.5L0.75 8.25'
                      stroke='var(--ColorGray2, #A1A1A1)'
                      strokeWidth='1.2'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                    />
                  </svg>
                </button>
              </div>

              <div className='h-0 border border-gray-150' />

              <div className='flex gap-[5px] overflow-x-auto whitespace-nowrap [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
                  {profile.portfolioItems.map((item) => (
                    <div key={item.id} className='flex flex-col gap-[5px] shrink-0'>
                      <div className='h-[90px] w-[160px] overflow-hidden rounded-[12px] bg-[var(--ColorGray1,#D5D5D5)]'>
                        <img
                          src={item.image ?? portfolioPlaceholder}
                          alt={item.title}
                          className='h-full w-full object-cover'
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = portfolioPlaceholder;
                          }}
                        />
                      </div>
                      <div className='pl-[10px] text-M-14 text-gray-750'>
                        {item.title}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 학력 섹션 */}
          {profile.privacy.showEducation && (
            <div className='flex flex-col gap-[10px]'>
              <div className='text-SB-18 text-gray-900'>학력</div>
              <div className='h-0 border border-gray-150' />
              <div className='text-R-14 flex flex-col gap-[15px]'>
                {profile.educationItems.map((item) => (
                  <div key={item.id} className='flex flex-col gap-[3px]'>
                    <div className='text-r-12-hn text-gray-650'>{item.period}</div>
                    <div className='flex items-center gap-[5px]'>
                      <span className='text-r-16-hn text-gray-900'>{item.school}</span>
                      <span className='text-r-14-hn text-gray-750'>{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 경력 섹션 */}
          {profile.privacy.showCareer && (
            <div className='flex flex-col gap-[10px]'>
              <div className='text-SB-18 text-gray-900'>경력</div>
              <div className='h-0 border border-gray-150' />
              <div className='text-R-14 flex flex-col gap-[15px]'>
                {profile.careerItems.map((item) => (
                  <div key={item.id} className='flex flex-col gap-[3px]'>
                    <div className='text-r-12-hn text-gray-650'>{item.period}</div>
                    <div className='flex gap-[5px]'>
                      <div className='text-r-16-hn text-gray-900 w-[120px]'>{item.company}</div>
                      <div className='flex flex-col gap-[3px]'>
                        {item.tasks.map((task, index) => (
                          <div key={`${item.id}-${index}`} className='text-r-14-hn text-gray-750'>
                            - {task}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 자격증 섹션 */}
          {profile.privacy.showCertificates && (
            <div className='flex flex-col gap-[10px]'>
              <div className='text-SB-18 text-gray-900'>자격증</div>
              <div className='h-0 border border-gray-150' />
              <div className='text-R-14 flex flex-col gap-[15px]'>
                {profile.certificateItems.map((item) => (
                  <div key={item.id} className='flex flex-col gap-[3px]'>
                    <div className='text-r-12-hn text-gray-650'>{item.date}</div>
                    <div className='text-r-16-hn text-gray-900'>{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>

      {enableCoffeeChatModal && (
        <CoffeeChatModal
          key={isCoffeeChatOpen ? 'open' : 'closed'}
          isOpen={isCoffeeChatOpen}
          onClose={() => setIsCoffeeChatOpen(false)}
          categories={profile.categories}
          onSubmit={handleCoffeeChatSubmit}
        />
      )}
    </HeaderLayout>
  );
};
