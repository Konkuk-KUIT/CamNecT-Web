import Category from '../../../components/Category';
import FilterHeader from '../components/FilterHeader';
import FilterModal from '../components/FilterModal';
import WriteButton from '../components/WriteButton';
import type { ChatPost } from '../data';
import useCommunityFilters from '../hooks/useCommunityFilters';
import { formatTimeAgo } from '../time';

type ChatTabProps = {
  posts: ChatPost[];
};

const ChatTab = ({ posts }: ChatTabProps) => {
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
    <div className='flex flex-col bg-white' style={{ padding: '20px 25px', gap: '10px' }}>
      <FilterHeader
        activeFilters={activeFilters}
        onOpenFilter={openFilterModal}
        onRemoveFilter={handleRemoveFilter}
      />

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
              <div className='flex items-center gap-[6px]'>
                <span className='text-sb-14 text-gray-900'>{post.author.name}</span>
                <span className='text-r-12 text-gray-750'>
                  · {post.author.major} {post.author.studentId}학번
                </span>
              </div>

              <div className='text-sb-16-hn leading-[150%] text-gray-900'>{post.title}</div>

              <div className='line-clamp-2 text-r-16 text-gray-750'>{post.content}</div>

              <div className='flex items-center gap-[10px] text-r-12 text-gray-650'>
                <span>좋아요 {post.likes}</span>
                <span>댓글 {post.comments}</span>
                <span>{formatTimeAgo(post.createdAt)}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

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

      <WriteButton />
    </div>
  );
};

export default ChatTab;
