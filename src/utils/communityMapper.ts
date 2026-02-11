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

const mapAuthorFromApi = (post: CommunityPostItem) => {
  if (!post.author) return buildAuthor();
  return {
    id: String(post.author.userId),
    name: post.author.name,
    major: post.author.majorName,
    studentId: "",
    yearLevel: post.author.yearLevel,
    profileImageUrl: post.author.profileImageUrl,
  };
};

const mapTagIdToName = (tagId: number) => {
  const match = MOCK_ALL_TAGS.find((tag) => tag.id.endsWith(`_${tagId}`));
  return match?.name;
};

export const mapToInfoPost = (post: CommunityPostItem): InfoPost => ({
  id: String(post.postId),
  author: {
    ...mapAuthorFromApi(post),
    isAlumni: true,
  },
  categories: post.tags,
  title: post.title,
  content: post.preview,
  thumbnailUrl: post.thumbnailUrl ?? null,
  likes: post.likeCount,
  saveCount: post.bookmarkCount,
  comments: post.commentCount,
  createdAt: post.createdAt,
});

export const mapToQuestionPost = (post: CommunityPostItem): QuestionPost => ({
  id: String(post.postId),
  author: mapAuthorFromApi(post),
  categories: post.tags,
  title: post.title,
  content: post.preview,
  thumbnailUrl: post.thumbnailUrl ?? null,
  likes: post.likeCount,
  saveCount: post.bookmarkCount,
  answers: post.answerCount,
  isAdopted: post.acceptedBadge ?? post.accepted ?? false,
  createdAt: post.createdAt,
  accessStatus: post.accessStatus ?? "LOCKED",
  accessType: post.accessType,
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
  bookmarked: post.bookmarked ?? false,
  isAdopted: Boolean(post.acceptedCommentId),
  adoptedCommentId: post.acceptedCommentId ? String(post.acceptedCommentId) : undefined,
  createdAt: new Date().toISOString(),
  accessStatus: post.accessStatus,
  requiredPoints: post.requiredPoints,
  myPoints: post.myPoints,
  author: {
    id: post.author ? String(post.author.userId) : String(post.authorId),
    name: post.author?.name ?? "익명",
    major: post.author?.majorName ?? loggedInUserMajor,
    studentId: "",
    yearLevel: post.author?.yearLevel,
    profileImageUrl: post.author?.profileImageUrl,
  },
  content: post.content,
  categories: post.tagIds
    .map(mapTagIdToName)
    .filter((tagName): tagName is string => Boolean(tagName)),
  attachments: post.attachments ?? [],
  postImages: post.attachments
    ?.filter((attachment) => {
      const key = attachment.fileKey.toLowerCase();
      return (
        attachment.downloadUrl &&
        (key.endsWith(".png") ||
          key.endsWith(".jpg") ||
          key.endsWith(".jpeg") ||
          key.endsWith(".webp"))
      );
    })
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((attachment) => attachment.downloadUrl),
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
