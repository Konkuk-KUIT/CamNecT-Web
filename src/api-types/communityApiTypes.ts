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

export type CommunityHomeData = {
  interestTagId: number;
  recommendedByInterest: CommunityPostItem[];
  waitingQuestions: CommunityPostItem[];
};

export type GetCommunityHomeParams = {
  interestTagId?: number;
};

export type CommunityAttachment = {
  fileKey: string;
  thumbnailKey: string;
  width: number;
  height: number;
  fileSize: number;
};

export type CreateCommunityPostBody = {
  boardCode: "INFO" | "QUESTION";
  title: string;
  content: string;
  anonymous: boolean;
  tagIds: number[];
  attachments: CommunityAttachment[];
  accessType: "FREE" | "PAID";
  requiredPoints: number;
};

export type CreateCommunityPostParams = {
  userId: string | number;
};

export type CreateCommunityPostResult = {
  postId: number;
};
