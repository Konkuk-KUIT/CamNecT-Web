export type Tab = "ALL" | "INFO" | "QUESTION";

export type Sort = "RECOMMENDED" | "LATEST" | "LIKE" | "BOOKMARK";

export type CommunityPostItem = {
  postId: number;
  boardCode: "INFO" | "QUESTION";
  title: string;
  preview: string;
  createdAt: string;
  likeCount: number;
  answerCount: number;
  commentCount: number;
  bookmarkCount: number;
  accepted: boolean;
  tags: string[];
  thumbnailUrl: string;
};

export type CursorPage<T> = {
  items: T[];
  nextCursorId: number | null;
  nextCursorValue: number | null;
  hasNext: boolean;
};

export type ApiResponse<T> = {
  status: number;
  message: string;
  data: T;
};

export type GetCommunityPostsParams = {
  tab?: Tab;
  sort?: Sort;
  tagId?: number;
  keyword?: string;
  cursorId?: number;
  cursorValue?: number;
  size?: number;
};
