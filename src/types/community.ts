export type AuthorProfile = {
  id: string;
  name: string;
  major: string;
  studentId: string;
  isAlumni?: boolean;
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
  likes: number;
  saveCount: number;
  answers: number;
  isAdopted: boolean;
  createdAt: string;
  accessStatus: 'GRANTED' | 'LOCKED';
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
  isAdopted: boolean;
  adoptedCommentId?: string;
  createdAt: string;
  author: CommentAuthor;
  content: string;
  categories: string[];
  postImages?: string[];
  accessStatus?: 'GRANTED' | 'LOCKED';
  requiredPoints?: number;
  myPoints?: number;
};
