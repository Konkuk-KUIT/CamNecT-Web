import { type Activity } from "./activity/activityTypes";
import { type TeamPost } from "./team/teamTypes";

export type ActivityTab = "club"|"study"|"contest"|"external"|"job"|"recruit";
export type ActivityTag = "광고/마케팅"|"기획/아이디어"|"개발"|"디자인" |"기타";
export type SortKey = "추천순"|"최신순"|"마감임박순";

// // 공모전 공통 인터페이스
// export interface Activity {
//   id: string;          
//   title: string;       
//   organizer?: string;
//   location?: string; 
//   deadline?: string; // 2025.12.11
//   posterImg?: string; 
//   bookmarkCount: number;
//   commentCount?: number;
// }

//대외활동 데이터

export interface ActivityListItem extends Activity{
  tab: ActivityTab;

  tags: ActivityTag[];
  dDay?: number;
  isBookmarked: boolean;

  createdAt: string; //웹에 등록된 시간
}

export interface ActivityDetail extends ActivityListItem {

  target: string; //모집대상
  applyPeriod: { 
    start: string; 
    end: string 
  };
  announceDate?: string;

  applyUrl: string; //해당 공모전 홈페이지 url
  descriptionBlocks: Array<{
    title: string;
    body: string;
  }>;
}


//팀원 공고 데이터

export type RecruitStatus = "OPEN"|"CLOSED";

// // 팀원 모집 인터페이스
// export interface TeamPost {
// 	id : string,
// 	title : string
// }

export interface TeamRecruitPost extends TeamPost{
  activityId: string; // 어떤 활동에 붙은 팀원공고인지

  authorName: string;

  status: RecruitStatus; // 모집중/완료
  pastDays: number; // -일 전
  bookmarkCount: number;
  commentCount: number;

  isBookmarked: boolean;
}

export interface TeamRecruitDetail extends TeamRecruitPost{
    activityTitle: string;
    activityUrl: string;

    authorMajor: string;
    authorGrade: number;

    recruitDeadline: string;
    recruitTeamNumber: number;
    genderLimit: string;

    description: string;

    comments: TeamRecruitComment[];
}

export interface TeamRecruitComment {
    id: string;
    postId: string;

    authorName: string;
    content: string;
    createdAt: string;

    replies?: TeamRecruitComment[];
}




// 기본 UI
export interface ActivityListUiState {
  activeTab: ActivityTab;

  selectedField: "전체" | ActivityTag;
  selectedHost: "전체" | "공공기관" | "기업" | "학교" | "동아리/커뮤니티" | "기타";
  selectedRegion: "전체"|"서울"|"경기"|"강원"|"충북"|"충남"|"전북"|"전남"|"경북"|"경남"|"부산";

  sort: SortKey;
}

