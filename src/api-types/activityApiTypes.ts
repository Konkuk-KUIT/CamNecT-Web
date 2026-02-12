// ===== 공통 =====

export type ActivityCategory = 'STUDY' | 'CLUB' | 'EXTERNAL' | 'RECRUITMENT';

export type ActivitySortType = 'RECOMMEND' | 'DEADLINE' | 'BOOKMARK' | 'RECRUIT' | 'LATEST';

export type ActivityStatus = 'OPEN' | 'CLOSED';

export type RecruitStatus = 'RECRUITING' | 'CLOSED';

// ===== 목록 조회 =====

export interface ActivityListItem {
  activityId: number;
  title: string;
  context: string;
  thumbnailUrl: string;
  tags: string[];
  bookmarkCount: number;
  organizer: string;
  applyEndDate: string; // "YYYY-MM-DD"
  createdAt: string;    // ISO8601
}

export interface ActivityListPageable {
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  offset: number;
  sort: {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };
  unpaged: boolean;
}

export interface ActivityListData {
  pageable: ActivityListPageable;
  size: number;
  content: ActivityListItem[];
  number: number;
  sort: {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface ActivityListResponse {
  status: number;
  message: string;
  data: ActivityListData;
}

export interface ActivityListRequest {
  userId: number;
  category?: ActivityCategory;
  tagIds?: number[];
  title?: string;
  sortType?: ActivitySortType;
  page?: number;
  size?: number;
}

// ===== 등록 =====

export interface ActivityCreateRequest {
  category: ActivityCategory;
  title: string;
  tagIds: number[];
  content: string;
  thumbnailKey: string;
  attachmentKey: string[];
}

export interface ActivityCreateResponse {
  status: number;
  message: string;
  data: ActivityListItem;
}

// ===== 상세 조회 =====

export interface ActivityAttachment {
  id: number;
  activityId: number;
  fileUrl: string;
  createdAt: string;
}

export interface RecruitmentItem {
  recruitId: number;
  activityId: number;
  userId: number;
  recruitStatus: RecruitStatus;
  title: string;
  content: string;
  recruitDeadline: string; // "YYYY-MM-DD"
  recruitCount: number;
  bookmarkCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityDetail {
  activityId: number;
  title: string;
  category: ActivityCategory;
  organizer: string;
  userId: number;
  region: string;
  targetDescription: string;
  thumbnailUrl: string;
  applyStartDate: string;  // "YYYY-MM-DD"
  applyEndDate: string;    // "YYYY-MM-DD"
  resultAnnounceDate: string; // "YYYY-MM-DD"
  officialUrl: string;
  status: ActivityStatus;
  createdAt: string;
  context: string;
}

export interface ActivityDetailData {
  isMine: boolean;
  activity: ActivityDetail;
  attachment: ActivityAttachment[];
  tagList: string[];
  recruitmentList: RecruitmentItem[];
  bookmarkCount: number;
  isBookmarked: boolean;
}

export interface ActivityDetailResponse {
  status: number;
  message: string;
  data: ActivityDetailData;
}

// ===== 수정 =====

export interface ActivityUpdateRequest {
  category: ActivityCategory;
  title: string;
  tagIds: number[];
  content: string;
  thumbnailKey: string;
  attachmentKey: string[];
}

export interface ActivityUpdateResponse {
  status: number;
  message: string;
  data: string;
}

// ===== 삭제 =====

export interface ActivityDeleteResponse {
  status: number;
  message: string;
  data: number;
}

// ===== 북마크 =====

export interface ActivityBookmarkResponse {
  status: number;
  message: string;
  data: string;
}

// ===== Presigned URL (썸네일) =====

export interface PresignedUrlItem {
  fileKey: string;
  uploadUrl: string;
  expiresAt: string;
  requiredHeaders: Record<string, string>;
}

export interface ThumbnailPresignRequest {
  contentType: string;
  size: number;
  originalFilename: string;
}

export interface ThumbnailPresignResponse {
  status: number;
  message: string;
  data: PresignedUrlItem;
}

// ===== Presigned URL (첨부파일 배치) =====

export interface AttachmentPresignRequest {
  items: ThumbnailPresignRequest[];
}

export interface AttachmentPresignResponse {
  status: number;
  message: string;
  data: {
    items: PresignedUrlItem[];
  };
}

// ===== 태그 =====

export type TagScope = 'DEFAULT' | 'COMMUNITY_QUESTION' | 'ACTIVITY_RECRUIT';

export interface TagItem {
  id: number;
  name: string;
}

export interface TagCategory {
  categoryId: number;
  categoryCode: string;
  categoryName: string;
  tags: TagItem[];
}

export interface TagListResponse {
  status: number;
  message: string;
  data: TagCategory[];
}

// ===== 팀원 모집 =====

export interface RecruitmentCreateRequest {
  activityId: number;
  title: string;
  recruitDeadline: string; // "YYYY-MM-DD"
  recruitCount: number;
  content: string;
}

export interface RecruitmentCreateResponse {
  status: number;
  message: string;
  data: RecruitmentItem;
}

export interface RecruitmentDetailData {
  userId: number;
  major_kor: string;
  grade: number;
  recruitment: RecruitmentItem;
  isMine: boolean;
  isBookmarked: boolean;
}

export interface RecruitmentDetailResponse {
  status: number;
  message: string;
  data: RecruitmentDetailData;
}

export interface RecruitmentBookmarkResponse {
  status: number;
  message: string;
  data: string;
}

export interface RecruitmentApplyRequest {
  content: string;
}

export interface RecruitmentApplyResponse {
  status: number;
  message: string;
  data: number;
}

// ===== 팀원 모집 =====

export interface RecruitmentCreateRequest {
  activityId: number;
  title: string;
  recruitDeadline: string; // "YYYY-MM-DD"
  recruitCount: number;
  content: string;
}

export interface RecruitmentCreateResponse {
  status: number;
  message: string;
  data: RecruitmentItem;
}

export interface RecruitmentDetailData {
  userId: number;
  major_kor: string;
  grade: number;
  recruitment: RecruitmentItem;
  isMine: boolean;
  isBookmarked: boolean;
}

export interface RecruitmentDetailResponse {
  status: number;
  message: string;
  data: RecruitmentDetailData;
}

export interface RecruitmentBookmarkResponse {
  status: number;
  message: string;
  data: string;
}

export interface RecruitmentApplyRequest {
  content: string;
}

export interface RecruitmentApplyResponse {
  status: number;
  message: string;
  data: number;
}