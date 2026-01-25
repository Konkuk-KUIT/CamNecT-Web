import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type SyntheticEvent,
} from 'react';
import {
  communityCommentList,
  type CommentAuthor,
  type CommentItem,
} from '../data';
import {
  findCommentContent,
  formatCommentDate,
  formatCommentDisplayDate,
  updateCommentContent,
} from '../utils/comment';

type ReplyTarget = { id: string; name: string };

type UseCommentActionsParams = {
  currentUser: CommentAuthor;
  initialComments?: CommentItem[];
  isInfoPost: boolean;
  isLockedQuestion: boolean;
  isQuestionPost: boolean;
  isAdopted: boolean;
  adoptedCommentId?: string;
};

// 댓글 작성/편집/답글/정렬에 필요한 상태와 핸들러 제공
export const useCommentActions = ({
  currentUser,
  initialComments = communityCommentList,
  isInfoPost,
  isLockedQuestion,
  isQuestionPost,
  isAdopted,
  adoptedCommentId,
}: UseCommentActionsParams) => {
  const [commentContent, setCommentContent] = useState('');
  const [commentList, setCommentList] = useState<CommentItem[]>(initialComments);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingCommentContent, setEditingCommentContent] = useState('');
  const [replyTarget, setReplyTarget] = useState<ReplyTarget | null>(null);
  const [highlightedCommentId, setHighlightedCommentId] = useState<string | null>(null);
  const [replyFocusToken, setReplyFocusToken] = useState(0);
  const highlightTimerRef = useRef<number | null>(null);

  // 채택된 댓글을 상단에 고정하는 정렬 로직
  const sortedComments = useMemo(() => {
    if (isQuestionPost && isAdopted && adoptedCommentId) {
      return [
        ...commentList.filter((comment) => comment.id === adoptedCommentId),
        ...commentList.filter((comment) => comment.id !== adoptedCommentId),
      ];
    }
    return commentList;
  }, [adoptedCommentId, commentList, isAdopted, isQuestionPost]);

  const commentCount = useMemo(
    () =>
      commentList.reduce(
        (count, comment) => count + 1 + (comment.replies?.length ?? 0),
        0,
      ),
    [commentList],
  );

  const handleReplyClick = (comment: CommentItem) => {
    if (!isInfoPost) return;
    if (replyTarget?.id === comment.id) {
      setReplyTarget(null);
      setHighlightedCommentId(null);
      return;
    }
    setReplyTarget({ id: comment.id, name: comment.author.name });
    setReplyFocusToken((prev) => prev + 1);
    setHighlightedCommentId(comment.id);
    if (highlightTimerRef.current) {
      window.clearTimeout(highlightTimerRef.current);
    }
    highlightTimerRef.current = window.setTimeout(() => {
      setHighlightedCommentId(null);
      highlightTimerRef.current = null;
    }, 3000);
  };

  // 댓글 등록 (답글 포함)
  const handleSubmitComment = (event?: SyntheticEvent) => {
    event?.preventDefault();
    if (isLockedQuestion) return;
    const trimmed = commentContent.trim();
    if (!trimmed) return;
    const now = new Date();
    const newComment: CommentItem = {
      id: `comment-${Date.now()}`,
      author: { ...currentUser },
      content: trimmed,
      createdAt: formatCommentDate(now),
    };
    if (replyTarget) {
      setCommentList((prev) =>
        prev.map((comment) =>
          comment.id === replyTarget.id
            ? { ...comment, replies: [...(comment.replies ?? []), newComment] }
            : comment,
        ),
      );
      setReplyTarget(null);
    } else {
      setCommentList((prev) => [...prev, newComment]);
    }
    setCommentContent('');
  };

  // 댓글 편집 취소/저장
  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingCommentContent('');
  };

  const handleSaveEdit = () => {
    const trimmed = editingCommentContent.trim();
    if (!editingCommentId || !trimmed) {
      handleCancelEdit();
      return;
    }
    setCommentList((prev) =>
      updateCommentContent(prev, editingCommentId, trimmed),
    );
    handleCancelEdit();
  };

  // 편집 대상 댓글 본문 로드
  const startEditingComment = (commentId: string) => {
    const existingContent = findCommentContent(commentList, commentId);
    if (existingContent !== null) {
      setEditingCommentId(commentId);
      setEditingCommentContent(existingContent);
    }
  };

  // 하이라이트 타이머 정리
  useEffect(
    () => () => {
      if (highlightTimerRef.current) {
        window.clearTimeout(highlightTimerRef.current);
      }
    },
    [],
  );

  return {
    commentContent,
    setCommentContent,
    commentList,
    commentCount,
    sortedComments,
    editingCommentId,
    editingCommentContent,
    setEditingCommentContent,
    highlightedCommentId,
    replyTarget,
    replyFocusToken,
    handleReplyClick,
    handleSubmitComment,
    handleSaveEdit,
    handleCancelEdit,
    startEditingComment,
    formatCommentDisplayDate,
  };
};
