import type { NotificationApiItem, NotificationApiType, NotificationListResponse } from "../../api-types/notificationApiTypes";
import { formatTimeAgo } from "../../utils/formatDate";
import type { NotificationItem } from "./notificationData";

const COMMENT_ACCEPTED_MESSAGE = '내 댓글이 채택되었어요. 지금바로 확인해보세요!';

const parsePoints = (message?: string) => {
    if (!message) return 0;
    const match = message.match(/[0-9,]+/);
    if (!match) return 0;
    const normalized = match[0].replace(/,/g, '');
    const value = Number(normalized);
    return Number.isFinite(value) ? value : 0;
};

const mapType = (type: NotificationApiType): NotificationItem['type'] => {
    switch (type) {
        case 'COMMENT_ACCEPTED':
            return 'commentAccepted';
        case 'COFFEE_CHAT_REQUESTED':
            return 'coffeeChatRequest';
        case 'POINT_EARNED':
            return 'pointEarn';
        case 'POINT_SPENT':
            return 'pointUse';
        case 'POST_COMMENTED':
            return 'comment';
        case 'COMMENT_REPLIED':
            return 'reply';
        case 'FOLLOWING_POSTED':
            return 'followingPosted';
        case 'TEAM_APPLICATION_RECEIVED':
            return 'teamApplicationReceived';
        case 'COFFEE_CHAT_ACCEPTED':
            return 'coffeeChatAccepted';
        case 'TEAM_RECRUIT_ACCEPTED':
            return 'teamRecruitAccepted';
        case 'CHAT_MESSAGE_RECEIVED':
            return 'chatMessageReceived';
        default:
            return 'default';
    }
};

const toNotificationItem = (item: NotificationApiItem): NotificationItem => {
    const type = mapType(item.type);
    const base = {
        id: String(item.id),
        type,
        dateLabel: formatTimeAgo(item.createdAt),
        isRead: item.read,
        message: item.message,
        link: item.link,
        actorUserId: item.actorUserId,
        name: item.actorName,
        profileImageUrl: item.actorProfileImageUrl || undefined,
        postId: item.postId,
        commentId: item.commentId,
        requestId: item.requestId,
    };

    switch (type) {
        case 'pointEarn':
        case 'pointUse':
            return {
                ...base,
                type,
                points: parsePoints(item.message),
            };
        case 'reply':
            return {
                ...base,
                type,
                parentComment: '',
                replyContent: item.message,
            };
        case 'comment':
            return {
                ...base,
                type,
                postTitle: '',
                commentContent: item.message,
            };
        case 'commentAccepted':
            return {
                ...base,
                type,
                message: COMMENT_ACCEPTED_MESSAGE,
            };
        default:
            return {
                ...base,
            } as NotificationItem;
    }
};

export const mapNotificationResponseToItems = (
    response: NotificationListResponse | undefined,
): NotificationItem[] => {
    if (!response?.data?.items?.length) return [];
    return response.data.items.map(toNotificationItem);
};
