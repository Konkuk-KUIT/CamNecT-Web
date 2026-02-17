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

// 포트폴리오 목록 조회 [GET] /api/portfolio/{portfolioUserId}
export const getPortfolioList = async (userId: number, portfolioUserId: number) => {
  const response = await axiosInstance.get<PortfolioListResponse>(
    `/api/portfolio/${portfolioUserId}`,
    { params: { userId } }
  );
  return response.data;
};

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

// 포트폴리오 수정 [PATCH] /api/portfolio/{portfolioUserId}/{portfolioId}
export const updatePortfolio = async (
  userId: number,
  portfolioUserId: number,
  portfolioId: number,
  data: PortfolioUpdateRequest
) => {
  const response = await axiosInstance.patch<PortfolioMutateResponse>(
    `/api/portfolio/${portfolioUserId}/${portfolioId}`,
    data,
    { params: { userId } }
  );
  return response.data;
};

// 포트폴리오 삭제 [DELETE] /api/portfolio/{portfolioUserId}/{portfolioId}
export const deletePortfolio = async (
  userId: number, 
  portfolioUserId: number,
  portfolioId: number
) => {
  const response = await axiosInstance.delete<PortfolioDeleteResponse>(
    `/api/portfolio/${portfolioUserId}/${portfolioId}`,
    { params: { userId } }
  );
  return response.data;
};

// 공개 여부 토글 [PATCH] /api/portfolio/{portfolioUserId}/{portfolioId}/public
export const togglePortfolioPublic = async (
  userId: number,
  portfolioUserId: number,
  portfolioId: number
) => {
  const response = await axiosInstance.patch<PortfolioToggleResponse>(
    `/api/portfolio/${portfolioUserId}/${portfolioId}/public`,
    {},
    { params: { userId } }
  );
  return response.data;
};

// 즐겨찾기 토글 [PATCH] /api/portfolio/{portfolioUserId}/{portfolioId}/favorite
export const togglePortfolioFavorite = async (
  userId: number,
  portfolioUserId: number,
  portfolioId: number
) => {
  const response = await axiosInstance.patch<PortfolioToggleResponse>(
    `/api/portfolio/${portfolioUserId}/${portfolioId}/favorite`,
    {},
    { params: { userId } }
  );
  return response.data;
};

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