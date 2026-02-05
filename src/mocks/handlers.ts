import { http, HttpResponse } from "msw";
import type {
  ApiResponse,
  CommunityHomeData,
  CommunityPostItem,
  CursorPage,
  PostBookmarkResult,
  PostLikeResult,
} from "../api-types/communityApiTypes";
import { communityStore } from "./data/community";
import { MOCK_ALL_TAGS } from "../mock/tags";

const buildOk = <T>(data: T): ApiResponse<T> => ({
  status: 0,
  message: "ok",
  data,
});

const parseNumber = (value: string | null) => {
  if (!value) return null;
  const numeric = Number(value);
  return Number.isFinite(numeric) ? numeric : null;
};

const parseIdParam = (value: string | null | undefined) => {
  if (!value) return null;
  const direct = Number(value);
  if (Number.isFinite(direct)) return direct;
  const match = value.match(/\d+/);
  if (!match) return null;
  const numeric = Number(match[0]);
  return Number.isFinite(numeric) ? numeric : null;
};

const mapTagNameToId = (name: string) => {
  const match = MOCK_ALL_TAGS.find((tag) => tag.name === name);
  if (!match) return 0;
  const suffix = match.id.match(/_(\d+)$/);
  return suffix ? Number(suffix[1]) : 0;
};


const sortItems = (items: CommunityPostItem[], sort: string) => {
  if (sort === "LATEST") {
    return [...items].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }
  if (sort === "LIKE") {
    return [...items].sort((a, b) => b.likeCount - a.likeCount);
  }
  if (sort === "BOOKMARK") {
    return [...items].sort((a, b) => b.bookmarkCount - a.bookmarkCount);
  }
  return items;
};

export const handlers = [
  http.get("*/api/community/posts", ({ request }) => {
    const url = new URL(request.url);
    const tab = url.searchParams.get("tab") ?? "ALL";
    const sort = url.searchParams.get("sort") ?? "RECOMMENDED";
    const size = parseNumber(url.searchParams.get("size")) ?? 20;
    const keyword = (url.searchParams.get("keyword") ?? "").trim().toLowerCase();

    let items = communityStore.list();
    if (tab === "INFO") items = items.filter((item) => item.boardCode === "INFO");
    if (tab === "QUESTION") items = items.filter((item) => item.boardCode === "QUESTION");
    if (keyword) {
      items = items.filter((item) => {
        return (
          item.title.toLowerCase().includes(keyword) ||
          item.preview.toLowerCase().includes(keyword) ||
          item.tags.some((tag) => tag.toLowerCase().includes(keyword))
        );
      });
    }
    items = sortItems(items, sort);

    const pageItems = items.slice(0, size);
    const payload: CursorPage<CommunityPostItem> = {
      items: pageItems,
      nextCursorId: null,
      nextCursorValue: null,
      hasNext: items.length > size,
    };

    return HttpResponse.json(buildOk(payload));
  }),

  http.get("*/api/community/home", () => {
    const items = communityStore.list();
    const recommended = items.filter((item) => item.boardCode === "INFO").slice(0, 5);
    const waiting = items.filter((item) => item.boardCode === "QUESTION").slice(0, 5);

    const payload: CommunityHomeData = {
      interestTagId: 0,
      recommendedByInterest: recommended,
      waitingQuestions: waiting,
    };

    return HttpResponse.json(buildOk(payload));
  }),

  http.post("*/api/community/posts", async ({ request }) => {
    const url = new URL(request.url);
    const userId = parseNumber(url.searchParams.get("userId")) ?? 1;
    const body = (await request.json()) as {
      boardCode: "INFO" | "QUESTION";
      title: string;
      content: string;
      tagIds: number[];
      attachments: { thumbnailKey?: string }[];
    };

    const newItem = communityStore.create({
      boardCode: body.boardCode,
      title: body.title,
      content: body.content,
      tagIds: body.tagIds ?? [],
      attachments: body.attachments ?? [],
      authorId: userId,
    });

    return HttpResponse.json(
      buildOk({
        postId: newItem.postId,
      }),
    );
  }),

  http.get("*/api/community/posts/:postId", ({ request, params }) => {
    const url = new URL(request.url);
    const postId = parseIdParam(params.postId as string | undefined);
    if (!postId) {
      return HttpResponse.json(
        { status: 400, message: "invalid postId", data: null },
        { status: 400 },
      );
    }
    const item = communityStore.list().find((post) => post.postId === postId);
    if (!item) {
      return HttpResponse.json(
        { status: 404, message: "not found", data: null },
        { status: 404 },
      );
    }
    const tagIds = item.tags.map(mapTagNameToId);
    return HttpResponse.json(
      buildOk({
        postId: item.postId,
        boardCode: item.boardCode,
        title: item.title,
        content: item.preview,
        anonymous: false,
        authorId: communityStore.getAuthorId(item.postId),
        viewCount: 0,
        likeCount: item.likeCount,
        likedByMe: false,
        acceptedCommentId: item.accepted ? 1 : 0,
        tagIds,
        accessStatus: "GRANTED",
        requiredPoints: 0,
        myPoints: 0,
      }),
    );
  }),

  http.post("*/api/community/posts/:postId/likes", ({ request, params }) => {
    const url = new URL(request.url);
    const userId = parseNumber(url.searchParams.get("userId")) ?? 0;
    const postId = parseIdParam(params.postId as string | undefined);
    if (!postId) {
      return HttpResponse.json(
        { status: 400, message: "invalid postId", data: null },
        { status: 400 },
      );
    }
    const result = communityStore.toggleLike(postId, userId);

    if (!result) {
      return HttpResponse.json(
        { status: 404, message: "not found", data: null },
        { status: 404 },
      );
    }

    return HttpResponse.json(buildOk<PostLikeResult>(result));
  }),

  http.post("*/api/community/posts/:postId/bookmarks", ({ request, params }) => {
    const url = new URL(request.url);
    const userId = parseNumber(url.searchParams.get("userId")) ?? 0;
    const postId = parseIdParam(params.postId as string | undefined);
    if (!postId) {
      return HttpResponse.json(
        { status: 400, message: "invalid postId", data: null },
        { status: 400 },
      );
    }
    const result = communityStore.toggleBookmark(postId, userId);

    if (!result) {
      return HttpResponse.json(
        { status: 404, message: "not found", data: null },
        { status: 404 },
      );
    }

    const payload: PostBookmarkResult = {
      postId,
      bookmarked: result.bookmarked,
      bookmarkCount: result.bookmarkCount,
    };

    return HttpResponse.json(buildOk(payload));
  }),

  http.delete("*/api/community/posts/:postId", ({ params }) => {
    const postId = parseIdParam(params.postId as string | undefined);
    if (!postId) {
      return HttpResponse.json(
        { status: 400, message: "invalid postId", data: null },
        { status: 400 },
      );
    }
    const removed = communityStore.remove(postId);
    if (!removed) {
      return HttpResponse.json(
        { status: 404, message: "not found", data: null },
        { status: 404 },
      );
    }
    return HttpResponse.json(buildOk("ok"));
  }),

  http.patch("*/api/community/posts/:postId", async ({ params, request }) => {
    const postId = parseIdParam(params.postId as string | undefined);
    if (!postId) {
      return HttpResponse.json(
        { status: 400, message: "invalid postId", data: null },
        { status: 400 },
      );
    }
    const body = (await request.json()) as {
      title: string;
      content: string;
      tagIds: number[];
    };
    const updated = communityStore.update(postId, {
      title: body.title,
      content: body.content,
      tagIds: body.tagIds ?? [],
    });
    if (!updated) {
      return HttpResponse.json(
        { status: 404, message: "not found", data: null },
        { status: 404 },
      );
    }
    return HttpResponse.json(buildOk("ok"));
  }),

  http.get("*/api/community/posts/:postId/comments", () => {
    return HttpResponse.json(buildOk([]));
  }),

  http.post("*/api/community/posts/:postId/comments", async ({ params, request }) => {
    const postId = parseIdParam(params.postId as string | undefined);
    if (!postId) {
      return HttpResponse.json(
        { status: 400, message: "invalid postId", data: null },
        { status: 400 },
      );
    }
    const body = (await request.json()) as {
      content: string;
      parentCommentId: number | null;
    };
    if (!body.content) {
      return HttpResponse.json(
        { status: 400, message: "content required", data: null },
        { status: 400 },
      );
    }
    return HttpResponse.json(
      buildOk({
        commentId: Math.floor(Math.random() * 100000),
      }),
    );
  }),

  http.delete("*/api/community/comments/:commentId", () => {
    return HttpResponse.json(buildOk("ok"));
  }),

  http.patch("*/api/community/comments/:commentId", async ({ request }) => {
    const body = (await request.json()) as { content: string };
    if (!body.content) {
      return HttpResponse.json(
        { status: 400, message: "content required", data: null },
        { status: 400 },
      );
    }
    return HttpResponse.json(buildOk("ok"));
  }),
];
