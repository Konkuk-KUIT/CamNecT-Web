import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const [searchQuery, setSearchQuery] = useState('');
  const unreadCount = 3;

  const navigate = useNavigate();

  const tabs = [
    { id: 'COFFEE_CHAT', label: '커피챗' },
    { id: 'TEAM_RECRUIT', label: '팀원모집' },
  ];

  // mock데이터 타입별 filtering + 날짜 내림차순 정렬
  const filteredChatRoomList = mockChatRoomList
    .filter((chatRoom) => chatRoom.type === activeId)
    // b가 더 크면(최신날짜) 앞으로 이동 (arrow function의 +,- 여부로 a,b 위치정렬)
    .sort((a, b) => new Date(b.lastMessageDate).getTime() - new Date(a.lastMessageDate).getTime());

  // 채팅방 리스트 검색 함수
  const searchFilteredChatRoomList = (searchQuery: string) => {
    const result = filteredChatRoomList.filter((chatRoom) => {
      return chatRoom.partner.name.includes(searchQuery) || chatRoom.partner.major.includes(searchQuery)
        || chatRoom.partner.studentId.includes(searchQuery) || chatRoom.lastMessage.includes(searchQuery)
    })
    return result;
  }

  const handleChatRoomClick = (roomId: string) => {
    navigate(`/chat/${roomId}`);
  };

  return (
    <FullLayout
      headerSlot={
        <MainHeader
          title="커피챗"
          leftIcon="empty"
          rightActions={[
            { icon: 'coffeeChat', onClick: () => navigate('/chat/requests') }
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
        {/* 검색영역 */}
        <section className="w-full px-[25px] py-[20px] ">
          <div className="relative">
              <svg width="18" height="18" viewBox="0 0 20 20" fill="none"
              className="absolute left-[19px] top-[50%] translate-y-[-50%]">
                  <path 
                      d="M18.7508 18.7508L13.5538 13.5538M13.5538 13.5538C14.9604 12.1472 15.7506 10.2395 15.7506 8.25028C15.7506 6.26108 14.9604 4.35336 13.5538 2.94678C12.1472 1.54021 10.2395 0.75 8.25028 0.75C6.26108 0.75 4.35336 1.54021 2.94678 2.94678C1.54021 4.35336 0.75 6.26108 0.75 8.25028C0.75 10.2395 1.54021 12.1472 2.94678 13.5538C4.35336 14.9604 6.26108 15.7506 8.25028 15.7506C10.2395 15.7506 12.1472 14.9604 13.5538 13.5538Z" 
                      stroke="#646464" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"/>
              </svg>
              <input
                  type="text"
                  name="searchTags"
                  placeholder="채팅방, 대화 내용 검색"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                  }}
                  className="w-full h-[40px] pl-[52px] pr-[19px] py-[8px] rounded-[30px] bg-gray-150 text-gray-750 text-r-14 placeholder:text-gray-650 focus:outline-none"
              />
          </div>
        </section>

        <ol>
          {
            // 검색어 여부로 분기 렌더링
            // todo 길게 클릭 후 삭제 기능 추가
            searchQuery ? searchFilteredChatRoomList(searchQuery).map((chatRoom) => (
            <ChatList 
              key={chatRoom.roomId} 
              chatRoom={chatRoom} 
              searchQuery={searchQuery} 
              onClick={() => handleChatRoomClick(chatRoom.roomId)}
            />
          )) : filteredChatRoomList.map((chatRoom) => (
            <ChatList 
              key={chatRoom.roomId} 
              chatRoom={chatRoom} 
              onClick={() => handleChatRoomClick(chatRoom.roomId)}
            />
          ))}
        </ol>
      </Tabs>
    </FullLayout>
  );
};