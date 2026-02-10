import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { HeaderLayout } from '../../layouts/HeaderLayout';
import { MainHeader } from '../../layouts/headers/MainHeader';
import {
  notificationIconAssets,
  type NotificationItem,
  type NotificationType,
} from './notificationData';
import { requestNotifications } from '../../api/notifications';
import { useNotificationStore } from '../../store/useNotificationStore';
import { useAuthStore } from '../../store/useAuthStore';
import { mapNotificationResponseToItems } from './notificationMapper';

const titleMap: Record<NotificationType, string> = {
  coffeeChatRequest: '커피챗 요청',
  pointUse: '포인트 사용',
  pointEarn: '포인트 적립',
  reply: '답글',
  comment: '댓글',
  commentAccepted: '댓글 채택',
};

const formatPoints = (points: number) => points.toLocaleString('ko-KR');

const getIconSvg = (type: NotificationType) => {
  if (type === 'pointUse') {
    return notificationIconAssets.find((icon) => icon.type === 'pointUse')?.svg;
  }
  if (type === 'pointEarn') {
    return notificationIconAssets.find((icon) => icon.type === 'pointEarn')?.svg;
  }
  return notificationIconAssets.find((icon) => icon.type === 'default')?.svg;
};

const renderContent = (notification: NotificationItem) => {
  switch (notification.type) {
    case 'coffeeChatRequest':
      if (notification.message) {
        return (
          <p className="text-r-14 text-[var(--ColorGray3,#646464)]">
            {notification.message}
          </p>
        );
      }
      return (
        <p className="text-r-14 text-[var(--ColorGray3,#646464)]">
          {notification.name}님께서 커피챗을 요청하였습니다.
        </p>
      );
    case 'pointUse':
      if (notification.message) {
        return (
          <p className="text-r-14 text-[var(--ColorGray3,#646464)]">
            {notification.message}
          </p>
        );
      }
      return (
        <p className="text-r-14 text-[var(--ColorGray3,#646464)]">
          {formatPoints(notification.points)}p 사용 완료!
        </p>
      );
    case 'pointEarn':
      if (notification.message) {
        return (
          <p className="text-r-14 text-[var(--ColorGray3,#646464)]">
            {notification.message}
          </p>
        );
      }
      return (
        <p className="text-r-14 text-[var(--ColorGray3,#646464)]">
          +{formatPoints(notification.points)}p 적립 완료!
        </p>
      );
    case 'commentAccepted':
      return (
        <p className="text-r-14 text-[var(--ColorGray3,#646464)]">
          내 댓글이 채택되었어요. 지금바로 확인해보세요!
        </p>
      );
    case 'reply':
      if (notification.message) {
        return (
          <p className="text-r-14 text-[var(--ColorGray3,#646464)]">
            {notification.message}
          </p>
        );
      }
      return (
        <div className="text-r-14 text-[var(--ColorGray3,#646464)]">
          <span className="block truncate">{notification.parentComment}</span>
          <span className="block truncate">
            새로운 답글이 달렸어요: {notification.replyContent}
          </span>
        </div>
      );
    case 'comment':
      if (notification.message) {
        return (
          <p className="text-r-14 text-[var(--ColorGray3,#646464)]">
            {notification.message}
          </p>
        );
      }
      return (
        <div className="text-r-14 text-[var(--ColorGray3,#646464)]">
          <span className="block truncate">{notification.postTitle}</span>
          <span className="block truncate">
            새로운 댓글이 달렸어요: {notification.commentContent}
          </span>
        </div>
      );
    default:
      return null;
  }
};

const renderIcon = (notification: NotificationItem) => {
  if (notification.type === 'coffeeChatRequest') {
    return notification.profileImageUrl ? (
      <img
        src={notification.profileImageUrl}
        alt={`${notification.name} 프로필`}
        className="h-[50px] w-[50px] rounded-full object-cover bg-[#ECECEC]"
      />
    ) : (
      <div className="h-[50px] w-[50px] rounded-full bg-[#ECECEC]" />
    );
  }

  const svg = getIconSvg(notification.type);

  return (
    <div
      className="h-[50px] w-[50px]"
      aria-hidden
      dangerouslySetInnerHTML={{ __html: svg ?? '' }}
    />
  );
};

export const NotificationPage = () => {
  const userId = useAuthStore((state) => state.user?.id);
  const numericUserId = userId ? Number(userId) : null;
  const hasValidUserId = Number.isFinite(numericUserId) && Number(numericUserId) > 0;
  const items = useNotificationStore((state) => state.items);
  const markAsRead = useNotificationStore((state) => state.markAsRead);
  const setItems = useNotificationStore((state) => state.setItems);

  const { data: notificationResponse } = useQuery({
    queryKey: ['notifications', numericUserId],
    queryFn: () => requestNotifications({ userId: Number(numericUserId), size: 20 }),
    enabled: hasValidUserId,
    staleTime: 30 * 1000,
  });

  useEffect(() => {
    if (!notificationResponse) return;
    const mappedItems = mapNotificationResponseToItems(notificationResponse);
    setItems(mappedItems);
  }, [notificationResponse, setItems]);

  const handleNotificationClick = (notification: NotificationItem) => {
    markAsRead(notification.id);

    switch (notification.type) {
      case 'coffeeChatRequest':
        // TODO: 커피챗 요청 - 해당하는 유저의 요청 수락 페이지로 이동
        break;
      case 'pointUse':
        // TODO: 포인트 사용 - 포인트 내역 페이지 연결
        break;
      case 'pointEarn':
        // TODO: 포인트 적립 - 포인트 내역 페이지 연결
        break;
      case 'commentAccepted':
        // TODO: 댓글 채택 - 해당 게시물로 이동
        break;
      case 'reply':
        // TODO: 답글 - 해당하는 답글이 달린 게시물 연결
        break;
      case 'comment':
        // TODO: 댓글 - 해당하는 댓글이 달린 게시물 연결
        break;
      default:
        break;
    }
  };

  return (
    <HeaderLayout headerSlot={<MainHeader title="알림" />}>
      <section className="w-full bg-white">
        {items.map((notification) => (
          <div
            key={notification.id}
            className={`grid min-h-[70px] w-full grid-cols-[50px_minmax(0,1fr)] items-center gap-[13px] px-[25px] py-[10px] border-t border-[var(--Color_Gray_B,#ECECEC)] last:border-b ${
              notification.isRead ? 'bg-white' : 'bg-[var(--ColorSub2,#F2FCF8)]'
            }`}
            role="button"
            tabIndex={0}
            onClick={() => handleNotificationClick(notification)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleNotificationClick(notification);
              }
            }}
          >
            {renderIcon(notification)}
            <div className="flex min-w-0 flex-col gap-[4px]">
              <div className="flex items-start justify-between gap-[8px]">
                <p className="min-w-0 truncate text-sb-14 text-[var(--ColorBlack,#202023)]">
                  [{titleMap[notification.type]}]
                </p>
                <span className="shrink-0 text-r-12 text-[var(--ColorGray3,#646464)]">
                  {notification.dateLabel}
                </span>
              </div>
              {renderContent(notification)}
            </div>
          </div>
        ))}
      </section>
    </HeaderLayout>
  );
};
