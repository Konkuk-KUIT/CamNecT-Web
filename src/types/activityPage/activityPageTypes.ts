import { type Activity } from "../activity/activityTypes";
import { type TeamPost } from "../team/teamTypes";

export type ActivityPostTab = 'club' | 'study' | 'external' | 'job';
export type ActivityPostStatus = 'OPEN' | 'CLOSED';

export type ActivityPostAuthor = {
  id: string;
  name: string;
  major: string;
  studentId: string;
  profileImageUrl?: string;
};

// 공통 기본 타입
export type ActivityPost = {
  id: string;
  tab: ActivityPostTab;
  title: string;
  content: string;
  categories: string[];
  likes: number;
  saveCount: number;
  createdAt: string;
  author: ActivityPostAuthor;
  status?: ActivityPostStatus;
  postImages?: string[];
  thumbnailUrl?: string;
  isLiked?: boolean;
  isBookmarked?: boolean;
  organizer?: string;
  deadline?: string;
};

// 대외활동 상세 정보 포함 타입
export type ActivityPostDetail = ActivityPost & {
  // 대외활동/취업정보에만 있는 필드들
  location?: string;
  employType?:string;
  payment?:string;
  target?: string;
  applyPeriod?: {
    start: string;
    end: string;
  };
  announceDate?: string;
  applyUrl?: string;
  descriptionBlocks?: {
    title: string;
    body: string;
  };
};




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
    authorGrade: string;
    authorProfile: string;

    recruitDeadline: string;
    recruitTeamNumber: number;

    description: string;

    isSubmited?:boolean;
}
