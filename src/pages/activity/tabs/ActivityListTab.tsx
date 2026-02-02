import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Category from '../../../components/Category';
import FilterHeader from '../../../components/FilterHeader';
import SortSelector from '../../../components/SortSelector';
import TagsFilterModal from '../../../components/TagsFilterModal';
import Icon from '../../../components/Icon';
import WriteButton from '../components/WriteButton';
import { MOCK_ALL_TAGS, TAG_CATEGORIES } from '../../../mock/tags';
import type { ActivityPost } from '../../../types/activityPost';
import { formatTimeAgo } from '../time';

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
          const content = (
            <article
              className='flex flex-col'
              style={{
                gap: '10px',
                paddingBottom: '10px',
                borderBottom: '1px solid var(--ColorGray2,rgb(239, 239, 239))',
              }}
            >
              <div className='flex flex-wrap items-center' style={{ gap: '5px' }}>
                {showRecruitStatus ? (
                  <span
                    className={`inline-flex h-[22px] items-center justify-center rounded-[5px] border px-[10px] text-r-12 ${
                      post.status === 'CLOSED'
                        ? 'border-[var(--ColorGray2,#A1A1A1)] text-[var(--ColorGray2,#A1A1A1)]'
                        : 'border-[var(--ColorMain,#00C56C)] text-[var(--ColorMain,#00C56C)]'
                    }`}
                  >
                    {post.status === 'CLOSED' ? '모집 완료' : '모집 중'}
                  </span>
                ) : null}
                {post.categories.map((category) => (
                  <Category key={category} label={category} className='h-[20px] px-[6px]' />
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

                <div className='line-clamp-2 text-r-16 text-gray-750'>
                  {post.content}
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
