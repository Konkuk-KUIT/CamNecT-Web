import type {
  ActivityListRequest,
  ActivityListResponse,
  ActivityCreateRequest,
  ActivityCreateResponse,
  ActivityDetailResponse,
  ActivityUpdateRequest,
  ActivityUpdateResponse,
  ActivityDeleteResponse,
  ActivityBookmarkResponse,
  ThumbnailPresignRequest,
  ThumbnailPresignResponse,
  AttachmentPresignRequest,
  AttachmentPresignResponse,
  TagListResponse,
  TagScope,
  RecruitmentCreateRequest,
  RecruitmentCreateResponse,
  RecruitmentDetailResponse,
  RecruitmentBookmarkResponse,
  RecruitmentApplyRequest,
  RecruitmentApplyResponse,
} from '../api-types/activityApiTypes';
import { axiosInstance } from './axiosInstance';

// 대외활동 목록 조회 [GET] (/api/activity)
export const getActivityList = async (params: ActivityListRequest): Promise<ActivityListResponse> => {
  const response = await axiosInstance.get<ActivityListResponse>('/api/activity', {
    params: {
      userId: params.userId,
      category: params.category,
      tagIds: params.tagIds,
      title: params.title,
      sortType: params.sortType ?? 'LATEST',
      page: params.page ?? 0,
      size: params.size ?? 10,
    },
    // tagIds 배열을 ?tagIds=1&tagIds=2 형태로 직렬화
    paramsSerializer: (p) => {
      const searchParams = new URLSearchParams();
      Object.entries(p).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        if (Array.isArray(value)) {
          value.forEach((v) => searchParams.append(key, String(v)));
        } else {
          searchParams.append(key, String(value));
        }
      });
      return searchParams.toString();
    },
  });
  return response.data;
};

// 대외활동 등록 [POST] (/api/activity)
export const createActivity = async (
  userId: number,
  data: ActivityCreateRequest,
): Promise<ActivityCreateResponse> => {
  const response = await axiosInstance.post<ActivityCreateResponse>('/api/activity', data, {
    params: { userId },
  });
  return response.data;
};

// 대외활동 상세 조회 [GET] (/api/activity/{activityId})
export const getActivityDetail = async (
  userId: number,
  activityId: number,
): Promise<ActivityDetailResponse> => {
  const response = await axiosInstance.get<ActivityDetailResponse>(
    `/api/activity/${activityId}`,
    { params: { userId } },
  );
  return response.data;
};

// 대외활동 수정 [PATCH] (/api/activity/{activityId})
export const updateActivity = async (
  userId: number,
  activityId: number,
  data: ActivityUpdateRequest,
): Promise<ActivityUpdateResponse> => {
  const response = await axiosInstance.patch<ActivityUpdateResponse>(
    `/api/activity/${activityId}`,
    data,
    { params: { userId } },
  );
  return response.data;
};

// 대외활동 삭제 [DELETE] (/api/activity/{activityId})
export const deleteActivity = async (
  userId: number,
  activityId: number,
): Promise<ActivityDeleteResponse> => {
  const response = await axiosInstance.delete<ActivityDeleteResponse>(
    `/api/activity/${activityId}`,
    { params: { userId } },
  );
  return response.data;
};

// 대외활동 북마크 토글 [POST] (/api/activity/{activityId}/bookmark)
export const toggleActivityBookmark = async (
  userId: number,
  activityId: number,
): Promise<ActivityBookmarkResponse> => {
  const response = await axiosInstance.post<ActivityBookmarkResponse>(
    `/api/activity/${activityId}/bookmark`,
    null,
    { params: { userId } },
  );
  return response.data;
};

// 썸네일 Presigned URL 발급 [POST] (/api/activity/uploads/presign/thumbnail)
export const getActivityThumbnailPresignUrl = async (
  userId: number,
  data: ThumbnailPresignRequest,
): Promise<ThumbnailPresignResponse> => {
  const response = await axiosInstance.post<ThumbnailPresignResponse>(
    '/api/activity/uploads/presign/thumbnail',
    data,
    { params: { userId } },
  );
  return response.data;
};

// 첨부파일 Presigned URL 발급 (배치) [POST] (/api/activity/uploads/presign/attachments)
export const getActivityAttachmentsPresignUrl = async (
  userId: number,
  data: AttachmentPresignRequest,
): Promise<AttachmentPresignResponse> => {
  const response = await axiosInstance.post<AttachmentPresignResponse>(
    '/api/activity/uploads/presign/attachments',
    data,
    { params: { userId } },
  );
  return response.data;
};

// 태그 목록 조회 [GET] (/api/tags)
export const getTags = async (scope?: TagScope): Promise<TagListResponse> => {
  const response = await axiosInstance.get<TagListResponse>('/api/tags', {
    params: scope ? { scope } : undefined,
  });
  return response.data;
};

// 팀원 모집글 생성 [POST] (/api/activity/recruitment)
export const createRecruitment = async (
  userId: number,
  data: RecruitmentCreateRequest,
): Promise<RecruitmentCreateResponse> => {
  const response = await axiosInstance.post<RecruitmentCreateResponse>(
    '/api/activity/recruitment',
    data,
    { params: { userId } },
  );
  return response.data;
};

// 팀원 모집글 상세 조회 [GET] (/api/activity/recruitment/{recruitmentId})
export const getRecruitmentDetail = async (
  userId: number,
  recruitmentId: number,
): Promise<RecruitmentDetailResponse> => {
  const response = await axiosInstance.get<RecruitmentDetailResponse>(
    `/api/activity/recruitment/${recruitmentId}`,
    { params: { userId } },
  );
  return response.data;
};

// 팀원 모집글 북마크 토글 [POST] (/api/activity/recruitment/{recruitmentId}/bookmark)
export const toggleRecruitmentBookmark = async (
  userId: number,
  recruitmentId: number,
): Promise<RecruitmentBookmarkResponse> => {
  const response = await axiosInstance.post<RecruitmentBookmarkResponse>(
    `/api/activity/recruitment/${recruitmentId}/bookmark`,
    null,
    { params: { userId } },
  );
  return response.data;
};

// 팀원 지원하기 [POST] (/api/activity/recruitment/{recruitmentId}/apply)
export const applyRecruitment = async (
  userId: number,
  recruitmentId: number,
  data: RecruitmentApplyRequest,
): Promise<RecruitmentApplyResponse> => {
  const response = await axiosInstance.post<RecruitmentApplyResponse>(
    `/api/activity/recruitment/${recruitmentId}/apply`,
    data,
    { params: { userId } },
  );
  return response.data;
};