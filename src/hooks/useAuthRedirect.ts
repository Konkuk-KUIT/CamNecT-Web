import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import type { NextStepType, UserRole } from '../api-types/authApiTypes';

export const useAuthRedirect = () => {
    const navigate = useNavigate();

    const handleRedirect = useCallback((role: UserRole, nextStep: NextStepType) => {
        // 1. 관리자인 경우
        if (role === 'ADMIN') {
            navigate('/admin/school-verification', { replace: true }); // replace: true 추가
            return;
        }

        // 2. 일반 유저인 경우 nextStep에 따라 분기
        switch (nextStep) {
            case 'DOCUMENT_REQUIRED':
                navigate('/signup?step=4', { replace: true });
                break;
            case 'ONBOARDING_REQUIRED':
                navigate('/signup?step=5', { replace: true });
                break;
            case 'DOCUMENT_REVIEW_WAITING':
                navigate('/signup?step=7', { replace: true });
                break;
            case 'VERIFICATION_COMPLETE':
                navigate('/signup?step=8', { replace: true });
                break;
            case 'ADMIN_DASHBOARD':
                navigate('/admin/school-verification', { replace: true });
                break;
            case 'HOME':
            default:
                navigate('/home', { replace: true });
        }
    }, [navigate]);

    return { handleRedirect };
};
