export type OptionItemId =
  | 'copy-url'
  | 'report-post'
  | 'report-comment'
  | 'view-author-profile'
  | 'edit-post'
  | 'edit-comment'
  | 'delete-post'
  | 'delete-comment';

// 옵션 종류 판별 유틸
export const isEditOption = (id: OptionItemId) =>
  id === 'edit-post' ||
  id === 'edit-comment' ||
  id === 'delete-post' ||
  id === 'delete-comment';

export const isDeleteOption = (id: OptionItemId) =>
  id === 'delete-post' || id === 'delete-comment';
