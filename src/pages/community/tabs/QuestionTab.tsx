import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import BottomSheetModal from '../../../components/BottomSheetModal/BottomSheetModal';
import Category from '../../../components/Category';
import FilterHeader from '../../../components/FilterHeader';
import FilterModal from '../../../components/FilterModal';
import WriteButton from '../components/WriteButton';
import BoardTypeToggle from '../components/BoardTypeToggle';
import type { QuestionPost } from '../data';
import Toggle from '../../../components/Toggle/Toggle';
import useCommunityFilters from '../../../hooks/useCommunityFilters';
import { formatTimeAgo } from '../time';

type QuestionTabProps = {
  posts: QuestionPost[];
};

type SortKey = 'recommended' | 'latest' | 'likes' | 'bookmarks';

const sortLabels: Record<SortKey, string> = {
  recommended: '추천순',
  latest: '최신순',
  likes: '좋아요 많은 순',
  bookmarks: '북마크 많은 순',
};

const QuestionTab = ({ posts }: QuestionTabProps) => {
  const {
    activeFilters,
    filteredPosts,
    isFilterOpen,
    activeTab,
    setActiveTab,
    openFilterModal,
    handleCancel,
    handleApply,
    handleRemoveFilter,
    draftMajor,
    draftInterests,
    toggleDraftMajor,
    toggleDraftInterest,
    hasDraftSelection,
  } = useCommunityFilters(posts);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>('recommended');

  const sortedPosts = useMemo(() => {
    if (sortKey === 'recommended') return filteredPosts;
    const cloned = [...filteredPosts];
    if (sortKey === 'latest') {
      return cloned.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    }
    if (sortKey === 'likes') {
      return cloned.sort((a, b) => b.likes - a.likes);
    }
    return cloned.sort((a, b) => b.saveCount - a.saveCount);
  }, [filteredPosts, sortKey]);

  return (
    <div className='flex flex-col bg-white' style={{ padding: '20px 25px', gap: '10px' }}>
      {/* 필터 영역: 선택된 태그 표시 + 모달 호출 */}
      <div className='flex flex-wrap items-center gap-[12px]'>
        <div className='flex-1'>
          <FilterHeader
            activeFilters={activeFilters}
            onOpenFilter={openFilterModal}
            onRemoveFilter={handleRemoveFilter}
          />
        </div>
        <div className='flex items-center gap-[6px]'>
          <button
            type='button'
            onClick={() => setIsSortOpen(true)}
            className='text-r-14 text-[var(--ColorGray2,#A1A1A1)]'
          >
            {sortLabels[sortKey]}
          </button>
          <Toggle
            width={20}
            height={20}
            toggled={isSortOpen}
            onToggle={(next) => setIsSortOpen(next)}
          />
        </div>
      </div>

      {/* 질문글 리스트 */}
      <div className='flex flex-col' style={{ gap: '10px' }}>
        {/* TODO: 질문글 리스트 API 연결 */}
        {sortedPosts.map((post) => {
          const isLocked = post.accessStatus !== 'GRANTED';
          const requiredPoints = post.requiredPoints;
          return (
            <Link key={post.id} to={`/community/post/${post.id}`} className='block'>
            <article
              className='flex flex-col'
              style={{
                gap: '10px',
                paddingBottom: '10px',
                borderBottom: '1px solid var(--ColorGray2,rgb(239, 239, 239))',
              }}
            >
              <div className='flex flex-wrap items-center gap-[5px]'>
                <span
                  className={`inline-flex h-[22px] items-center justify-center rounded-[5px] border px-[10px] text-r-12 ${
                    post.isAdopted
                      ? 'border-[var(--ColorGray2,#A1A1A1)] text-[var(--ColorGray2,#A1A1A1)]'
                      : 'border-[var(--ColorMain,#00C56C)] text-[var(--ColorMain,#00C56C)]'
                  }`}
                >
                  {post.isAdopted ? '채택 완료' : '채택 전'}
                </span>
                {post.categories.map((category) => (
                  <Category key={category} label={category} className='px-[6px]' />
                ))}
              </div>

              <div className='flex flex-col' style={{ gap: '7px' }}>
                <div className='flex items-center gap-[6px]'>
                  <span className='text-sb-14 text-gray-900'>{post.author.name}</span>
                  <span className='text-r-12 text-gray-750'>
                    · {post.author.major} {post.author.studentId}학번
                  </span>
                </div>

                <div className='text-sb-16-hn leading-[150%] text-gray-900'>{post.title}</div>

                {isLocked ? (
                  <div className='text-r-12 text-[var(--ColorMain,#00C56C)]'>
                    {requiredPoints} P
                  </div>
                ) : (
                  <div className='line-clamp-2 text-r-16 text-gray-750'>{post.content}</div>
                )}

                <div className='flex items-center gap-[10px] text-r-12 text-gray-650'>
                  <span>답변 {post.answers}</span>
                  <span className='h-[14px] w-0 border-l border-[var(--ColorGray2,#A1A1A1)]' aria-hidden />
                  <span>{formatTimeAgo(post.createdAt)}</span>
                </div>
              </div>
            </article>
            </Link>
          );
        })}
      </div>

      {/* 필터 모달: 전공/관심사 선택 */}
      <FilterModal
        isOpen={isFilterOpen}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        draftMajor={draftMajor}
        draftInterests={draftInterests}
        onToggleMajor={toggleDraftMajor}
        onToggleInterest={toggleDraftInterest}
        hasDraftSelection={hasDraftSelection}
        onCancel={handleCancel}
        onApply={handleApply}
      />

      <BottomSheetModal isOpen={isSortOpen} onClose={() => setIsSortOpen(false)}>
        <div className='flex flex-col gap-[30px] px-[25px] pb-[50px] pt-[45px]'>
          <div className='text-b-18 text-[var(--ColorBlack,#202023)]'>정렬</div>
          <div className='flex flex-col gap-[20px] px-[7px]'>
            {(Object.keys(sortLabels) as SortKey[]).map((key) => (
              <div key={key} className='flex items-center justify-between'>
                <button
                  type='button'
                  className='text-m-16 text-[var(--ColorGray3,#646464)]'
                  onClick={() => {
                    setSortKey(key);
                    setIsSortOpen(false);
                  }}
                >
                  {sortLabels[key]}
                </button>
                <BoardTypeToggle
                  selected={sortKey === key}
                  onClick={() => {
                    setSortKey(key);
                    setIsSortOpen(false);
                  }}
                  label={sortLabels[key]}
                />
              </div>
            ))}
          </div>
        </div>
      </BottomSheetModal>

      {/* TODO: 글쓰기 라우터 연결 (버튼 클릭) */}
      <WriteButton />
    </div>
  );
};

export default QuestionTab;
