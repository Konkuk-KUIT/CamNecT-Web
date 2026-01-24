// 1. 채팅 도메인에서의 유저 정보
export interface ChatUser {
  id: string;          // 유저 식별자
  nickname: string;    // "김갑수", "김익명"
  profileImg: string | null; // null -> placeholder 이미지
  major: string;      
  studentId: string;  
  introduction?: string; 
  tags: string[];      // ["UX&UI", "취업", "포트폴리오"] 
}

// 2. 첨부파일 및 게시글 데이터 정의
export interface FileAttachment {
  type: "PDF" | "ZIP" | "HWP" | "ETC"; // 아이콘 결정을 위해 필요할 수 있음
  name: string;        // "파일이름.pdf"
  size: string;        
  url: string;         
  expiryDate: string;  // "2026.03.15" (파일 보관 기간)
}

export interface PostAttachment {
  postId: string;
  title: string;       // "OO 기업 면접 난이도 어떤가요"
  category: string;   
  thumbnailUrl?: string; 
  description?: string; // 게시글 본문 일부 (옵션)
}

// 3. 채팅 메시지 
export type ChatMessageType = "TEXT" | "IMAGE" | "FILE" | "LINK" | "POST" | "SYSTEM";

export interface ChatMessage {
  id: string;
  roomId: string;
  senderId: string;    // 이 ID가 내 ID와 같으면 오른쪽(초록말풍선), 다르면 왼쪽(회색) 배치
  type: ChatMessageType;
  
  content: string;     // 텍스트 메시지 내용 (파일/이미지일 경우 "사진을 보냈습니다" 같은 대체 텍스트 or empty) 
  
  // 타입에 따른 추가 데이터 (Optional)
  imageUrls?: string[]; // 사진은 여러 장 묶어서 보낼 수 있다
  file?: FileAttachment;
  post?: PostAttachment;
  
  createdAt: string;   
  isRead: boolean;     
}

// 4. 채팅 목록 아이템 (ChatRoomListItem)
export interface ChatRoomListItem {
  roomId: string;
  partner: ChatUser;   // 상대방 정보 객체 
  
  lastMessage: string; // "어제 부탁드린 자료 잘 확인했습니다..." -> 내가 보낸 메시지 일 수도
  lastMessageDate: string; // "어제", "오전 10:23", "2024.01.23" 
  
  unreadCount: number; // 0이면 뱃지 숨김, 1이상이면 초록색 원에 숫자 표시
}

// 5. 커피챗 요청 수락/거절용 (Request)
export interface CoffeeChatRequest {
  id: string;
  sender: ChatUser;    // 요청자 정보
  receiver: ChatUser;  // 수신자 정보
  
  status: "PENDING" | "ACCEPTED" | "REJECTED";
  
  requestTags: string[]; // ["태그1", "태그2"] (요청 분야)
  message: string;       // "커피챗을 요청하는 이유와 궁금한 점..."
  
  createdAt: string;     // "1월 15일 수요일"
}