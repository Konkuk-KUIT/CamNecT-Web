import type {
  EducationListResponse,
  EducationRequest,
  EducationAddResponse,
  EducationUpdateResponse,
  EducationDeleteResponse,
  ExperienceListResponse,
  ExperienceRequest,
  ExperienceAddResponse,
  ExperienceUpdateResponse,
  ExperienceDeleteResponse,
  CertificateListResponse,
  CertificateRequest,
  CertificateAddResponse,
  CertificateUpdateResponse,
  CertificateDeleteResponse,
  PostListParams,
  PostListResponse
} from "../api-types/userInfoApiTypes";
import { axiosInstance } from "./axiosInstance";

// ===== 학력 API =====

// 학력 목록 조회 [GET] (/api/user/me/educations)
export const getEducations = async (userId: number) => {
  const response = await axiosInstance.get<EducationListResponse>("/api/user/me/educations", {
    params: { userId }
  });
  return response.data;
};

// 학력 추가 [POST] (/api/user/me/educations)
export const addEducation = async (userId: number, data: EducationRequest) => {
  const response = await axiosInstance.post<EducationAddResponse>("/api/user/me/educations", data, {
    params: { userId }
  });
  return response.data;
};

// 학력 수정 [PATCH] (/api/user/me/educations/{educationId})
export const updateEducation = async (userId: number, educationId: number, data: EducationRequest) => {
  const response = await axiosInstance.patch<EducationUpdateResponse>(
    `/api/user/me/educations/${educationId}`,
    data,
    { params: { userId } }
  );
  return response.data;
};

// 학력 삭제 [DELETE] (/api/user/me/educations/{educationId})
export const deleteEducation = async (userId: number, educationId: number) => {
  const response = await axiosInstance.delete<EducationDeleteResponse>(
    `/api/user/me/educations/${educationId}`,
    { params: { userId } }
  );
  return response.data;
};

// ===== 경력 API =====

// 경력 목록 조회 [GET] (/api/user/me/experiences)
export const getExperiences = async (userId: number) => {
  const response = await axiosInstance.get<ExperienceListResponse>("/api/user/me/experiences", {
    params: { userId }
  });
  return response.data;
};

// 경력 추가 [POST] (/api/user/me/experiences)
export const addExperience = async (userId: number, data: ExperienceRequest) => {
  const response = await axiosInstance.post<ExperienceAddResponse>("/api/user/me/experiences", data, {
    params: { userId }
  });
  return response.data;
};

// 경력 수정 [PATCH] (/api/user/me/experiences/{experienceId})
export const updateExperience = async (userId: number, experienceId: number, data: ExperienceRequest) => {
  const response = await axiosInstance.patch<ExperienceUpdateResponse>(
    `/api/user/me/experiences/${experienceId}`,
    data,
    { params: { userId } }
  );
  return response.data;
};

// 경력 삭제 [DELETE] (/api/user/me/experiences/{experienceId})
export const deleteExperience = async (userId: number, experienceId: number) => {
  const response = await axiosInstance.delete<ExperienceDeleteResponse>(
    `/api/user/me/experiences/${experienceId}`,
    { params: { userId } }
  );
  return response.data;
};

// ===== 자격증 API =====

// 자격증 목록 조회 [GET] (/api/user/me/certificates)
export const getCertificates = async (userId: number) => {
  const response = await axiosInstance.get<CertificateListResponse>("/api/user/me/certificates", {
    params: { userId }
  });
  return response.data;
};

// 자격증 추가 [POST] (/api/user/me/certificates)
export const addCertificate = async (userId: number, data: CertificateRequest) => {
  const response = await axiosInstance.post<CertificateAddResponse>("/api/user/me/certificates", data, {
    params: { userId }
  });
  return response.data;
};

// 자격증 수정 [PATCH] (/api/user/me/certificates/{certificateId})
export const updateCertificate = async (userId: number, certificateId: number, data: CertificateRequest) => {
  const response = await axiosInstance.patch<CertificateUpdateResponse>(
    `/api/user/me/certificates/${certificateId}`,
    data,
    { params: { userId } }
  );
  return response.data;
};

// 자격증 삭제 [DELETE] (/api/user/me/certificates/{certificateId})
export const deleteCertificate = async (userId: number, certificateId: number) => {
  const response = await axiosInstance.delete<CertificateDeleteResponse>(
    `/api/user/me/certificates/${certificateId}`,
    { params: { userId } }
  );
  return response.data;
};



// 커뮤니티 작성글 [GET] /api/profile/myposts/community
export const getMyPostsCommunity = async (params: PostListParams) => {
  const { userId, sort = 'LATEST', cursorId, cursorValue, size = 20 } = params;
  const response = await axiosInstance.get<PostListResponse>('/api/profile/myposts/community', {
    params: { userId, sort, cursorId, cursorValue, size },
  });
  return response.data;
};

// 대외활동 작성글 [GET] /api/profile/myposts/external
export const getMyPostsExternal = async (params: PostListParams) => {
  const { userId, sort = 'LATEST', cursorId, cursorValue, size = 20 } = params;
  const response = await axiosInstance.get<PostListResponse>('/api/profile/myposts/external', {
    params: { userId, sort, cursorId, cursorValue, size },
  });
  return response.data;
};

// 팀원모집 작성글 [GET] /api/profile/myposts/recruitment
export const getMyPostsRecruitment = async (params: PostListParams) => {
  const { userId, sort = 'LATEST', cursorId, cursorValue, size = 20 } = params;
  const response = await axiosInstance.get<PostListResponse>('/api/profile/myposts/recruitment', {
    params: { userId, sort, cursorId, cursorValue, size },
  });
  return response.data;
};

// 커뮤니티 북마크 [GET] /api/profile/bookmarks/community
export const getMyBookmarksCommunity = async (params: PostListParams) => {
  const { userId, sort = 'RECOMMENDED', cursorId, cursorValue, size = 20 } = params;
  const response = await axiosInstance.get<PostListResponse>('/api/profile/bookmarks/community', {
    params: { userId, sort, cursorId, cursorValue, size },
  });
  return response.data;
};

// 대외활동 북마크 [GET] /api/profile/bookmarks/external
export const getMyBookmarksExternal = async (params: PostListParams) => {
  const { userId, sort = 'RECOMMENDED', cursorId, cursorValue, size = 20 } = params;
  const response = await axiosInstance.get<PostListResponse>('/api/profile/bookmarks/external', {
    params: { userId, sort, cursorId, cursorValue, size },
  });
  return response.data;
};

// 팀원모집 북마크 [GET] /api/profile/bookmarks/recruitment
export const getMyBookmarksRecruitment = async (params: PostListParams) => {
  const { userId, sort = 'RECOMMENDED', cursorId, cursorValue, size = 20 } = params;
  const response = await axiosInstance.get<PostListResponse>('/api/profile/bookmarks/recruitment', {
    params: { userId, sort, cursorId, cursorValue, size },
  });
  return response.data;
};