// src/api/portfolioApi.ts

import { axiosInstance } from "./axiosInstance";
import type {
  PortfolioListResponse,
  PortfolioDetailResponse,
  PortfolioCreateRequest,
  PortfolioUpdateRequest,
  PortfolioMutateResponse,
  PortfolioDeleteResponse,
  PortfolioToggleResponse,
  ThumbnailPresignResponse,
  AssetsPresignRequest,
  AssetsPresignResponse,
  PresignRequest,
} from "../api-types/portfolioApiTypes";

// ===== 목록 조회 =====

// 포트폴리오 목록 조회 [GET] /api/portfolio/{portfolioUserId}
export const getPortfolioList = async (userId: number, portfolioUserId: number) => {
  const response = await axiosInstance.get<PortfolioListResponse>(
    `/api/portfolio/${portfolioUserId}`,
    { params: { userId } }
  );
  return response.data;
};

// ===== 상세 조회 =====

// 포트폴리오 상세 조회 [GET] /api/portfolio/{portfolioUserId}/{portfolioId}
export const getPortfolioDetail = async (
  userId: number,
  portfolioUserId: number,
  portfolioId: number
) => {
  const response = await axiosInstance.get<PortfolioDetailResponse>(
    `/api/portfolio/${portfolioUserId}/${portfolioId}`,
    { params: { userId } }
  );
  return response.data;
};

// ===== 생성 =====

// 포트폴리오 생성 [POST] /api/portfolio/{portfolioUserId}
export const createPortfolio = async (
  userId: number,
  portfolioUserId: number,
  data: PortfolioCreateRequest
) => {
  const response = await axiosInstance.post<PortfolioMutateResponse>(
    `/api/portfolio/${portfolioUserId}`,
    data,
    { params: { userId } }
  );
  return response.data;
};

// ===== 수정 =====

// 포트폴리오 수정 [PATCH] /api/portfolio/{portfolioUserId}/{portfolioId}
export const updatePortfolio = async (
  userId: number,
  portfolioId: number,
  data: PortfolioUpdateRequest
) => {
  const response = await axiosInstance.patch<PortfolioMutateResponse>(
    `/api/portfolio/${userId}/${portfolioId}`,
    data,
    { params: { userId } }
  );
  return response.data;
};

// ===== 삭제 =====

// 포트폴리오 삭제 [DELETE] /api/portfolio/{portfolioUserId}/{portfolioId}
export const deletePortfolio = async (userId: number, portfolioId: number) => {
  const response = await axiosInstance.delete<PortfolioDeleteResponse>(
    `/api/portfolio/${userId}/${portfolioId}`,
    { params: { userId } }
  );
  return response.data;
};

// ===== 공개/즐겨찾기 토글 =====

// 공개 여부 토글 [PATCH] /api/portfolio/{portfolioUserId}/{portfolioId}/public
export const togglePortfolioPublic = async (userId: number, portfolioId: number) => {
  const response = await axiosInstance.patch<PortfolioToggleResponse>(
    `/api/portfolio/${userId}/${portfolioId}/public`,
    null,
    { params: { userId } }
  );
  return response.data;
};

// 즐겨찾기 토글 [PATCH] /api/portfolio/{portfolioUserId}/{portfolioId}/favorite
export const togglePortfolioFavorite = async (userId: number, portfolioId: number) => {
  const response = await axiosInstance.patch<PortfolioToggleResponse>(
    `/api/portfolio/${userId}/${portfolioId}/favorite`,
    null,
    { params: { userId } }
  );
  return response.data;
};

// ===== Presign (S3 업로드) =====

// 썸네일 Presign URL 발급 [POST]
export const presignThumbnail = async (
  userId: number,
  portfolioUserId: number,
  data: PresignRequest
) => {
  const response = await axiosInstance.post<ThumbnailPresignResponse>(
    `/api/portfolio/${portfolioUserId}/uploads/presign/thumbnail`,
    data,
    { params: { userId } }
  );
  return response.data;
};

// 첨부파일 Presign URL 발급 (다건) [POST]
export const presignAssets = async (
  userId: number,
  portfolioUserId: number,
  data: AssetsPresignRequest
) => {
  const response = await axiosInstance.post<AssetsPresignResponse>(
    `/api/portfolio/${portfolioUserId}/uploads/presign/assets`,
    data,
    { params: { userId } }
  );
  return response.data;
};

// ===== S3 직접 업로드 유틸 =====

// Presign URL로 S3에 직접 PUT 업로드
export const uploadToS3 = async (
  uploadUrl: string,
  file: File,
  requiredHeaders: Record<string, string>
) => {
  await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
      ...requiredHeaders,
    },
    body: file,
  });
};