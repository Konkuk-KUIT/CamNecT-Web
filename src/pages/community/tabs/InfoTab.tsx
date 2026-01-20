import { Link } from 'react-router-dom';
import Category from '../../../components/Category';
import FilterHeader from '../../../components/FilterHeader';
import FilterModal from '../../../components/FilterModal';
import Icon from '../../../components/Icon';
import WriteButton from '../components/WriteButton';
import type { InfoPost } from '../data';
import useCommunityFilters from '../../../hooks/useCommunityFilters';
import { formatTimeAgo } from '../time';

type InfoTabProps = {
  posts: InfoPost[];
};

const InfoTab = ({ posts }: InfoTabProps) => {
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

  return (
    <div
      className='flex flex-col bg-white'
      style={{ padding: '20px 25px', gap: '10px' }}
    >
      {/* 필터 영역: 선택된 태그 표시 + 모달 호출 */}
      <FilterHeader
        activeFilters={activeFilters}
        onOpenFilter={openFilterModal}
        onRemoveFilter={handleRemoveFilter}
      />

      {/* 정보글 리스트 */}
      <div className='flex flex-col' style={{ gap: '10px' }}>
        {/* TODO: 정보글 리스트 API 연결 */}
        {filteredPosts.map((post) => (
          <Link key={post.id} to={`/community/post/${post.id}`} className='block'>
            <article
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
            </article>
          </Link>
        ))}
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

      {/* TODO: 글쓰기 라우터 연결 (버튼 클릭 / 현재는 임시) */}
      <WriteButton />
    </div>
  );
};

export default InfoTab;
