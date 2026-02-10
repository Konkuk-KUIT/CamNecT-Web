import type { 
  MyProfileRequest, 
  MyProfileResponse,
  ProfileImageUpdateRequest,
  ProfileImageUpdateResponse,
  ProfileBioUpdateRequest,
  ProfileBioUpdateResponse,
  ProfileTagsUpdateRequest,
  ProfileTagsUpdateResponse,
  ProfilePrivacyUpdateRequest,
  ProfilePrivacyUpdateResponse,
} from "../api-types/profileApiTypes";
import { axiosInstance } from "./axiosInstance";

// 마이페이지 조회 API [GET] (/api/profile/me)
export const getMyProfile = async (data: MyProfileRequest) => {
  const response = await axiosInstance.get<MyProfileResponse>("/api/profile/me", {
    params: data
  });
  return response.data;
};

// 프로필 이미지 수정 [PATCH] (/api/profile/me/image)
export const updateProfileImage = async (userId: number, data: ProfileImageUpdateRequest) => {
  const response = await axiosInstance.patch<ProfileImageUpdateResponse>(
    "/api/profile/me/image",
    data,
    { params: { userId } }
  );
  return response.data;
};

// 자기소개 수정 [PATCH] (/api/profile/me/bio)
export const updateProfileBio = async (userId: number, data: ProfileBioUpdateRequest) => {
  const response = await axiosInstance.patch<ProfileBioUpdateResponse>(
    "/api/profile/me/bio",
    data,
    { params: { userId } }
  );
  return response.data;
};

// 태그 수정 [PUT] (/api/profile/tags)
export const updateProfileTags = async (userId: number, data: ProfileTagsUpdateRequest) => {
  const response = await axiosInstance.put<ProfileTagsUpdateResponse>(
    "/api/profile/tags",
    data,
    { params: { userId } }
  );
  return response.data;
};

// 공개 여부 수정 [PATCH] (/api/profile/me/privacy)
export const updateProfilePrivacy = async (userId: number, data: ProfilePrivacyUpdateRequest) => {
  const response = await axiosInstance.patch<ProfilePrivacyUpdateResponse>(
    "/api/profile/me/privacy",
    data,
    { params: { userId } }
  );
  return response.data;
};