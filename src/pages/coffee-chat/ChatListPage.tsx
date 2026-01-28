import { useState } from 'react';
import { Tabs } from '../../components/Tabs';
import { FullLayout } from '../../layouts/FullLayout';
import { MainHeader } from '../../layouts/headers/MainHeader';
import type { ChatRoomListItem } from '../../types/coffee-chat/coffeeChatTypes';
import { ChatList } from './components/ChatList';

const mockChatRoomList: ChatRoomListItem[] = [
  {
    roomId: '1',
    type: 'COFFEE_CHAT',
    partner: {
      id: '1',
      name: '김갑수',
      major: '자율전공',
      studentId: '25학번',
      profileImg: '',
    },
    lastMessage: '어제 부탁드린 자료 잘 확인 했습니다\n포트폴리오 좀 봐주실 수 있나요?',
    lastMessageDate: '2026-01-27T13:00:00Z', // 오늘
    unreadCount: 3,
  },
  {
    roomId: '2',
    type: 'COFFEE_CHAT',
    partner: {
      id: '2',
      name: '김익명',
      major: '디자인컨버전스학부',
      studentId: '21학번',
      profileImg: '',
    },
    lastMessage: '우리는 ㅈㅅㅇ 교수님 커리괜찮더라\n다른 수업 궁금한거있어? 나는...',
    lastMessageDate: '2026-01-26T10:00:00Z', // 어제
    unreadCount: 1,
  },
  {
    roomId: '3',
    type: 'TEAM_RECRUIT',
    partner: {
      id: '3',
      name: '신민아',
      major: '연기연극학부',
      studentId: '23학번',
      profileImg: '',
    },
    lastMessage: '안녕하세요, 프로젝트에 참여하고 싶어서 연락드렸습니다 !',
    lastMessageDate: '2026-01-25T15:00:00Z', // 그저께
    unreadCount: 2,
  },
  {
    roomId: '4',
    type: 'TEAM_RECRUIT',
    partner: {
      id: '4',
      name: '김우빈',
      major: '시각디자인학부',
      studentId: '26학번',
      profileImg: '',
    },
    lastMessage: '안녕하세요',
    lastMessageDate: '2026-01-24T09:00:00Z',
    unreadCount: 0,
  }
];

export const ChatListPage = () => {
  const [activeId, setActiveId] = useState('COFFEE_CHAT');
  const unreadCount = 3;

  const tabs = [
    { id: 'COFFEE_CHAT', label: '커피챗' },
    { id: 'TEAM_RECRUIT', label: '팀원모집' },
  ];

  // mock데이터 타입별 filtering + 날짜 내림차순 정렬
  const filteredChatRoomList = mockChatRoomList
    .filter((chatRoom) => chatRoom.type === activeId)
    // b가 더 크면(최신날짜) 앞으로 이동 (arrow function의 +,- 여부로 a,b 위치정렬)
    .sort((a, b) => new Date(b.lastMessageDate).getTime() - new Date(a.lastMessageDate).getTime());


  return (
    <FullLayout
      headerSlot={
        <MainHeader
          title="커피챗"
          leftIcon="empty"
          rightActions={[
            { icon: 'coffeeChat', onClick: () => console.log('chat') }
          ]}
          showBadge={unreadCount > 0}
        />
      }
    >
      <Tabs
        tabs={tabs}
        activeId={activeId}
        onChange={(id) => setActiveId(id)}
      >
        <ol>
          {filteredChatRoomList.map((chatRoom) => (
            <ChatList key={chatRoom.roomId} chatRoom={chatRoom} />
          ))}
        </ol>
      </Tabs>
    </FullLayout>
  );
};