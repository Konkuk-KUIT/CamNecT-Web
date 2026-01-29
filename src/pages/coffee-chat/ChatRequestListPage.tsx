import { useState } from "react";
import { Tabs } from "../../components/Tabs";
import { HeaderLayout } from "../../layouts/HeaderLayout";
import { MainHeader } from "../../layouts/headers/MainHeader";
import type { ChatRoomListItem } from "../../types/coffee-chat/coffeeChatTypes";
import { AllRequestDeleteButton } from "./components/AllRequestDeleteButton";
import { ChatList } from "./components/ChatList";
import { ChatPostAccordian } from "./components/ChatPostAccordian";

const mockChatRequestRoomList: ChatRoomListItem[] = [
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
    lastMessage: '안녕하세요, 선배님의 활동을 보고 문의할게 있어 연락드렸습니다 !',
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
    lastMessage: '혹시 3번 포트폴리오에서 어떤 툴을 사용했는지 알려주실 수 있나요?',
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
    requestPostTitle: '유지태 교수 메소드 연기 팀 프로젝트 팀원 모집',
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
    lastMessage: '안녕하세요, 팀원 모집 공고보고 연락드렸습니다 !',
    lastMessageDate: '2026-01-24T09:00:00Z',
    unreadCount: 0,
    requestPostTitle: '유지태 교수 메소드 연기 팀 프로젝트 팀원 모집',
  },
  {
    roomId: '5',
    type: 'TEAM_RECRUIT',
    partner: {
      id: '5',
      name: '원희',
      major: '실용음악학부',
      studentId: '26학번',
      profileImg: '',
    },
    lastMessage: '26학번도 참여 가능할까요...?',
    lastMessageDate: '2026-01-24T09:00:00Z',
    unreadCount: 0,
    requestPostTitle: '실용음악 대회 팀원 모집',
  }
];

export const ChatRequestListPage = () => {

  const tabs = [
    { id: 'COFFEE_CHAT', label: '커피챗' },
    { id: 'TEAM_RECRUIT', label: '팀원모집' },
  ];

  const [activeId, setActiveId] = useState('COFFEE_CHAT');
  const [openPostTitle, setOpenPostTitle] = useState<string | null>(null); // 1개만 열릴 수 있음

    // mock데이터 타입별 filtering + 날짜 내림차순 정렬
  const filteredChatRoomList = mockChatRequestRoomList
    .filter((chatRoom) => chatRoom.type === activeId)
    // b가 더 크면(최신날짜) 앞으로 이동 (arrow function의 +,- 여부로 a,b 위치정렬)
    .sort((a, b) => new Date(b.lastMessageDate).getTime() - new Date(a.lastMessageDate).getTime());
  
  // 공모전 제목별로 채팅방 분류
  // .reduce: 배열을 순회하며 하나의 값으로 축약
  const filteredChatRoomListByPost = filteredChatRoomList
    .reduce((acc, chatRoom) => { // chatRoom: 현재 순회 중인 배열요소 
      const key = chatRoom.requestPostTitle || "제목없음";

      // 특정 공모전 제목의 채팅방 없을 시 생성
      if(!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(chatRoom);

      return acc; // 다음 loop에게의 전달값 (누적값) 
    }, {} as Record<string, ChatRoomListItem[]>); // reduce(callback, initialValue)
  
  // 토글 함수
  const togglePostTitle = (title: string) => {
    setOpenPostTitle((prev) => (prev === title ? null : title));
  }

  // 삭제 대상 개수 계산
  const currentDeleteCount = activeId === 'TEAM_RECRUIT'
    ? (openPostTitle ? (filteredChatRoomListByPost[openPostTitle]?.length || 0) : 0)
    : filteredChatRoomList.length;

  // todo 삭제 핸들러
  const handleDeleteAll = () => {
    if (activeId === 'TEAM_RECRUIT') {
      if (!openPostTitle) return;
      console.log(`${openPostTitle} 그룹의 요청 ${currentDeleteCount}개 삭제`);
    } else {
      console.log('커피챗 요청 전체 삭제');
    }
  };

  

  return (
    <HeaderLayout
      headerSlot={
        <MainHeader
          title="요청" />
      }
    >
      <Tabs
        tabs={tabs}
        activeId={activeId}
        onChange={(id) => setActiveId(id)}
      >
        <ol>
          {
            activeId === 'TEAM_RECRUIT' ? 
              // Object.entries : Object -> Array ([index0, index1])
              Object.entries(filteredChatRoomListByPost).map(([key, chatRoomList]) => {
                
                const isOpen = openPostTitle === key;
                const requestCount = chatRoomList.length;
                
                return (
                  <div className="flex flex-col">
                    <ChatPostAccordian
                      title={key}
                      isOpen={isOpen}
                      requestCount={requestCount}
                      onClick={() => togglePostTitle(key)}
                    />
                    {isOpen && (
                      <section>
                        {chatRoomList.map((chatRoom) => (
                          <ChatList key={chatRoom.roomId} chatRoom={chatRoom} isFirstPaddingDisabled={false} />
                        ))}
                      </section>
                    )}
                  </div>
                )
              })
            : 
              filteredChatRoomList.map((chatRoom) => (
                <ChatList key={chatRoom.roomId} chatRoom={chatRoom} isFirstPaddingDisabled={false} />
              ))
          }
        </ol>


        <AllRequestDeleteButton
          requestCount={currentDeleteCount}
          onClick={handleDeleteAll}
        />
      </Tabs>
    </HeaderLayout>
  );
};