import { axiosInstance } from "./axiosInstance";
import type {
  ApiResponse,
  CommunityPostItem,
  CommunityHomeData,
  CursorPage,
  GetCommunityHomeParams,
  GetCommunityPostsParams,
  CreateCommunityPostBody,
  CreateCommunityPostResult,
  PostBookmarkResult,
  PostLikeResult,
  PostReactionParams,
  CommunityPostDetailResponse,
  GetCommunityPostDetailParams,
  CommunityPostCommentResponse,
  CreateCommunityCommentBody,
  CreateCommunityCommentParams,
  CreateCommunityCommentResult,
  DeleteCommunityCommentParams,
  DeleteCommunityCommentResult,
  UpdateCommunityCommentParams,
  UpdateCommunityCommentBody,
  UpdateCommunityCommentResult,
  DeleteCommunityPostParams,
  DeleteCommunityPostResult,
  UpdateCommunityPostBody,
  UpdateCommunityPostParams,
  UpdateCommunityPostResult,
} from "../api-types/communityApiTypes";

const DEFAULT_TAB = "ALL";
const DEFAULT_SORT = "RECOMMENDED";
const DEFAULT_SIZE = 20;

export const getCommunityPosts = async (data: GetCommunityPostsParams = {}) => {
  const {
    tab,
    sort,
    size,
    tagId,
    keyword,
    cursorId,
    cursorValue,
  } = data;

  const queryParams: GetCommunityPostsParams = {
    tab: tab ?? DEFAULT_TAB,
    sort: sort ?? DEFAULT_SORT,
    size: size ?? DEFAULT_SIZE,
    ...(tagId !== undefined ? { tagId } : {}),
    ...(keyword !== undefined ? { keyword } : {}),
    ...(cursorId !== undefined ? { cursorId } : {}),
    ...(cursorValue !== undefined ? { cursorValue } : {}),
  };

  const response = await axiosInstance.get<ApiResponse<CursorPage<CommunityPostItem>>>(
    "/api/community/posts",
    { params: queryParams }
  );
  return response.data;
};

export const getCommunityHome = async (data: GetCommunityHomeParams = {}) => {
  const response = await axiosInstance.get<ApiResponse<CommunityHomeData>>(
    "/api/community/home",
    { params: data }
  );

  return response.data;
};

export const createCommunityPost = async (data: { body: CreateCommunityPostBody }) => {
  const response = await axiosInstance.post<ApiResponse<CreateCommunityPostResult>>(
    "/api/community/posts",
    data.body
  );

  return response.data;
};

export const postCommunityLike = async (
  postId: number | string,
  params: PostReactionParams
 ) => {
  const response = await axiosInstance.post<ApiResponse<PostLikeResult>>(
    `/api/community/posts/${postId}/likes`,
    null,
    { params }
  );

  return response.data;
};

export const postCommunityBookmark = async (
  postId: number | string,
  params: PostReactionParams
 ) => {
  const response = await axiosInstance.post<ApiResponse<PostBookmarkResult>>(
    `/api/community/posts/${postId}/bookmarks`,
    null,
    { params }
  );

  return response.data;
};

export const getCommunityPostDetail = async (data: {
  postId: number | string;
  params: GetCommunityPostDetailParams;
}) => {
  const response = await axiosInstance.get<ApiResponse<CommunityPostDetailResponse>>(
    `/api/community/posts/${data.postId}`,
    { params: data.params }
  );

  return response.data;
};

export const getCommunityPostComments = async (postId: number | string) => {
  const response = await axiosInstance.get<ApiResponse<CommunityPostCommentResponse[]>>(
    `/api/community/posts/${postId}/comments`
  );

  return response.data;
};

export const createCommunityComment = async (data: {
  postId: number | string;
  params: CreateCommunityCommentParams;
  body: CreateCommunityCommentBody;
}) => {
  const response = await axiosInstance.post<ApiResponse<CreateCommunityCommentResult>>(
    `/api/community/posts/${data.postId}/comments`,
    data.body,
    { params: data.params }
  );

  return response.data;
};

export const deleteCommunityComment = async (data: {
  commentId: number | string;
  params: DeleteCommunityCommentParams;
}) => {
  const response = await axiosInstance.delete<ApiResponse<DeleteCommunityCommentResult>>(
    `/api/community/comments/${data.commentId}`,
    { params: data.params }
  );

  return response.data;
};

export const updateCommunityComment = async (data: {
  commentId: number | string;
  params: UpdateCommunityCommentParams;
  body: UpdateCommunityCommentBody;
}) => {
  const response = await axiosInstance.patch<ApiResponse<UpdateCommunityCommentResult>>(
    `/api/community/comments/${data.commentId}`,
    data.body,
    { params: data.params }
  );

  return response.data;
};

export const deleteCommunityPost = async (data: {
  postId: number | string;
  params: DeleteCommunityPostParams;
}) => {
  const response = await axiosInstance.delete<ApiResponse<DeleteCommunityPostResult>>(
    `/api/community/posts/${data.postId}`,
    { params: data.params }
  );

  return response.data;
};

export const updateCommunityPost = async (data: {
  postId: number | string;
  params: UpdateCommunityPostParams;
  body: UpdateCommunityPostBody;
}) => {
  const response = await axiosInstance.patch<ApiResponse<UpdateCommunityPostResult>>(
    `/api/community/posts/${data.postId}`,
    data.body,
    { params: data.params }
  );

  return response.data;
};
