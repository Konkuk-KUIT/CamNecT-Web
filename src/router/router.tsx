import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import { AlumniPage } from "../pages/alumni/AlumniPage";
import { CoffeeChatPage } from "../pages/coffee-chat/CoffeeChatPage";
import { ActivityPage } from "../pages/activity/ActivityPage";
import { LoginPage } from "../pages/auth/LoginPage";
import { OnboardingPage } from "../pages/onboarding/OnboardingPage";
import { SignUpPage } from "../pages/auth/SignUpPage";
import { HomePage } from "../pages/home/HomePage";
import { MypagePage } from "../pages/my-page/MypagePage";
import { MypageEditPage } from "../pages/my-page/MypageEditPage";
import { FollowerPage } from "../pages/my-page/MypageFollowerPage";
import { AuthGuard } from "./AuthGuard";

export const router = createBrowserRouter([

    // todo 각 페이지 연결 
    {
        path: "/",
        element: <App />, // 모든 화면을 감싸는 컴포넌트 (큰 틀)

        // App의 Outlet 태그에 넣을 contents
        children: [
        
            {
                index: true,
                element: <OnboardingPage />,
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "signup",
                element: <SignUpPage />,
            },

            // 로그인 필수 페이지들 
            {
                element: <AuthGuard/>,
                children: [
                    {
                        path: "home",
                        element: <HomePage />,
                    },
                    {


                        path: "alumni",
                        element: <AlumniPage />,
                    },
                    {
                        path: "chat",
                        element: <CoffeeChatPage />,
                    },
                    {
                        path: "activity",
                        element: <ActivityPage />,
                    },
                    {
                        path: "me",
                        element: <MypagePage />,

                    },
                    {
                        path: "me/edit",
                        element: <MypageEditPage />
                    },
                    {
                        path: "me/follower",
                        element: <FollowerPage />
                    },
                ]
            },
        ]
    }
]);
