export type NotificationApiType =
  | 'COMMENT_ACCEPTED'
  | 'COFFEE_CHAT_REQUESTED'
  | 'POINT_EARNED'
  | 'POINT_SPENT'
  | 'POST_COMMENTED'
  | 'COMMENT_REPLIED';

export interface NotificationListRequest {
  userId: number;
  cursorId?: number;
  size?: number;
}

export interface NotificationListResponse {
  status: number;
  message: string;
  data: NotificationListData;
}

export interface NotificationListData {
  items: NotificationApiItem[];
  nextCursorId: number | null;
  hasNext: boolean;
}

export interface NotificationApiItem {
  id: number;
  type: NotificationApiType;
  message: string;
  read: boolean;
  actorUserId: number;
  actorName: string;
  actorProfileImageUrl: string;
  postId?: number;
  commentId?: number;
  requestId?: number;
  link?: string;
  createdAt: string;
}
