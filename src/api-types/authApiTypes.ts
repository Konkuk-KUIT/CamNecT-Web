// API Request Body 타입 정의
export interface SignupRequestBody {
  email: string;
  userName: string;
  password: string;
  name: string;
  phoneNum: string;
  agreements: {
    serviceTerms: boolean;
    privacyTerms: boolean;
  };
}

export interface SchoolVerificationResponse {
    name: string;
    studentId: string;
    univ: string;
    major: string;
}