import type { ChatMessage, ChatRoomListItem } from "../types/coffee-chat/coffeeChatTypes";

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
      tags: ['UX&UI', '취업', '포트폴리오', '창업'],
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
      tags: ['UX&UI', '취업', '포트폴리오', '디자인'],
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
      tags: ['연기', '연극', '뮤지컬', '공연'],
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
      tags: ['UX&UI', '취업', '포트폴리오', '창업'],
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
      tags: ['UX&UI', '취업', '포트폴리오', '디자인'],
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
      tags: ['연기', '연극', '뮤지컬', '공연'],
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

export const mockMessages: ChatMessage[] = [
    {
        id: '1',
        roomId: '1',
        senderId: '1', // 상대방 (김갑수)
        type: 'TEXT',
        content: '안녕하세요! 반갑습니다.',
        createdAt: '2026-01-27T12:00:00Z',
        isRead: true,
    },
    {
        id: '2',
        roomId: '1',
        senderId: '1', // 상대방 (김갑수) - 연속 메시지 (같은 분)
        type: 'TEXT',
        content: '포트폴리오 관련해서 궁금한 점이 있어서 연락드렸어요.',
        createdAt: '2026-01-27T12:00:30Z',
        isRead: true,
    },
    {
        id: '3',
        roomId: '1',
        senderId: 'me', // 나
        type: 'TEXT',
        content: '네 안녕하세요! 어떤 부분이 궁금하신가요?',
        createdAt: '2026-01-27T12:01:00Z',
        isRead: true,
    },
    {
        id: '4',
        roomId: '1',
        senderId: 'me', // 나 - 연속 메시지 (1분 차이)
        type: 'TEXT',
        content: '편하게 물어봐주세요 😊',
        createdAt: '2026-01-27T12:02:00Z',
        isRead: true,
    },
    {
        id: '5',
        roomId: '1',
        senderId: '1', // 상대방
        type: 'TEXT',
        content: '앗 감사드려요! 사실 제가 이번에 UX 디자인 쪽으로 포폴을 새로 만드는데...',
        createdAt: '2026-01-27T12:03:00Z',
        isRead: true,
    },
    {
        id: '6',
        roomId: '1',
        senderId: '1', // 상대방 - 연속 메시지 (같은 분)
        type: 'TEXT',
        content: '레이아웃 구성을 어떻게 해야 할지 고민이 되더라구요.',
        createdAt: '2026-01-27T12:03:20Z',
        isRead: true,
    },
    {
        id: '7',
        roomId: '1',
        senderId: '1', // 상대방 - 연속 메시지 (같은 분)
        type: 'TEXT',
        content: '프로젝트가 3개 정도인데 다 넣는 게 좋을까요?',
        createdAt: '2026-01-27T12:03:45Z',
        isRead: true,
    },
    {
        id: '8',
        roomId: '1',
        senderId: 'me', // 나
        type: 'TEXT',
        content: '음, 프로젝트 개수보다는 각각의 퀄리티와 "어떤 문제를 어떻게 해결했는지" 보여주는 게 훨씬 중요해요!',
        createdAt: '2026-01-27T12:05:00Z',
        isRead: true,
    },
    {
        id: '9',
        roomId: '1',
        senderId: 'me', // 나 - 연속 메시지 (같은 분)
        type: 'TEXT',
        content: '가장 자신 있는 프로젝트 2개를 깊이 있게 보여주는 걸 추천드립니다.',
        createdAt: '2026-01-27T12:05:30Z',
        isRead: true,
    },
    {
        id: '10',
        roomId: '1',
        senderId: '1', // 상대방
        type: 'TEXT',
        content: '그렇군요! 핵심 위주로 정리해봐야겠네요. 너무 감사합니다.',
        createdAt: '2026-01-27T12:10:00Z',
        isRead: false, // 안 읽음 테스트용
    },
    {
        id: '11',
        roomId: '1',
        senderId: 'me', // 나
        type: 'TEXT',
        content: '네! 작업하시다가 또 궁금한 거 생기면 언제든 말씀해주세요.',
        createdAt: '2026-01-27T13:00:00Z',
        isRead: false,
    },
    {
        id: '12',
        roomId: '1',
        senderId: 'me', // 나 - 스크롤 테스트용 더미 데이터
        type: 'TEXT',
        content: '어제 부탁드린 자료 잘 확인 했습니다\n포트폴리오 좀 봐주실 수 있나요?',
        createdAt: '2026-01-27T13:02:00Z',
        isRead: false,
    },
    {
        id: '13',
        roomId: '1',
        senderId: '1', // 상대방
        type: 'TEXT',
        content: '메시지 최대 크기 입이다 메시지 최대 크기입니다 메시지 최대 크기입니다',
        createdAt: '2026-01-27T13:04:00Z',
        isRead: true,
    },
    {
        id: '14',
        roomId: '1',
        senderId: 'me', // 나
        type: 'TEXT',
        content: '시간차',
        createdAt: '2026-01-27T13:05:00Z',
        isRead: true,
    },
    {
        id: '15',
        roomId: '1',
        senderId: 'me', // 나 - 연속 (1분 차이)
        type: 'TEXT',
        content: '문자',
        createdAt: '2026-01-27T13:06:00Z',
        isRead: true,
    },
    {
        id: '16',
        roomId: '1',
        senderId: '1', // 상대방 - 다음날 테스트
        type: 'TEXT',
        content: '메시지가 새로 도착했습니다! (다음날)',
        createdAt: '2026-01-28T09:00:00Z',
        isRead: false,
    },
    {
        id: '17',
        roomId: '1',
        senderId: 'me',
        type: 'TEXT',
        content: '좋은 아침이에요!',
        createdAt: '2026-01-28T09:05:00Z',
        isRead: false,
    },
];
