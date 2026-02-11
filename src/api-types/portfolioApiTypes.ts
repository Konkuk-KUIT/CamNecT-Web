// src/api-types/portfolioApiTypes.ts

// ===== 공통 =====

export interface PresignRequest {
  contentType: string;
  size: number;
  originalFilename: string;
}

export interface PresignResult {
  fileKey: string;
  uploadUrl: string;
  expiresAt: string;
  requiredHeaders: Record<string, string>;
}

// ===== 목록 조회 =====

// 포트폴리오 요약 (목록에서 사용)
export interface PortfolioPreview {
  portfolioId: number;
  title: string;
  thumbnailUrl: string;
  isPublic: boolean;
  isFavorite: boolean;
}

export interface PortfolioListData {
  isMine: boolean;
  data: PortfolioPreview[];
}

export interface PortfolioListResponse {
  status: number;
  message: string;
  data: PortfolioListData;
}

// ===== 상세 조회 =====

export interface PortfolioAsset {
  assetId: number;
  type: string;         // "IMAGE" | "PDF" | "LINK" 등 (백엔드 확인 필요)
  fileKey: string;
  fileUrl: string;
  sortOrder: number;
  createdAt: string;
}

export interface PortfolioDetailData {
  portfolioId: number;
  userId: number;
  title: string;
  thumbnailUrl: string;
  startDate: string;    // "YYYY-MM-DD"
  endDate: string;      // "YYYY-MM-DD"
  description: string;
  isPublic: boolean;
  isFavorite: boolean;
  projectField: string[];
  assignedRole: string[];
  techStack: string[];
  review: string;               // Problem & Solution
  createdAt: string;
  updatedAt: string;
  // TODO: 백엔드에 추가 요청 필요
  // portfolioLinks: string[];   // 링크 목록 (현재 assets에 없음)
}

export interface PortfolioDetailWrapper {
  portfolio: PortfolioDetailData;
  portfolioAssets: PortfolioAsset[];
}

export interface PortfolioDetailResponseData {
  isMine: boolean;
  data: PortfolioDetailWrapper;
}

export interface PortfolioDetailResponse {
  status: number;
  message: string;
  data: PortfolioDetailResponseData;
}

// ===== 생성 / 수정 요청 =====

export interface PortfolioCreateRequest {
  projectTitle: string;
  description: string;
  startedAt: string;      // "YYYY-MM-DD"
  endedAt: string;        // "YYYY-MM-DD"
  project_role: string;   // TODO: 백엔드 필드명 오타 확인 필요 (snake_case 혼용)
  review: string;
  thumbnailKey: string;
  attachmentKeys: string[];
  // TODO: 백엔드에 추가 요청 필요
  // projectField: string[];     // 프로젝트 분야 (현재 요청에 없음)
  // techStack: string[];        // 기술 스택 (현재 요청에 없음)
}

export type PortfolioUpdateRequest = PortfolioCreateRequest;

// 생성/수정 응답 data
export type PortfolioMutateResponse = {
  status: number;
  message: string;
  data: PortfolioPreview;
}

// ===== Presign =====

export interface ThumbnailPresignResponse {
  status: number;
  message: string;
  data: PresignResult;
}

export interface AssetsPresignRequest {
  items: PresignRequest[];
}

export interface AssetsPresignResponse {
  status: number;
  message: string;
  data: {
    items: PresignResult[];
  };
}

// ===== 삭제 =====

export interface PortfolioDeleteResponse {
  status: number;
  message: string;
  data: string;
}

// ===== 토글 =====

export interface PortfolioToggleResponse {
  status: number;
  message: string;
  data: boolean;  // 최종 상태값 반환
}