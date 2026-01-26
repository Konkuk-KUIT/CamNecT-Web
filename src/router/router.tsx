import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { ActivityPage } from "../pages/activity/ActivityPage";
import { AdminVerificationDetail } from "../pages/admin/AdminVerificationDetail";
import { AdminVerificationList } from "../pages/admin/AdminVerificationList";
import { AlumniPage } from "../pages/alumni/AlumniPage";
import { ProfilePage } from "../pages/alumni/ProfilePage";
import { LoginPage } from "../pages/auth/LoginPage";
import { SignUpPage } from "../pages/auth/SignUpPage";
import { CoffeeChatRequest } from "../pages/coffee-chat/CoffeeChat-request";
import { CoffeeChatPage } from "../pages/coffee-chat/CoffeeChatPage";
import { CommunityPage } from "../pages/community/CommunityPage";
import { HomePage } from "../pages/home/HomePage";
import { NotificationPage } from "../pages/home/NotificationPage";
import { MypageEditPage } from "../pages/my-page/MypageEditPage";
import { FollowerPage } from "../pages/my-page/MypageFollowerPage";
import { MypagePage } from "../pages/my-page/MypagePage";
import { OnboardingPage } from "../pages/onboarding/OnboardingPage";
import { Schedule } from "../pages/schedule/Schedule";
import { ShopPage } from "../pages/shop/ShopPage";
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
                        path: "admin",
                        children: [
                            {
                                path: "schoolVerification",
                                element: <AdminVerificationList />,
                            },
                            {
                                path: "schoolVerification/:id",
                                element: <AdminVerificationDetail />,
                            }
                            // todo 관리자 대외활동 등록 페이지도 추가
                        ]
                    },
                
                    {
                        path: "home",
                        element: <HomePage />,
                    },
                    {
                        path: "home/notices",
                        element: <NotificationPage />,
                    },
                    {


                        path: "alumni",
                        element: <AlumniPage />,
                    },
                    {
                        path: "alumni/profile/:id",
                        element: <ProfilePage />,
                    },
                    {
                        path: "chat",
                        element: <CoffeeChatPage />,
                    },
                    {
                        path: "chat/requests",
                        element: <CoffeeChatRequest />,
                    },
                    {
                        path: "activity",
                        element: <ActivityPage />,
                    },
                    {
                        path: "schedule",
                        element: <Schedule />,
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
                    {
                        path: "community",
                        element: <CommunityPage />,
                    },
                    {
                        path: "shop",
                        element: <ShopPage />,
                    },
                ]
            },
        ]
    }
]);
