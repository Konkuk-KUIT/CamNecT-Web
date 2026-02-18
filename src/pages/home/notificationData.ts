export type NotificationType =
  | 'coffeeChatRequest'
  | 'pointUse'
  | 'pointEarn'
  | 'reply'
  | 'comment'
  | 'commentAccepted'
  | 'followingPosted'
  | 'teamApplicationReceived'
  | 'coffeeChatAccepted'
  | 'teamRecruitAccepted'
  | 'chatMessageReceived'
  | 'default';

export type NotificationBase = {
  id: string;
  type: NotificationType;
  dateLabel: string;
  isRead: boolean;
  message?: string;
  link?: string;
  actorUserId?: number;
  name?: string;
  profileImageUrl?: string;
  postId?: number;
  commentId?: number;
  requestId?: number;
  points?: number;
};

export type CoffeeChatRequestNotification = NotificationBase & {
  type: 'coffeeChatRequest';
};

export type PointNotification = NotificationBase & {
  type: 'pointUse' | 'pointEarn';
  points: number;
};

export type CommentAcceptedNotification = NotificationBase & {
  type: 'commentAccepted';
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

export type FollowingNotification = NotificationBase & {
  type: 'followingPosted';
};

export type TeamApplicationNotification = NotificationBase & {
  type: 'teamApplicationReceived';
};

export type CoffeeChatAcceptedNotification = NotificationBase & {
  type: 'coffeeChatAccepted';
};

export type TeamRecruitAcceptedNotification = NotificationBase & {
  type: 'teamRecruitAccepted';
};

export type ChatMessageNotification = NotificationBase & {
  type: 'chatMessageReceived';
};

export type DefaultNotification = NotificationBase & {
  type: 'default';
};

export type NotificationItem =
  | CoffeeChatRequestNotification
  | PointNotification
  | ReplyNotification
  | CommentNotification
  | CommentAcceptedNotification
  | FollowingNotification
  | TeamApplicationNotification
  | CoffeeChatAcceptedNotification
  | TeamRecruitAcceptedNotification
  | ChatMessageNotification
  | DefaultNotification;

type NotificationIconAsset = {
  type: 'pointUse' | 'pointEarn' | 'default';
  svg: string;
};

export const notificationIconAssets: NotificationIconAsset[] = [
  {
    type: 'pointUse',
    svg:
      '<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="25" cy="25" r="25" fill="black"/>' +
      '<path d="M16.7614 37V13.7273H26.375C28.1174 13.7273 29.6212 14.0682 30.8864 14.75C32.1591 15.4242 33.1402 16.3674 33.8295 17.5795C34.5189 18.7841 34.8636 20.1856 34.8636 21.7841C34.8636 23.3902 34.5114 24.7955 33.8068 26C33.1098 27.197 32.1136 28.125 30.8182 28.7841C29.5227 29.4432 27.9848 29.7727 26.2045 29.7727H20.2727V25.3409H25.1591C26.0076 25.3409 26.7159 25.1932 27.2841 24.8977C27.8598 24.6023 28.2955 24.1894 28.5909 23.6591C28.8864 23.1212 29.0341 22.4962 29.0341 21.7841C29.0341 21.0644 28.8864 20.4432 28.5909 19.9205C28.2955 19.3902 27.8598 18.9811 27.2841 18.6932C26.7083 18.4053 26 18.2614 25.1591 18.2614H22.3864V37H16.7614Z" fill="#00C56C"/>' +
      '</svg>',
  },
  {
    type: 'pointEarn',
    svg:
      '<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="25" cy="25" r="25" fill="#ECECEC"/>' +
      '<path d="M16.7614 36V12.7273H26.375C28.1174 12.7273 29.6212 13.0682 30.8864 13.75C32.1591 14.4242 33.1402 15.3674 33.8295 16.5795C34.5189 17.7841 34.8636 19.1856 34.8636 20.7841C34.8636 22.3902 34.5114 23.7955 33.8068 25C33.1098 26.197 32.1136 27.125 30.8182 27.7841C29.5227 28.4432 27.9848 28.7727 26.2045 28.7727H20.2727V24.3409H25.1591C26.0076 24.3409 26.7159 24.1932 27.2841 23.8977C27.8598 23.6023 28.2955 23.1894 28.5909 22.6591C28.8864 22.1212 29.0341 21.4962 29.0341 20.7841C29.0341 20.0644 28.8864 19.4432 28.5909 18.9205C28.2955 18.3902 27.8598 17.9811 27.2841 17.6932C26.7083 17.4053 26 17.2614 25.1591 17.2614H22.3864V36H16.7614Z" fill="#00C56C"/>' +
      '</svg>',
  },
  {
    type: 'default',
    svg:
      '<svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">' +
      '<circle cx="25" cy="25" r="25" fill="#00C56C"/>' +
      '<g clip-path="url(#clip0_2015_2946)">' +
      '<path d="M25.6105 19.2617C27.603 19.2617 29.3802 20.1696 30.545 21.5889C30.8402 21.9489 31.3589 22.0383 31.7583 21.7941L37.5577 18.2459C38.1574 17.8791 38.1435 17.0113 37.5333 16.6628L26.0759 10.1225C25.7876 9.95853 25.4334 9.95853 25.1462 10.1225L13.6877 16.6639C13.0775 17.0124 13.0636 17.8802 13.6633 18.2471L19.4627 21.7952C19.8621 22.0394 20.3796 21.95 20.676 21.59C21.8419 20.1696 23.6191 19.2628 25.6105 19.2628V19.2617Z" fill="white"/>' +
      '<path d="M32.1221 28.6623C31.6983 28.4605 31.1924 28.605 30.9353 28.9948C29.8007 30.7144 27.8394 31.8505 25.6095 31.8505C22.098 31.8505 19.2521 29.0326 19.2521 25.5555C19.2521 25.1806 19.2857 24.8138 19.3494 24.4573C19.4165 24.0801 19.2545 23.6995 18.9245 23.4977L15.0552 21.1304C14.5458 20.8185 13.8719 21.057 13.6832 21.6199C13.2676 22.8557 13.0406 24.1798 13.0406 25.5555C13.0406 27.5721 13.5257 29.4774 14.386 31.1615C14.4902 31.3644 14.511 31.5994 14.4485 31.8184L13.036 36.8202C12.8403 37.5126 13.4852 38.15 14.1845 37.9563L19.1966 36.5634C19.42 36.5015 19.6597 36.5233 19.8669 36.6276C21.5885 37.5046 23.5406 38.001 25.6107 38.001C30.2325 38.001 34.2755 35.5213 36.4603 31.8402C36.7358 31.3747 36.5517 30.7763 36.0608 30.5413L32.1221 28.6623Z" fill="white"/>' +
      '</g>' +
      '<defs>' +
      '<clipPath id="clip0_2015_2946">' +
      '<rect width="25" height="28" fill="white" transform="translate(13 10)"/>' +
      '</clipPath>' +
      '</defs>' +
      '</svg>',
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
    type: 'commentAccepted',
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
