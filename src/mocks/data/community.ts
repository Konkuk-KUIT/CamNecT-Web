import type { CommunityPostItem } from "../../api-types/communityApiTypes";
import { MOCK_ALL_TAGS } from "../../mock/tags";

const items: CommunityPostItem[] = [];
let nextPostId = 1;
const likedByUser = new Map<number, Map<number, boolean>>();
const bookmarkedByUser = new Map<number, Map<number, boolean>>();
const authorByPostId = new Map<number, number>();

const findItem = (postId: number) => items.find((item) => item.postId === postId);
const findIndex = (postId: number) => items.findIndex((item) => item.postId === postId);

const mapTagIdToName = (tagId: number) => {
  const match = MOCK_ALL_TAGS.find((tag) => tag.id.endsWith(`_${tagId}`));
  return match?.name ?? `tag-${tagId}`;
};

const setToggleState = (
  store: Map<number, Map<number, boolean>>,
  postId: number,
  userId: number,
) => {
  const postMap = store.get(postId) ?? new Map<number, boolean>();
  const next = !postMap.get(userId);
  postMap.set(userId, next);
  store.set(postId, postMap);
  return next;
};

export const communityStore = {
  list: () => items,
  create: (payload: {
    boardCode: "INFO" | "QUESTION";
    title: string;
    content: string;
    tagIds: number[];
    attachments: { thumbnailKey?: string }[];
    authorId: number;
  }) => {
    const newItem: CommunityPostItem = {
      postId: nextPostId++,
      boardCode: payload.boardCode,
      title: payload.title,
      preview: payload.content,
      createdAt: new Date().toISOString(),
      likeCount: 0,
      answerCount: 0,
      commentCount: 0,
      bookmarkCount: 0,
      accepted: false,
      tags: payload.tagIds.map(mapTagIdToName),
      thumbnailUrl: payload.attachments?.[0]?.thumbnailKey ?? "",
    };
    authorByPostId.set(newItem.postId, payload.authorId);
    items.unshift(newItem);
    return newItem;
  },
  getAuthorId: (postId: number) => authorByPostId.get(postId) ?? 0,
  toggleLike: (postId: number, userId: number) => {
    const item = findItem(postId);
    if (!item) return null;
    const next = setToggleState(likedByUser, postId, userId);
    item.likeCount = Math.max(0, item.likeCount + (next ? 1 : -1));
    return { liked: next, likeCount: item.likeCount };
  },
  toggleBookmark: (postId: number, userId: number) => {
    const item = findItem(postId);
    if (!item) return null;
    const next = setToggleState(bookmarkedByUser, postId, userId);
    item.bookmarkCount = Math.max(0, item.bookmarkCount + (next ? 1 : -1));
    return { bookmarked: next, bookmarkCount: item.bookmarkCount };
  },
  remove: (postId: number) => {
    const index = findIndex(postId);
    if (index < 0) return false;
    items.splice(index, 1);
    likedByUser.delete(postId);
    bookmarkedByUser.delete(postId);
    authorByPostId.delete(postId);
    return true;
  },
  update: (postId: number, payload: { title: string; content: string; tagIds: number[] }) => {
    const item = findItem(postId);
    if (!item) return null;
    item.title = payload.title;
    item.preview = payload.content;
    item.tags = payload.tagIds.map(mapTagIdToName);
    return item;
  },
};
