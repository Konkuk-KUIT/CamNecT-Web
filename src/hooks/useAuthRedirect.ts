import { useNavigate } from 'react-router-dom';
import type { NextStepType, UserRole } from '../api-types/authApiTypes';

export const useAuthRedirect = () => {
    const navigate = useNavigate();

    const handleRedirect = (role: UserRole, nextStep: NextStepType) => {
        // 1. 관리자인 경우
        if (role === 'ADMIN') {
            navigate('/admin/school-verification'); // 또는 관리자 대시보드
            return;
        }

        // 2. 일반 유저인 경우 nextStep에 따라 분기
        switch (nextStep) {
            case 'DOCUMENT_REQUIRED':
                navigate('/signup?step=4'); // 인증 서류 제출
                break;
            case 'ONBOARDING_REQUIRED':
                navigate('/signup?step=5'); // 프로필/관심사 설정
                break;
            case 'DOCUMENT_REVIEW_WAITING':
                navigate('/signup?step=7'); // 심사 대기 중
                break;
            case 'VERIFICATION_COMPLETE':
                navigate('/signup?step=8'); // 인증 완료 페이지
                break;
            case 'ADMIN_DASHBOARD':
                navigate('/admin/school-verification');
                break;
            case 'HOME':
            default:
                navigate('/home');
        }
    };

    return { handleRedirect };
};
