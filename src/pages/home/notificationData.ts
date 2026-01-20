export type NotificationType =
  | 'coffeeChatRequest'
  | 'pointUse'
  | 'pointEarn'
  | 'schedule'
  | 'reply'
  | 'comment';

export type NotificationBase = {
  id: string;
  type: NotificationType;
  dateLabel: string;
  isRead: boolean;
};

export type CoffeeChatRequestNotification = NotificationBase & {
  type: 'coffeeChatRequest';
  name: string;
  profileImageUrl?: string;
};

export type PointNotification = NotificationBase & {
  type: 'pointUse' | 'pointEarn';
  points: number;
};

export type ScheduleNotification = NotificationBase & {
  type: 'schedule';
};

export type ReplyNotification = NotificationBase & {
  type: 'reply';
  parentComment: string;
  replyContent: string;
};

export type CommentNotification = NotificationBase & {
  type: 'comment';
  postTitle: string;
  commentContent: string;
};

export type NotificationItem =
  | CoffeeChatRequestNotification
  | PointNotification
  | ScheduleNotification
  | ReplyNotification
  | CommentNotification;

type NotificationIconAsset = {
  type: 'pointUse' | 'pointEarn' | 'default';
  fill: string;
};

export const notificationIconAssets: NotificationIconAsset[] = [
  {
    type: 'pointUse',
    fill: 'black',
  },
  {
    type: 'pointEarn',
    fill: '#ECECEC',
  },
  {
    type: 'default',
    fill: '#00C56C',
  },
];

export const notificationList: NotificationItem[] = [
  {
    id: 'notice-1',
    type: 'coffeeChatRequest',
    name: '정하린',
    profileImageUrl: '',
    dateLabel: '1일 전',
    isRead: false,
  },
  {
    id: 'notice-2',
    type: 'pointUse',
    points: 12000,
    dateLabel: '2일 전',
    isRead: true,
  },
  {
    id: 'notice-3',
    type: 'pointEarn',
    points: 3200,
    dateLabel: '2일 전',
    isRead: false,
  },
  {
    id: 'notice-4',
    type: 'schedule',
    dateLabel: '3일 전',
    isRead: true,
  },
  {
    id: 'notice-5',
    type: 'reply',
    parentComment: '이번 주 스터디 일정이 어떻게 되나요?',
    replyContent: '금요일 7시에 온라인으로 진행합니다.',
    dateLabel: '5일 전',
    isRead: false,
  },
  {
    id: 'notice-6',
    type: 'comment',
    postTitle: '프로젝트 모집합니다!',
    commentContent: '관심있어요. 지원 방법 알려주세요!',
    dateLabel: '6일 전',
    isRead: true,
  },
];
