import type { CommentItem } from '../data';

export const findCommentContent = (
  comments: CommentItem[],
  commentId: string,
): string | null => {
  for (const comment of comments) {
    if (comment.id === commentId) return comment.content;
    if (comment.replies) {
      const replyContent = findCommentContent(comment.replies, commentId);
      if (replyContent) return replyContent;
    }
  }
  return null;
};

export const updateCommentContent = (
  comments: CommentItem[],
  commentId: string,
  content: string,
): CommentItem[] =>
  comments.map((comment) => {
    if (comment.id === commentId) {
      return { ...comment, content };
    }
    if (comment.replies) {
      return {
        ...comment,
        replies: updateCommentContent(comment.replies, commentId, content),
      };
    }
    return comment;
  });

export const formatCommentDate = (date: Date) => {
  const year = String(date.getFullYear()).slice(-2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}.${month}.${day}`;
};

export const formatCommentDisplayDate = (value: string) => {
  if (!value) return value;
  if (/^\d{2}\.\d{2}\.\d{2}/.test(value)) {
    return value.split(' ')[0];
  }
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value.split(' ')[0];
  }
  return formatCommentDate(parsed);
};
