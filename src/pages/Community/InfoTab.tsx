import { useMemo, useState } from 'react';
import Category from '../../components/Category';
import CategoryIcon from '../../components/CategoryIcon';
import Icon from '../../components/Icon';
import type { InfoPost } from './data';
import { interestOptions, majorOptions } from './filterOptions';
import { formatTimeAgo } from './time';

type InfoTabProps = {
  posts: InfoPost[];
};

const InfoTab = ({ posts }: InfoTabProps) => {
  // 모달 표시/탭/적용된 필터/초안 상태를 관리
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'major' | 'interest'>('major');
  const [appliedMajor, setAppliedMajor] = useState<string | null>(null);
  const [appliedInterests, setAppliedInterests] = useState<string[]>([]);
  const [draftMajor, setDraftMajor] = useState<string | null>(null);
  const [draftInterests, setDraftInterests] = useState<string[]>([]);

  // 현재 적용된 필터를 칩에 뿌리기 위한 목록
  const activeFilters = useMemo(() => {
    const filters: string[] = [];
    if (appliedMajor) filters.push(appliedMajor);
    return filters.concat(appliedInterests);
  }, [appliedInterests, appliedMajor]);

  // 적용된 필터에 따라 게시글 필터링
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesMajor = appliedMajor ? post.author.major === appliedMajor : true;
      const matchesInterests =
        appliedInterests.length === 0
          ? true
          : appliedInterests.every((interest) => post.categories.includes(interest));

      return matchesMajor && matchesInterests;
    });
  }, [appliedInterests, appliedMajor, posts]);

  const openFilterModal = () => {
    setDraftMajor(appliedMajor);
    setDraftInterests(appliedInterests);
    setIsFilterOpen(true);
  };

  const handleCancel = () => {
    setIsFilterOpen(false);
  };

  const handleApply = () => {
    // 초안 선택을 실제 적용값으로 반영
    setAppliedMajor(draftMajor);
    setAppliedInterests(draftInterests);
    setIsFilterOpen(false);
  };

  const handleRemoveFilter = (filter: string) => {
    // 칩에서 제거 시 적용/초안 동기 제거
    setAppliedMajor((prev) => (prev === filter ? null : prev));
    setAppliedInterests((prev) => prev.filter((item) => item !== filter));
    if (isFilterOpen) {
      setDraftMajor((prev) => (prev === filter ? null : prev));
      setDraftInterests((prev) => prev.filter((item) => item !== filter));
    }
  };

  // 전공은 단일 선택
  const toggleDraftMajor = (department: string) => {
    setDraftMajor((prev) => (prev === department ? null : department));
  };

  // 관심사는 다중 선택
  const toggleDraftInterest = (item: string) => {
    setDraftInterests((prev) =>
      prev.includes(item) ? prev.filter((interest) => interest !== item) : [...prev, item],
    );
  };

  const hasDraftSelection = Boolean(draftMajor) || draftInterests.length > 0;

  return (
    <div
      className='flex flex-col bg-white'
      style={{ padding: '20px 25px', gap: '10px' }}
    >
      <div className='flex flex-wrap items-center gap-[15px]'>
        <button
          type='button'
          aria-label='필터 설정'
          onClick={openFilterModal}
          className='flex items-center justify-center p-0 bg-transparent rounded-[3px]'
          style={{ 
            cursor: 'pointer',
            border: '1px solid #646464',             
          }}
        >
          <svg
            width='24'
            height='24'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M10.7273 7.2H19M10.7273 7.2C10.7273 7.51826 10.5932 7.82348 10.3545 8.04853C10.1158 8.27357 9.79209 8.4 9.45455 8.4C9.117 8.4 8.79327 8.27357 8.55459 8.04853C8.31591 7.82348 8.18182 7.51826 8.18182 7.2M10.7273 7.2C10.7273 6.88174 10.5932 6.57652 10.3545 6.35147C10.1158 6.12643 9.79209 6 9.45455 6C9.117 6 8.79327 6.12643 8.55459 6.35147C8.31591 6.57652 8.18182 6.88174 8.18182 7.2M8.18182 7.2H5M10.7273 16.8H19M10.7273 16.8C10.7273 17.1183 10.5932 17.4235 10.3545 17.6485C10.1158 17.8736 9.79209 18 9.45455 18C9.117 18 8.79327 17.8736 8.55459 17.6485C8.31591 17.4235 8.18182 17.1183 8.18182 16.8M10.7273 16.8C10.7273 16.4817 10.5932 16.1765 10.3545 15.9515C10.1158 15.7264 9.79209 15.6 9.45455 15.6C9.117 15.6 8.79327 15.7264 8.55459 15.9515C8.31591 16.1765 8.18182 16.4817 8.18182 16.8M8.18182 16.8H5M15.8182 12H19M15.8182 12C15.8182 12.3183 15.6841 12.6235 15.4454 12.8485C15.2067 13.0736 14.883 13.2 14.5455 13.2C14.2079 13.2 13.8842 13.0736 13.6455 12.8485C13.4068 12.6235 13.2727 12.3183 13.2727 12M15.8182 12C15.8182 11.6817 15.6841 11.3765 15.4454 11.1515C15.2067 10.9264 14.883 10.8 14.5455 10.8C14.2079 10.8 13.8842 10.9264 13.6455 11.1515C13.4068 11.3765 13.2727 11.6817 13.2727 12M13.2727 12H5'
              stroke='#202023'
              strokeWidth='1.3'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </button>

        <div className='flex flex-wrap items-center gap-[10px]'>
          {activeFilters.map((filter) => (
            <button
              key={filter}
              type='button'
              onClick={() => handleRemoveFilter(filter)}
              className='flex items-center gap-[5px]'
              style={{
                display: 'flex',
                padding: '5px 10px',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '5px',
                borderRadius: '5px',
                border: '1px solid var(--ColorGray2, #A1A1A1)',
                background: 'var(--ColorGray1, #ECECEC)',
              }}
            >
              <span className='text-m-12 text-gray-900'>{filter}</span>
              <svg
                width='12'
                height='12'
                viewBox='0 0 12 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M3 9L9 3M3 3L9 9'
                  stroke='#A1A1A1'
                  strokeWidth='1'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <div className='flex flex-col' style={{ gap: '10px' }}>
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className='flex flex-col'
            style={{
              gap: '10px',
              paddingBottom: '10px',
              borderBottom: '1px solid var(--ColorGray2,rgb(239, 239, 239))',
            }}
          >
            <div className='flex flex-wrap items-center' style={{ gap: '5px' }}>
              {post.categories.map((category) => (
                <Category key={category} label={category} height={20} className='px-[6px]' />
              ))}
            </div>

            <div className='flex flex-col' style={{ gap: '7px' }}>
              <div className='flex flex-col' style={{ gap: '5px' }}>
                <div className='flex items-center gap-[6px]'>
                  <span className='text-sb-14 text-gray-900'>{post.author.name}</span>
                  <span className='text-r-12 text-gray-750'>· {post.author.major} {post.author.studentId}학번</span>
                </div>

                <div className='text-sb-16-hn leading-[150%] text-gray-900'>{post.title}</div>

                <div className='line-clamp-2 text-r-16 text-gray-750'>
                  {post.content}
                </div>
              </div>

              <div className='flex items-center gap-[10px] text-r-12 text-gray-650'>
                <span>좋아요 {post.likes}</span>
                <span>댓글 {post.comments}</span>
                <span>{formatTimeAgo(post.createdAt)}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {isFilterOpen && (
        <div
          className='fixed inset-0 z-50 flex items-center justify-center'
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
        >
          <div
            className='relative flex'
            style={{
              width: '375px',
              height: '649px',
              padding: '38px 25px',
              borderRadius: '10px',
              background: 'var(--Color_Gray_B, #FCFCFC)',
              boxShadow: '0 -1px 9.6px 0 rgba(32, 32, 35, 0.10)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type='button'
              aria-label='필터 닫기'
              onClick={handleCancel}
              className='absolute right-[25px] top-[25px]'
            >
              <Icon name='cancel' />
            </button>

            {hasDraftSelection && (
              <button
                type='button'
                aria-label='필터 적용'
                onClick={handleApply}
                className='absolute bottom-[25px] right-[25px]'
              >
                <Icon name='check' />
              </button>
            )}

            <div className='flex w-full' style={{ gap: '24px' }}>
              <div
                className='flex flex-col'
                style={{ gap: '32px', paddingRight: '18px', borderRight: '1px solid var(--ColorGray2, #A1A1A1)' }}
              >
                {[
                  { key: 'major', label: '전공' },
                  { key: 'interest', label: '관심사' },
                ].map((tab) => {
                  const isActive = activeTab === tab.key;
                  return (
                    <button
                      key={tab.key}
                      type='button'
                      onClick={() => setActiveTab(tab.key as 'major' | 'interest')}
                      className='text-left text-b-16-hn'
                      style={{
                        color: isActive ? 'var(--ColorBlack, #202023)' : 'var(--ColorGray2, #A1A1A1)',
                      }}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <div className='flex-1 overflow-y-auto' style={{ paddingTop: '4px' }}>
                {activeTab === 'major' &&
                  majorOptions.map((group) => (
                    <div key={group.college} className='flex flex-col' style={{ gap: '12px', marginBottom: '20px' }}>
                      <div
                        className='text-b-18'
                        style={{
                          color: '#000',
                          letterSpacing: '-0.72px',
                        }}
                      >
                        {group.college}
                      </div>
                      <div className='flex flex-wrap' style={{ gap: '10px' }}>
                        {group.departments.map((department) => (
                          <CategoryIcon
                            key={department}
                            label={department}
                            selected={draftMajor === department}
                            onClick={() => toggleDraftMajor(department)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}

                {activeTab === 'interest' &&
                  interestOptions.map((interest) => (
                    <div
                      key={interest.category}
                      className='flex flex-col'
                      style={{ gap: '12px', marginBottom: '20px' }}
                    >
                      <div
                        className='text-b-18'
                        style={{
                          color: '#000',
                          letterSpacing: '-0.72px',
                        }}
                      >
                        {interest.category}
                      </div>
                      <div className='flex flex-wrap' style={{ gap: '10px' }}>
                        {interest.items.map((item) => (
                          <CategoryIcon
                            key={item}
                            label={item}
                            selected={draftInterests.includes(item)}
                            onClick={() => toggleDraftInterest(item)}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoTab;
