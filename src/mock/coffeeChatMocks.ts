import type { ChatRoomListItem } from "../types/coffee-chat/coffeeChatTypes";

export const mockChatRoomList: ChatRoomListItem[] = [
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
    lastMessageDate: '2026-01-27T13:00:00Z',
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
    lastMessageDate: '2026-01-26T10:00:00Z',
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
    lastMessageDate: '2026-01-25T15:00:00Z',
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

export const mockChatRequestRoomList: ChatRoomListItem[] = [
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
    lastMessageDate: '2026-01-27T13:00:00Z',
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
    lastMessageDate: '2026-01-26T10:00:00Z',
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
    lastMessageDate: '2026-01-25T15:00:00Z',
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
