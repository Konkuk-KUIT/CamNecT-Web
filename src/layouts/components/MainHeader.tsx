import type { CSSProperties } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon, { type IconName } from '../../components/Icon';

type HeaderAction = {
  icon: IconName;
  onClick?: () => void;
  ariaLabel?: string;
  style?: CSSProperties;
};

type LeftAction = {
  icon?: IconName;
  onClick?: () => void;
  ariaLabel?: string;
  style?: CSSProperties;
};

type MainHeaderProps = {
  title?: string;
  rightActions?: HeaderAction[];
  leftAction?: LeftAction;
  leftIcon?: 'empty';
  leftAriaLabel?: string;
};

export const MainHeader = ({ title, rightActions, leftAction, leftIcon, leftAriaLabel }: MainHeaderProps) => {
  const navigate = useNavigate();
  const normalizedRightActions = rightActions ?? [];
  // 왼쪽 아이콘 기본 동작: 별도 전달이 없으면 mainBack + 뒤로가기(-1)
  const leftIconName = leftAction?.icon ?? 'mainBack';
  const leftClickHandler = leftAction?.onClick ?? (() => navigate(-1));
  const leftLabel = leftAction?.ariaLabel ?? leftAriaLabel ?? '뒤로 가기';

  return (
    <header
      className='sticky left-0 right-0 top-0 z-50 inline-flex min-h-[48px] w-full items-center bg-white px-[25px] py-[10px] [container-type:inline-size] relative'
      style={{
        paddingTop: 'calc(10px + env(safe-area-inset-top, 0px))',
        top: 'env(safe-area-inset-top, 0px)',
      }}
      role='banner'
    >
      <div className='flex w-[28px] items-center justify-start z-10'>
        {/* leftIcon="empty"를 받으면 좌측 아이콘 영역 자체를 숨김 */}
        {leftIcon !== 'empty' ? (
          <button type='button' className='flex items-center justify-center' onClick={leftClickHandler} aria-label={leftLabel}>
            <Icon
              name={leftIconName}
              style={{
                width: 'clamp(24px, 7.467cqw, 28px)',
                height: 'clamp(24px, 7.467cqw, 28px)',
                // 개별 아이콘 스타일을 덮어쓰고 싶을 때 leftAction.style로 전달
                ...leftAction?.style,
              }}
            />
          </button>
        ) : null}
      </div>
      {/* 제목은 헤더 항상 가운데 정렬 */}
      {title ? (
        <div
          className='absolute left-1/2 -translate-x-1/2 text-center text-sb-20 text-[var(--ColorBlack,#202023)] max-w-[60%] truncate'
          style={{ fontSize: 'clamp(18px, 5.333cqw, 20px)' }}
        >
          {title}
        </div>
      ) : null}
      <div className='flex min-w-[28px] flex-1 items-center justify-end gap-[15px] z-10'>
        {/* 오른쪽 액션 아이콘들: 없으면 아무 것도 렌더하지 않음 */}
        {normalizedRightActions.length > 0
          ? normalizedRightActions.map((action) => (
              <button
                key={action.icon}
                type='button'
                className='flex items-center justify-center'
                onClick={action.onClick}
                aria-label={action.ariaLabel ?? action.icon}
              >
                <Icon
                  name={action.icon}
                  style={{
                    width: 'clamp(24px, 7.467cqw, 28px)',
                    height: 'clamp(24px, 7.467cqw, 28px)',
                    // 개별 아이콘별 스타일 커스터마이징
                    ...action.style,
                  }}
                />
              </button>
            ))
          : null}
      </div>
    </header>
  );
};
