export type AuthorProfile = {
  id: string;
  name: string;
  major: string;
  studentId: string;
  isAlumni?: boolean;
  yearLevel?: number;
  profileImageUrl?: string | null;
};

export type CommentAuthor = AuthorProfile & {
  profileImageUrl?: string;
};

export type CommentItem = {
  id: string;
  author: CommentAuthor;
  content: string;
  createdAt: string;
  replies?: CommentItem[];
};

export type InfoPost = {
  id: string;
  author: AuthorProfile;
  categories: string[];
  title: string;
  content: string;
  imageUrl?: string;
  thumbnailUrl?: string | null;
  authorProfileImageUrl?: string;
  postImageUrl?: string;
  likes: number;
  saveCount: number;
  comments: number;
  createdAt: string;
};

export type QuestionPost = {
  id: string;
  author: AuthorProfile;
  categories: string[];
  title: string;
  content: string;
  imageUrl?: string;
  thumbnailUrl?: string | null;
  likes: number;
  saveCount: number;
  answers: number;
  isAdopted: boolean;
  createdAt: string;
  accessStatus: 'GRANTED' | 'LOCKED';
  accessType?: 'FREE' | 'POINT_REQUIRED';
  requiredPoints: number;
  myPoints: number;
};

export type CommunityPostDetail = {
  id: string;
  boardType: string;
  title: string;
  likes: number;
  comments: number;
  saveCount: number;
  bookmarked?: boolean;
  isAdopted: boolean;
  adoptedCommentId?: string;
  createdAt: string;
  author: CommentAuthor;
  content: string;
  categories: string[];
  postImages?: string[];
  attachments?: {
    attachmentId: number;
    sortOrder: number;
    fileKey: string;
    downloadUrl: string;
    width: number;
    height: number;
    fileSize: number;
  }[];
  accessStatus?: 'GRANTED' | 'LOCKED';
  requiredPoints?: number;
  myPoints?: number;
};
