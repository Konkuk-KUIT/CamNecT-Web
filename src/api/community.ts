import { axiosInstance } from "./axiosInstance";
import type {
  ApiResponse,
  CommunityPostItem,
  CursorPage,
  GetCommunityPostsParams,
} from "../api-types/communityApiTypes";

const DEFAULT_TAB = "ALL";
const DEFAULT_SORT = "RECOMMENDED";
const DEFAULT_SIZE = 20;

export const getCommunityPosts = async (
  params: GetCommunityPostsParams = {}
): Promise<ApiResponse<CursorPage<CommunityPostItem>>> => {
  const {
    tab,
    sort,
    size,
    tagId,
    keyword,
    cursorId,
    cursorValue,
  } = params;

  const queryParams: GetCommunityPostsParams = {
    tab: tab ?? DEFAULT_TAB,
    sort: sort ?? DEFAULT_SORT,
    size: size ?? DEFAULT_SIZE,
    ...(tagId !== undefined ? { tagId } : {}),
    ...(keyword !== undefined ? { keyword } : {}),
    ...(cursorId !== undefined ? { cursorId } : {}),
    ...(cursorValue !== undefined ? { cursorValue } : {}),
  };

  const response = await axiosInstance.get<
    ApiResponse<CursorPage<CommunityPostItem>>
  >("/api/community/posts", { params: queryParams });

  return response.data;
};
