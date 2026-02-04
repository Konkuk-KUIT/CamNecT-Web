import { type Activity } from "../activity/activityTypes";
import { type TeamPost } from "../team/teamTypes";

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
export interface userInfo {
    authorProfile:string;
    authorName:string;
    authorMajor:string;
    authorGrade: string;
}

export interface ActivityListItem extends Activity{
    authorId: string;
    authorInfo?: userInfo;
    tab: string;
    content?: string;
    tags: string[];
    createdAt: string;
    isBookmarked: boolean;
}

export interface ActivityDetail extends ActivityListItem {
  images?: string[];
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


// // 팀원 모집 인터페이스
// export interface TeamPost {
// 	id : string,
// 	title : string
// }

export interface TeamRecruitPost extends TeamPost{
    activityId: string; // 어떤 활동에 붙은 팀원공고인지
    authorId: string;
    authorName: string;
    contestName?: string;
    recruitNow: boolean; // 모집중/완료
    bookmarkCount: number;
    createdAt: string;
}

export interface TeamRecruitDetail extends TeamRecruitPost{
    isBookmarked: boolean;
    activityTitle: string;
    activityUrl: string;

    authorMajor: string;
    authorGrade: number;

    recruitDeadline: string;
    recruitTeamNumber: number;

    description: string;
}



// 기본 UI
export interface ActivityListUiState {
  selectedHost: "전체" | "공공기관" | "기업" | "학교" | "동아리/커뮤니티" | "기타";
  selectedRegion: "전체"|"서울"|"경기"|"강원"|"충북"|"충남"|"전북"|"전남"|"경북"|"경남"|"부산";
}

