import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Category from '../../../components/Category';
import FilterHeader from '../../../components/FilterHeader';
import WriteButton from '../components/WriteButton';
import type { QuestionPost } from '../../../types/community';
import { formatTimeAgo } from '../time';
import TagsFilterModal from '../../../components/TagsFilterModal';
import { MOCK_ALL_TAGS, TAG_CATEGORIES } from '../../../mock/tags';
import SortSelector from '../../../components/SortSelector';

type SortKey = 'recommended' | 'latest' | 'likes' | 'bookmarks';

const sortLabels: Record<SortKey, string> = {
  recommended: '추천순',
  latest: '최신순',
  likes: '좋아요 많은 순',
  bookmarks: '북마크 많은 순',
};

type QuestionTabProps = {
  posts: QuestionPost[];
  sortKey: SortKey;
  onSortChange: (next: SortKey) => void;
};

// 질문 탭: 필터 + 정렬 + 질문글 리스트
const QuestionTab = ({ posts, sortKey, onSortChange }: QuestionTabProps) => {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredPosts = useMemo(() => {
    if (selectedTags.length === 0) return posts;
    const adoptionTags = ['채택 전', '채택 완료'];
    const selectedAdoptionTags = selectedTags.filter((tag) => adoptionTags.includes(tag));
    const selectedCategoryTags = selectedTags.filter(
      (tag) => !adoptionTags.includes(tag),
    );
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategoryTags.length === 0
          ? true
          : selectedCategoryTags.every((tag) => post.categories.includes(tag));
      const matchesAdoption =
        selectedAdoptionTags.length === 0
          ? true
          : selectedAdoptionTags.length === 2
            ? true
            : selectedAdoptionTags[0] === '채택 완료'
              ? post.isAdopted
              : !post.isAdopted;
      return matchesCategory && matchesAdoption;
    });
  }, [posts, selectedTags]);

  return (
    <div className='flex flex-col bg-white' style={{ padding: '20px 25px', gap: '10px' }}>
      {/* 필터 영역: 선택된 태그 표시 + 모달 호출 */}
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
        <SortSelector sortKey={sortKey} sortLabels={sortLabels} onChange={onSortChange} />
      </div>

      {/* 질문글 리스트 */}
      <div className='flex flex-col' style={{ gap: '10px' }}>
        {/* TODO: 질문글 리스트 API 연결 */}
        {filteredPosts.map((post) => {
          const isPointRequired = post.accessType
            ? post.accessType === 'POINT_REQUIRED'
            : post.accessStatus !== 'GRANTED';
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
                  <Category key={category} label={category} className='h-[20px] px-[6px]' />
                ))}
              </div>

              <div className='flex flex-col' style={{ gap: '7px' }}>
                <div className='flex' style={{ gap: '12px' }}>
                  <div className='flex flex-1 flex-col' style={{ gap: '7px' }}>
                    <div className='flex items-center gap-[6px]'>
                      <span className='text-sb-14 text-gray-900'>{post.author.name}</span>
                      <span className='text-r-12 text-gray-750'>
                        · {post.author.major}{' '}
                        {post.author.yearLevel
                          ? `${post.author.yearLevel}학년`
                          : `${post.author.studentId}학번`}
                      </span>
                    </div>

                    <div className='text-sb-16-hn leading-[150%] text-gray-900'>{post.title}</div>

                    {isPointRequired ? (
                      <div className='text-r-12 text-[var(--ColorMain,#00C56C)]'>
                        {requiredPoints} P
                      </div>
                    ) : (
                      <div className='line-clamp-2 whitespace-pre-wrap text-r-16 text-gray-750'>
                        {post.content}
                      </div>
                    )}
                  </div>

                  {post.thumbnailUrl && (
                    <div className='h-[70px] w-[70px] shrink-0 overflow-hidden rounded-[8px] bg-[var(--ColorGray1,#D5D5D5)]'>
                      <img
                        src={post.thumbnailUrl}
                        alt=''
                        className='h-full w-full object-cover'
                      />
                    </div>
                  )}
                </div>

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
        extraCategories={[
          {
            id: 'community-adoption',
            name: '채택완료',
            tags: [
              { id: 'adopted-pending', name: '채택 전' },
              { id: 'adopted-done', name: '채택 완료' },
            ],
          },
        ]}
      />

      {/* TODO: 글쓰기 라우터 연결 (버튼 클릭) */}
      <WriteButton />
    </div>
  );
};

export default QuestionTab;
