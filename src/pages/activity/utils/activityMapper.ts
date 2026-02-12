import type {
  ActivityListItem,
  ActivityDetailData,
  ActivityCategory,
  RecruitmentItem,
  TagItem
} from '../../../api-types/activityApiTypes';
import type {
  ActivityPost,
  ActivityPostTab,
  ActivityPostDetail,
  TeamRecruitPost
} from '../../../types/activityPage/activityPageTypes';
import type { TagCategory } from '../../../components/TagsFilterModal';

// ===== 카테고리 변환 =====

/** API category enum → UI tab */
export const categoryToTab = (category: ActivityCategory): ActivityPostTab => {
  const map: Record<ActivityCategory, ActivityPostTab> = {
    CLUB: 'club',
    STUDY: 'study',
    EXTERNAL: 'external',
    RECRUITMENT: 'job',
  };
  return map[category];
};

/** UI tab → API category enum */
export const tabToCategory = (tab: ActivityPostTab): ActivityCategory => {
  const map: Record<ActivityPostTab, ActivityCategory> = {
    club: 'CLUB',
    study: 'STUDY',
    external: 'EXTERNAL',
    job: 'RECRUITMENT',
  };
  return map[tab];
};

// ===== 목록 아이템 변환 =====

/**
 * API 목록 아이템(ActivityListItem) → UI ActivityPost
 *
 * ⚠️ 임시처리 목록:
 * - status: API 목록 응답에 status 필드 없음 → 'OPEN' 고정 처리
 *   → BE에 activityListItem에 status 필드 추가 요청 필요 (또는 상세 조회 후 덮어쓰기)
 * - author: API 목록 응답에 작성자 정보 없음 → 빈 더미 데이터
 *   → BE에 작성자 name, profileImageUrl, studentNo 포함 요청 필요 (또는 FE에서 별도 조회)
 * - content: 목록의 context 필드를 content로 매핑 (필드명 불일치 주의)
 * - thumbnailUrl: 목록 응답에는 있으나 postImages 없음 → postImages는 상세 조회 시 채워짐
 */
export const mapListItemToActivityPost = (item: ActivityListItem, category: ActivityCategory): ActivityPost => {
  return {
    id: String(item.activityId),
    tab: categoryToTab(category),
    title: item.title,
    content: item.context, // API 필드명이 'context'임에 주의
    categories: item.tags,
    saveCount: item.bookmarkCount,
    createdAt: item.createdAt,
    organizer: item.organizer,
    deadline: item.applyEndDate ?? null,
    thumbnailUrl: item.thumbnailUrl ?? null,
    postImages: [],
    // ⚠️ 임시처리: 목록 API에 status 없음
    status: 'OPEN',
    // ⚠️ 임시처리: 목록 API에 author 없음
    author: {
      id: '',
      name: '',
      profileImageUrl: null,
      major: '',
      studentId: '',
    },
  };
};

// ===== 상세 데이터 변환 =====

/**
 * API 상세 응답(ActivityDetailData) → UI ActivityPost
 *
 * ⚠️ 임시처리 목록:
 * - author: 상세 API에도 작성자 name/profileImageUrl/major/studentNo 없음
 *   activity.userId만 있음 → BE에 작성자 정보 추가 요청 필요
 * - postImages: attachments의 fileUrl 목록으로 대체
 *   (첨부파일과 이미지를 구분하는 필드 없음 → BE에 파일 타입 구분 필드 추가 요청 필요)
 * - descriptionTitle / descriptionBody: API에 해당 필드 없음
 *   context를 descriptionBody로 사용, descriptionTitle은 빈 문자열 처리
 */
export const mapDetailToActivityPost = (detailData: ActivityDetailData): ActivityPostDetail => {
  const { activity, attachment, tagList, isBookmarked, bookmarkCount } = detailData;

    const safeAttachment = attachment ?? [];
    const safeTagList = tagList ?? [];

  return {
    id: String(activity.activityId),
    tab: categoryToTab(activity.category),
    title: activity.title,
    content: activity.context,
    categories: safeTagList,
    saveCount: bookmarkCount,
    createdAt: activity.createdAt,
    organizer: activity.organizer,
    deadline: activity.applyEndDate ?? null,
    thumbnailUrl: activity.thumbnailUrl ?? null,
    // ⚠️ 임시처리: attachment를 postImages로 사용 (파일 타입 구분 없음)
    postImages: safeAttachment.map((a) => a.fileUrl),
    status: activity.status,
    isBookmarked,
    target: activity.targetDescription ?? null,
    applyPeriod: activity.applyStartDate && activity.applyEndDate
      ? { start: activity.applyStartDate, end: activity.applyEndDate }
      : null,
    announceDate: activity.resultAnnounceDate ?? null,
    applyUrl: activity.officialUrl ?? null,
    // ⚠️ 임시처리: 상세 API에 author 정보 없음 (userId만 존재)
    author: {
      id: String(activity.userId),
      name: '',
      profileImageUrl: null,
      major: '',
      studentId: '',
    },
    // ⚠️ 임시처리: descriptionTitle 없음
    descriptionTitle: '',
    descriptionBody: activity.context,
    isMine: detailData.isMine,
  };
};

// ===== 정렬 타입 변환 =====
// UI SortKey → API SortType
export const sortKeyToApiSortType = (
  sortKey: string,
  isExternal: boolean,
): string => {
  if (isExternal) {
    const map: Record<string, string> = {
      recommended: 'RECOMMEND',
      latest: 'LATEST',
      deadline: 'DEADLINE',
      bookmarks: 'BOOKMARK',
      recruits: 'RECRUIT',
    };
    return map[sortKey] ?? 'LATEST';
  } else {
    const map: Record<string, string> = {
      recommended: 'RECOMMEND',
      latest: 'LATEST',
      bookmarks: 'BOOKMARK',
    };
    return map[sortKey] ?? 'LATEST';
  }
};

// ===== 팀원 모집 변환 =====

/**
 * API 팀원 모집 아이템(RecruitmentItem) → UI TeamRecruitPost
 *
 * ⚠️ 임시처리 목록:
 * - authorName: API 응답에 작성자 이름 없음 → 빈 문자열 처리
 *   → BE에 작성자 정보 추가 요청 필요 (또는 상세 조회 시 author 정보 가져오기)
 * - activityName: API 응답에 대외활동 공고 제목 없음 → 빈 문자열 처리
 *   → BE에 activityName 필드 추가 요청 필요 (또는 별도 API 호출)
 */
export const mapRecruitmentItemToTeamRecruitPost = (
  item: RecruitmentItem,
): TeamRecruitPost => {
  return {
    id: String(item.recruitId),
    activityId: String(item.activityId),
    authorId: String(item.userId),
    recruitNow: item.recruitStatus === 'RECRUITING',
    title: item.title,
    // ⚠️ 임시처리: API 응답에 authorName 없음
    authorName: '',
    // ⚠️ 임시처리: API 응답에 activityName 없음
    activityName: '',
    bookmarkCount: item.bookmarkCount,
    createdAt: item.createdAt,
  };
};


// ===== 태그 변환 =====

/**
 * API TagCategory → UI TagsFilterModal TagCategory
 */
export const mapApiTagCategoryToUiTagCategory = (
  apiCategory: import('../../../api-types/activityApiTypes').TagCategory,
): TagCategory => {
  return {
    id: String(apiCategory.categoryId),
    name: apiCategory.categoryName,
    tags: apiCategory.tags.map((tag) => ({
      id: String(tag.id),
      name: tag.name,
      category: String(apiCategory.categoryId),
    })),
  };
};

/**
 * API TagItem → UI TagsFilterModal TagItem
 */
export const mapApiTagItemToUiTagItem = (
  apiTag: TagItem,
  categoryId: string,
): TagCategory['tags'][0] => {
  return {
    id: String(apiTag.id),
    name: apiTag.name,
    category: categoryId,
  };
};
