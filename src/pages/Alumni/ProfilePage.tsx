import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Category from '../../components/Category';
import MainLayout from '../../layouts/MainLayout';
import { alumniList } from './data';

const profilePlaceholder =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='84' height='84'><rect width='84' height='84' fill='%23D5D5D5'/></svg>";
const portfolioPlaceholder =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='90'><rect width='160' height='90' fill='%23D5D5D5'/></svg>";

const AlumniProfilePage = () => {
  const { id } = useParams();
  const profile = useMemo(
    () => alumniList.find((item) => item.id === id) ?? alumniList[0],
    [id],
  );
  const [isFollowing, setIsFollowing] = useState(profile.isFollowing);

  useEffect(() => {
    setIsFollowing(profile.isFollowing);
  }, [profile.isFollowing]);

  const handleFollowToggle = () => {
    setIsFollowing((prev) => !prev);
  };

  return (
    <MainLayout title='프로필'>
      <div className='flex flex-col bg-white' style={{ gap: 'clamp(18px, 6cqw, 24px)' }}>
        <section
          className='flex flex-col'
          style={{
            padding: 'clamp(32px, 10cqw, 40px) clamp(18px, 7cqw, 25px) 0',
            gap: 'clamp(18px, 6cqw, 24px)',
          }}
        >
          <div
            className='grid items-start'
            style={{
              gridTemplateColumns: 'auto minmax(0, 1fr)',
              columnGap: 'clamp(24px, 6cqw, 32px)',
              rowGap: 'clamp(14px, 4.5cqw, 20px)',
            }}
          >
            {profile.profileImage ? (
              <img
                src={profile.profileImage}
                alt={`${profile.author.name} 프로필`}
                className='shrink-0 rounded-full object-cover'
                style={{
                  width: 'clamp(64px, 22.4cqw, 84px)',
                  height: 'clamp(64px, 22.4cqw, 84px)',
                }}
              />
            ) : (
              <div
                className='shrink-0 rounded-full'
                style={{
                  width: 'clamp(64px, 22.4cqw, 84px)',
                  height: 'clamp(64px, 22.4cqw, 84px)',
                  background: `url("${profilePlaceholder}") center/cover`,
                }}
                aria-hidden
              />
            )}

            <div
              className='flex min-w-0 flex-1 flex-col'
              style={{ gap: 'clamp(10px, 3.5cqw, 14px)' }}
            >
              <div
                className='flex items-start justify-between'
                style={{ gap: 'clamp(10px, 3.5cqw, 14px)' }}
              >
                <div className='flex flex-col'>
                  <div
                    className='text-sb-18'
                    style={{ color: 'var(--ColorBlack, #202023)', letterSpacing: '-0.04em' }}
                  >
                    {profile.author.name}
                  </div>
                  <div className='text-r-12' style={{ color: 'var(--ColorGray3, #646464)' }}>
                    {profile.author.major} {profile.author.studentId}학번
                  </div>
                </div>

                <button
                  type='button'
                  onClick={handleFollowToggle}
                  className='flex items-center justify-center'
                  style={{
                    width: 'clamp(54px, 18cqw, 62px)',
                    height: 'clamp(22px, 7cqw, 25px)',
                    padding: 'clamp(2px, 1cqw, 3px) clamp(5px, 2cqw, 7px)',
                    gap: 'clamp(3px, 1.5cqw, 5px)',
                    borderRadius: 'clamp(4px, 1.6cqw, 6px)',
                    border: '1px solid var(--ColorMain, #00C56C)',
                    background: isFollowing ? 'var(--ColorMain, #00C56C)' : 'transparent',
                  }}
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
                    style={{
                      color: isFollowing ? 'var(--ColorWhite, #FFF)' : 'var(--ColorMain, #00C56C)',
                      fontSize: 'clamp(9px, 2.8cqw, 10px)',
                      fontWeight: 400,
                      lineHeight: 'normal',
                    }}
                  >
                    {isFollowing ? '팔로잉' : '팔로우'}
                  </span>
                </button>
              </div>

              <div className='flex flex-wrap' style={{ gap: 'clamp(3px, 1.5cqw, 5px)' }}>
                {profile.categories.map((category) => (
                  <Category key={category} label={category} />
                ))}
              </div>
            </div>

            {profile.privacy.showFollowStats && (
              <div
                className='flex flex-col'
                style={{
                  gap: 'clamp(6px, 2.2cqw, 8px)',
                  gridColumn: '1 / 2',
                  gridRow: '2 / 3',
                }}
              >
                <div
                  className='flex flex-col'
                  style={{
                    gap: 'clamp(2px, 2cqw, 4px)',
                    padding: '11px clamp(2px, 1cqw, 3px)',
                    paddingLeft: '3px',
                  }}
                >
                  <div className='flex items-center' style={{ gap: 'clamp(2px, 1cqw, 3px)' }}>
                    <span className='text-r-14' style={{ color: 'var(--ColorBlack, #202023)' }}>
                      팔로잉
                    </span>
                    <span className='text-sb-14' style={{ color: 'var(--ColorBlack, #202023)' }}>
                      {profile.followingCount}
                    </span>
                  </div>
                  <div className='flex items-center' style={{ gap: 'clamp(2px, 1cqw, 3px)' }}>
                    <span className='text-r-14' style={{ color: 'var(--ColorBlack, #202023)' }}>
                      팔로워
                    </span>
                    <span className='text-sb-14' style={{ color: 'var(--ColorBlack, #202023)' }}>
                      {profile.followerCount}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {!profile.privacy.showFollowStats && (
              <div
                aria-hidden
                style={{
                  gridColumn: '1 / 2',
                  gridRow: '2 / 3',
                  height: '100%',
                }}
              />
            )}

            <p
              className='line-clamp-3 text-r-14'
              style={{
                color: 'var(--ColorGray2, #A1A1A1)',
                paddingTop: 'clamp(8px, 3cqw, 11px)',
                gridColumn: '2 / 3',
                gridRow: '2 / 3',
              }}
            >
              {profile.intro}
            </p>

          </div>
        </section>

        <section
          className='flex'
          style={{
            padding: '0 clamp(18px, 7cqw, 25px) clamp(24px, 8cqw, 30px)',
          }}
        >
          <button
            type='button'
            className='flex w-full items-center justify-center'
            style={{
              padding: 'clamp(12px, 4cqw, 14px)',
              borderRadius: 'clamp(8px, 2.8cqw, 10px)',
              background: 'var(--ColorMain, #00C56C)',
            }}
          >
            <span className='text-sb-14' style={{ color: 'var(--ColorWhite, #FFF)' }}>
              커피챗 요청하기
            </span>
          </button>
        </section>

        <div
          style={{
            height: 'clamp(8px, 2.5cqw, 10px)',
            background: 'var(--ColorGray1, #D5D5D5)',
          }}
        />

        <section
          className='flex flex-col'
          style={{
            padding: 'clamp(24px, 8cqw, 30px) clamp(18px, 7cqw, 25px)',
            gap: 'clamp(32px, 12cqw, 50px)',
          }}
        >
          {profile.privacy.showPortfolio && (
            <div className='flex flex-col' style={{ gap: 'clamp(8px, 2.6cqw, 10px)' }}>
            <div className='flex items-center justify-between'>
              <span className='text-sb-16-hn' style={{ color: 'var(--ColorBlack, #202023)' }}>
                포트폴리오
              </span>
              <button
                type='button'
                className='flex items-center'
                style={{ gap: 'clamp(4px, 1.6cqw, 6px)' }}
              >
                <span className='text-r-12' style={{ color: 'var(--ColorGray2, #A1A1A1)' }}>
                  전체보기
                </span>
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

            <div
              className='flex flex-col'
              style={{
                paddingTop: 'clamp(16px, 5.5cqw, 20px)',
                borderTop: '1px solid var(--ColorGray1, #ECECEC)',
              }}
            >
              <div
                className='flex'
                style={{
                  gap: 'clamp(4px, 1.4cqw, 5px)',
                  overflowX: 'auto',
                  paddingBottom: 'clamp(4px, 1.4cqw, 6px)',
                  marginRight: 'calc(-1 * clamp(18px, 7cqw, 25px))',
                }}
              >
                {profile.portfolioItems.map((item) => (
                  <div
                    key={item.id}
                    className='flex flex-col'
                    style={{ gap: 'clamp(4px, 1.5cqw, 5px)', flex: '0 0 auto' }}
                  >
                    <div
                      style={{
                        width: 'clamp(120px, 42cqw, 160px)',
                        height: 'clamp(68px, 24cqw, 90px)',
                        borderRadius: 'clamp(10px, 3.5cqw, 12px)',
                        overflow: 'hidden',
                        background: 'var(--ColorGray1, #D5D5D5)',
                      }}
                    >
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
                    <div
                      className='text-m-14'
                      style={{
                        color: 'var(--ColorGray3, #646464)',
                        padding: 'clamp(4px, 1.6cqw, 5px) clamp(4px, 1.6cqw, 5px) 0',
                      }}
                    >
                      {item.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div>
          )}

          {profile.privacy.showEducation && (
            <div className='flex flex-col' style={{ gap: 'clamp(5px, 2.3cqw, 7px)' }}>
              <div className='text-sb-16-hn' style={{ color: 'var(--ColorBlack, #202023)' }}>
                학력
              </div>
              <div
                className='flex flex-col'
                style={{
                  paddingTop: 'clamp(8px, 3.5cqw, 10px)',
                  gap: 'clamp(8px, 3.5cqw, 10px)',
                  borderTop: '1px solid var(--ColorGray1, #D5D5D5)',
                }}
              >
                {profile.educationItems.map((item) => (
                  <div key={item.id} className='flex flex-col' style={{ gap: 'clamp(4px, 2cqw, 6px)' }}>
                    <div className='text-r-12' style={{ color: 'var(--ColorGray2, #A1A1A1)' }}>
                      {item.period}
                    </div>
                    <div className='flex flex-wrap items-baseline' style={{ gap: 'clamp(4px, 1.6cqw, 5px)' }}>
                      <span className='text-m-16' style={{ color: 'var(--ColorGray3, #646464)' }}>
                        {item.school}
                      </span>
                      <span className='text-r-14' style={{ color: 'var(--ColorGray2, #A1A1A1)' }}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {profile.privacy.showCareer && (
            <div className='flex flex-col' style={{ gap: 'clamp(5px, 2.3cqw, 7px)' }}>
              <div className='text-sb-16-hn' style={{ color: 'var(--ColorBlack, #202023)' }}>
                경력
              </div>
              <div
                className='flex flex-col'
                style={{
                  paddingTop: 'clamp(8px, 3.5cqw, 10px)',
                  gap: 'clamp(8px, 3.5cqw, 10px)',
                  borderTop: '1px solid var(--ColorGray1, #D5D5D5)',
                }}
              >
                {profile.careerItems.map((item) => (
                  <div key={item.id} className='flex flex-col' style={{ gap: 'clamp(4px, 2cqw, 6px)' }}>
                    <div className='text-r-12' style={{ color: 'var(--ColorGray2, #A1A1A1)' }}>
                      {item.period}
                    </div>
                    <div
                      className='grid items-start'
                      style={{
                        gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)',
                        columnGap: 'clamp(8px, 3cqw, 12px)',
                        rowGap: 'clamp(6px, 2.2cqw, 8px)',
                      }}
                    >
                      <span className='text-m-16' style={{ color: 'var(--ColorGray3, #646464)' }}>
                        {item.company}
                      </span>
                      <div
                        className='flex flex-col'
                        style={{
                          gap: 'clamp(2px, 1.6cqw, 4px)',
                          alignItems: 'flex-start',
                          textAlign: 'left',
                        }}
                      >
                        {item.tasks.map((task, index) => (
                          <span key={`${item.id}-${index}`} className='text-r-14' style={{ color: 'var(--ColorGray2, #A1A1A1)' }}>
                            - {task}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {profile.privacy.showCertificates && (
            <div className='flex flex-col' style={{ gap: 'clamp(5px, 2.3cqw, 7px)' }}>
              <div className='text-sb-16-hn' style={{ color: 'var(--ColorBlack, #202023)' }}>
                자격증
              </div>
              <div
                className='flex flex-col'
                style={{
                  paddingTop: 'clamp(8px, 3.5cqw, 10px)',
                  gap: 'clamp(8px, 3.5cqw, 10px)',
                  borderTop: '1px solid var(--ColorGray1, #D5D5D5)',
                }}
              >
                {profile.certificateItems.map((item) => (
                  <div key={item.id} className='flex flex-col' style={{ gap: 'clamp(4px, 2cqw, 6px)' }}>
                    <div className='text-r-12' style={{ color: 'var(--ColorGray2, #A1A1A1)' }}>
                      {item.date}
                    </div>
                    <div className='text-m-16' style={{ color: 'var(--ColorGray3, #646464)' }}>
                      {item.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </MainLayout>
  );
};

export default AlumniProfilePage;
