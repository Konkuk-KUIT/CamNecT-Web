import type {
  CommunityPostCommentResponse,
  CommunityPostDetailResponse,
  CommunityPostItem,
} from "../api-types/communityApiTypes";
import type { CommentItem, CommunityPostDetail, InfoPost, QuestionPost } from "../types/community";
import { loggedInUserMajor } from "../mock/community";
import { MOCK_ALL_TAGS } from "../mock/tags";

const buildAuthor = () => ({
  id: "unknown",
  name: "익명",
  major: loggedInUserMajor,
  studentId: "",
});

const mapTagIdToName = (tagId: number) => {
  const match = MOCK_ALL_TAGS.find((tag) => tag.id.endsWith(`_${tagId}`));
  return match?.name ?? `tag-${tagId}`;
};

export const mapToInfoPost = (post: CommunityPostItem): InfoPost => ({
  id: String(post.postId),
  author: {
    ...buildAuthor(),
    isAlumni: true,
  },
  categories: post.tags,
  title: post.title,
  content: post.preview,
  likes: post.likeCount,
  saveCount: post.bookmarkCount,
  comments: post.commentCount,
  createdAt: post.createdAt,
});

export const mapToQuestionPost = (post: CommunityPostItem): QuestionPost => ({
  id: String(post.postId),
  author: buildAuthor(),
  categories: post.tags,
  title: post.title,
  content: post.preview,
  likes: post.likeCount,
  saveCount: post.bookmarkCount,
  answers: post.answerCount,
  isAdopted: post.accepted,
  createdAt: post.createdAt,
  accessStatus: post.accessStatus ?? "LOCKED",
  requiredPoints: post.requiredPoints ?? 100,
  myPoints: post.myPoints ?? 0,
});

export const mapToCommunityPostDetail = (
  post: CommunityPostDetailResponse,
): CommunityPostDetail => ({
  id: String(post.postId),
  boardType: post.boardCode === "INFO" ? "정보" : "질문",
  title: post.title,
  likes: post.likeCount,
  comments: 0,
  saveCount: 0,
  isAdopted: Boolean(post.acceptedCommentId),
  adoptedCommentId: post.acceptedCommentId ? String(post.acceptedCommentId) : undefined,
  createdAt: new Date().toISOString(),
  accessStatus: post.accessStatus,
  requiredPoints: post.requiredPoints,
  myPoints: post.myPoints,
  author: {
    id: String(post.authorId),
    name: "익명",
    major: loggedInUserMajor,
    studentId: "",
  },
  content: post.content,
  categories: post.tagIds.map(mapTagIdToName),
});

export const mapFlatCommentsToTree = (
  comments: CommunityPostCommentResponse[],
): CommentItem[] => {
  const nodes = new Map<number, CommentItem>();
  const roots: CommentItem[] = [];

  comments.forEach((comment) => {
    nodes.set(comment.commentId, {
      id: String(comment.commentId),
      author: {
        ...buildAuthor(),
        id: String(comment.userId),
      },
      content: comment.content,
      createdAt: new Date().toISOString(),
      replies: [],
    });
  });

  comments.forEach((comment) => {
    const node = nodes.get(comment.commentId);
    if (!node) return;
    const parentId = comment.parentCommentId;
    if (parentId && nodes.has(parentId)) {
      const parent = nodes.get(parentId);
      if (!parent) return;
      parent.replies = [...(parent.replies ?? []), node];
    } else {
      roots.push(node);
    }
  });

  return roots.map((root) => ({
    ...root,
    replies: root.replies && root.replies.length > 0 ? root.replies : undefined,
  }));
};
