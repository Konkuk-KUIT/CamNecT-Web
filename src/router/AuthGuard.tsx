// import { useAuthStore } from "../store/useAuthStore"
// import { Navigate } from "react-router-dom"
import { Outlet } from "react-router-dom";

// 로그인 여부에 따른 라우팅 보호 컴포넌트
// todo 로그인 기능 구현 시 토큰 검사 예정 (현재는 UI 테스트 목적으로 주석 처리)
export const AuthGuard = () => {
    // const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

    // if (!isAuthenticated) {
    //     alert("로그인을 해주세요"); // todo 팝업창 디자인 받고 구현해야 함

    //     // 랜더링 순간 로그인 페이지로 이동
    //     return <Navigate to="/login" />;
    // }

    return <Outlet />;
}