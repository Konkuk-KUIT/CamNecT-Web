export type LoggedInUser = {
  name: string;
  major: string;
  studentId: string;
  isAlumni?: boolean;
};

// TODO: 인증/유저 API 연동 시 스토어 상태로 대체.
export const loggedInUser: LoggedInUser = {
  name: '김하린',
  major: '컴퓨터공학부',
  studentId: '21',
  isAlumni: false,
};
