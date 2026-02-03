import { Outlet, useNavigate } from "react-router-dom";
import PopUp from "../components/Pop-up";
import { useAuthStore } from "../store/useAuthStore";

// 로그인 여부에 따른 라우팅 보호 컴포넌트
export const AuthGuard = () => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const navigate = useNavigate();

    if (!isAuthenticated) {
        return (
            <div className="fixed inset-0 bg-white z-[9999]">
                <PopUp 
                    isOpen={true}
                    type="confirm"
                    title="로그인이 필요합니다"
                    content="서비스를 이용하시려면 로그인을 해주세요."
                    buttonText="로그인하러 가기"
                    onClick={() => {
                        navigate("/login", { replace: true });
                    }}
                />
            </div>
        );
    }

    return <Outlet />;
}