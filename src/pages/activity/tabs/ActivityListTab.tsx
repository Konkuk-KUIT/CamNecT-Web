import { useMemo, useState } from 'react';
import FilterHeader from '../../../components/FilterHeader';
import SortSelector from '../../../components/SortSelector';
import TagsFilterModal from '../../../components/TagsFilterModal';
import WriteButton from '../components/WriteButton';
import InternalActivityPost from '../../../components/posts/InternalActivityPost';
import ExternalActivityPost from '../../../components/posts/ExternalActivityPost';
import { MOCK_ALL_TAGS, TAG_CATEGORIES } from '../../../mock/tags';
import type { ActivityPost, ActivityPostDetail } from '../../../types/activityPage/activityPageTypes';
import { useNavigate } from 'react-router-dom';

type ActivityListTabProps = {
  posts: ActivityPost[] | ActivityPostDetail[];
  isAdmin?: boolean;
  showRecruitStatus?: boolean;
  tab: string;
};

type SortKey = 'recommended' | 'latest' | 'likes' | 'bookmarks';
type SortExternalKey = 'recommended' | 'latest' | 'deadline' |'bookmarks';

const sortLabels: Record<SortKey, string> = {
  recommended: '추천순',
  latest: '최신순',
  likes: '좋아요 많은 순',
  bookmarks: '북마크 많은 순',
};
const sortExternalLabels: Record<SortExternalKey, string> = {
  recommended: '추천순',
  latest: '최신순',
  deadline: '마감임박순',
  bookmarks: '북마크 많은 순',
};

const ActivityListTab = ({
  posts,
  isAdmin = false,
  showRecruitStatus = false,
  tab,
}: ActivityListTabProps) => {
  const navigate = useNavigate();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortKey, setSortKey] = useState<SortKey>('recommended');
  const [sortExternalKey, setSortExternalKey] = useState<SortExternalKey>('recommended');

  const isExternalTab = tab === 'external' || tab === 'job';
  const writePath = tab === 'external' ? "/admin/post/external" : "/admin/post/job";


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
  const cloned = [...filteredPosts];

    if (isExternalTab) {
		if (sortExternalKey === 'recommended') return cloned;
		if (sortExternalKey === 'latest') {
			return cloned.sort(
				(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
			);
		}
		if (sortExternalKey === 'deadline') {
			return cloned.sort((a, b) => {
				const aTime = a.deadline ? new Date(a.deadline).getTime() : Number.NEGATIVE_INFINITY;
				const bTime = b.deadline ? new Date(b.deadline).getTime() : Number.NEGATIVE_INFINITY;
				return aTime - bTime; 
			});
		}

		return cloned.sort((a, b) => b.saveCount - a.saveCount);

	} else {
		if (sortKey === 'recommended') return cloned;
		if (sortKey === 'latest') {
			return cloned.sort(
				(a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
			);
		}
		if (sortKey === 'likes') {
			return cloned.sort((a, b) => b.likes - a.likes);
		}
    }

  return cloned.sort((a, b) => b.saveCount - a.saveCount);
}, [filteredPosts, isExternalTab, sortKey, sortExternalKey]);


  return (
    <div className='flex flex-col bg-white' style={{ padding: '20px 0px', gap: '10px' }}>
      <div className='flex flex-wrap items-center gap-[12px] px-[25px]'>
        <div className='flex-1'>
          <FilterHeader
            activeFilters={selectedTags}
            onOpenFilter={() => setIsFilterOpen(true)}
            onRemoveFilter={(tag) =>
              setSelectedTags((prev) => prev.filter((item) => item !== tag))
            }
          />
        </div>
        
        {!isExternalTab ? 
        <SortSelector sortKey={sortKey} sortLabels={sortLabels} onChange={setSortKey} /> :
        <SortSelector sortKey={sortExternalKey} sortLabels={sortExternalLabels} onChange={setSortExternalKey}/>
        }
      </div>

      <div className='flex flex-col'>
        {sortedPosts.map((post) => {
          const isExternalPost = post.tab === 'external' || post.tab === 'job';
          
          if (isExternalPost) {
            return <ExternalActivityPost key={post.id} post={post} />;
          }

          return (
            <InternalActivityPost
              key={post.id}
              post={post}
              showRecruitStatus={showRecruitStatus}
            />
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

      {isAdmin
      ? (isExternalTab ? <WriteButton onClick={() => navigate(writePath)}/> : null)
      : (!isExternalTab ? <WriteButton /> : null)}

    </div>
  );
};

export default ActivityListTab;
