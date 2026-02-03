import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import FilterHeader from '../../../components/FilterHeader';
import SortSelector from '../../../components/SortSelector';
import TagsFilterModal from '../../../components/TagsFilterModal';
import WriteButton from '../components/WriteButton';
import DefaultPost from '../components/DefaultPost';
import ContestPost from '../components/ContestPost';
import { MOCK_ALL_TAGS, TAG_CATEGORIES } from '../../../mock/tags';
import type { ActivityPost } from '../../../types/activityPost';

type ActivityListTabProps = {
  posts: ActivityPost[];
  linkToPost?: boolean;
  showWriteButton?: boolean;
  showRecruitStatus?: boolean;
};

type SortKey = 'recommended' | 'latest' | 'likes' | 'bookmarks';

const sortLabels: Record<SortKey, string> = {
  recommended: '추천순',
  latest: '최신순',
  likes: '좋아요 많은 순',
  bookmarks: '북마크 많은 순',
};

const ActivityListTab = ({
  posts,
  linkToPost = false,
  showWriteButton = true,
  showRecruitStatus = false,
}: ActivityListTabProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>('recommended');

  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) return posts;
    if (!showRecruitStatus) {
      return posts.filter((post) =>
        selectedTags.every((tag) => post.categories.includes(tag)),
      );
    }

    const statusTags = ['모집 중', '모집 완료'];
    const selectedStatusTags = selectedTags.filter((tag) => statusTags.includes(tag));
    const selectedCategoryTags = selectedTags.filter((tag) => !statusTags.includes(tag));

    return posts.filter((post) => {
      const matchesCategory =
        selectedCategoryTags.length === 0
          ? true
          : selectedCategoryTags.every((tag) => post.categories.includes(tag));
      const label = post.status === 'CLOSED' ? '모집 완료' : '모집 중';
      const matchesStatus =
        selectedStatusTags.length === 0
          ? true
          : selectedStatusTags.length === 2
            ? true
            : selectedStatusTags[0] === label;
      return matchesCategory && matchesStatus;
    });
  }, [posts, selectedTags, showRecruitStatus]);

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
      <div className='flex flex-wrap items-center gap-[12px]'>
        <div className='flex-1'>
          <FilterHeader
            activeFilters={selectedTags}
            onOpenFilter={() => setIsFilterOpen(true)}
            onRemoveFilter={(tag) =>
              setSelectedTags((prev) => prev.filter((item) => item !== tag))
            }
          />
        </div>
        <SortSelector sortKey={sortKey} sortLabels={sortLabels} onChange={setSortKey} />
      </div>

      <div className='flex flex-col' style={{ gap: '10px' }}>
        {sortedPosts.map((post) => {
          const isContestPost = post.tab === 'external' || post.tab === 'job';
          const content = isContestPost ? (
            <ContestPost post={post} />
          ) : (
            <DefaultPost post={post} showRecruitStatus={showRecruitStatus} />
          );

          if (linkToPost) {
            return (
              <Link key={post.id} to={`/activity/post/${post.id}`} className='block'>
                {content}
              </Link>
            );
          }

          return (
            <div key={post.id} className='block'>
              {content}
            </div>
          );
        })}
      </div>

      <TagsFilterModal
        isOpen={isFilterOpen}
        tags={selectedTags}
        onClose={() => setIsFilterOpen(false)}
        onSave={(next) => {
          setSelectedTags(next);
          setIsFilterOpen(false);
        }}
        categories={TAG_CATEGORIES}
        allTags={MOCK_ALL_TAGS}
        extraCategories={
          showRecruitStatus
            ? [
                {
                  id: 'activity-recruit',
                  name: '모집 중',
                  tags: [
                    { id: 'recruit-open', name: '모집 중' },
                    { id: 'recruit-closed', name: '모집 완료' },
                  ],
                },
              ]
            : undefined
        }
      />

      {showWriteButton ? <WriteButton /> : null}
    </div>
  );
};

export default ActivityListTab;
