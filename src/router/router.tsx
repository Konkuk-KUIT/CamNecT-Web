import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import { AlumniPage } from "../pages/alumni/AlumniPage";
import { CoffeeChatPage } from "../pages/coffee-chat/CoffeeChatPage";
import { ActivityPage } from "../pages/activity/ActivityPage";
import { LoginPage } from "../pages/auth/LoginPage";
import { OnboardingPage } from "../pages/onboarding/OnboardingPage";
import { SignUpPage } from "../pages/auth/SignUpPage";
import { HomePage } from "../pages/home/HomePage";
import { MyPage } from "../pages/my-page/MyPage";
import { EmptyLayout } from "../layouts/EmptyLayout";
import { HeaderLayout } from "../layouts/HeaderLayout";
import { FullLayout } from "../layouts/FullLayout";

export const router = createBrowserRouter([

    // todo 각 페이지 연결 
    {
        path: "/",
        element: <App />, // 모든 화면을 감싸는 컴포넌트 (큰 틀)

        // App의 Outlet 태그에 넣을 contents
        children: [
        
            {
                element: <EmptyLayout />,
                children: [
                    { index: true, element: <OnboardingPage /> },
                    { path: "login", element: <LoginPage /> },
                ]
            },

            {
                element: <HeaderLayout headerType="main"/>,
                children: [
                    { path: "signup", element: <SignUpPage /> },
                ]
            },

            {
                element: <FullLayout headerType="home"/>,
                children: [
                    {
                        // todo HomeUI 연결
                        path: "home", element: <HomePage />
                    },
                ]
            },

            {
                element: <FullLayout headerType="main"/>,
                children: [
                    { path: "alumni", element: <AlumniPage /> },
                    { path: "chat", element: <CoffeeChatPage /> },
                    { path: "activity", element: <ActivityPage /> },
                    {
                        // todo MyPage 연결
                        path: "me", element: <MyPage />
                    },
                ]
            },
        ]

    }
    
]);