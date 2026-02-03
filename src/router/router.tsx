import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import { AlumniPage } from "../pages/alumni/AlumniPage";
import { ChatListPage } from "../pages/coffee-chat/ChatListPage";
import { ChatRequestListPage } from "../pages/coffee-chat/ChatRequestListPage";
import { ActivityPage } from "../pages/activity/ActivityPage";
import ActivityPostPage from "../pages/activity/ActivityPostPage";
import { LoginPage } from "../pages/auth/LoginPage";
import { OnboardingPage } from "../pages/onboarding/OnboardingPage";
import { SignUpPage } from "../pages/auth/SignUpPage";
import { HomePage }  from "../pages/home/HomePage";
import { MypagePage } from "../pages/my-page/MypagePage";
import { MypageEditPage } from "../pages/my-page/MypageEditPage";
import { FollowerPage } from "../pages/my-page/MypageFollowerPage";
import { WritePage } from "../pages/community/WritePage";
import CommunityPostPage from "../pages/community/CommunityPostPage";

import { AuthGuard } from "./AuthGuard";
import { PortfolioListPage } from "../pages/portfolio/PortfolioListPage";
import { PortfolioDetailPage } from "../pages/portfolio/PortfolioDetailPage";
import { CommunityPage } from "../pages/community/CommunityPage";
import CommunityPostPage from "../pages/community/CommunityPostPage";
import { NotificationPage } from "../pages/home/NotificationPage";
import { Schedule } from "../pages/schedule/Schedule";
import { ShopPage } from "../pages/shop/ShopPage";
import { ProfilePage } from "../pages/alumni/ProfilePage";
import { ChatRequestRoomPage } from "../pages/coffee-chat/ChatRequestRoomPage";
import { ChatRoomPage } from "../pages/coffee-chat/ChatRoomPage";
import { ActivityWritePage } from "../pages/activity/WritePage";

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
                        children: [
                            {
                                index: true,
                                element: <ChatListPage />,
                            },
                            {
                                path: ":id",
                                element: <ChatRoomPage />,
                            },
                            {
                                path: "requests", 
                                children: [
                                    {
                                        index: true,
                                        element: <ChatRequestListPage />,
                                    },
                                    {
                                        path: ":id",
                                        element: <ChatRequestRoomPage />,
                                    }
                                ]
                            }
                        ]
                        
                    },

                    {
                        path: "activity",
                        element: <ActivityPage />,
                    },
                    {
                        path: "activity/write",
                        element: <ActivityWritePage />,
                    },
                    {
                        path: "activity/edit/:postId",
                        element: <ActivityWritePage />,
                    },
                    {
                        path: "activity/post/:postId",
                        element: <ActivityPostPage />,
                    },
                    {
                        path: "schedule",
                        element: <Schedule />,
                    },
                    {
                        path: "me",
                        children: [
                            {
                                index: true,
                                element: <MypagePage />
                            },
                            {
                                path: "edit",
                                element: <MypageEditPage />
                            },
                            {
                                path: "follower",
                                element: <FollowerPage />
                            },
                            {
                                path: "portfolio",
                                children: [
                                    {
                                        index: true,
                                        element: <PortfolioListPage />
                                    },
                                    {
                                        path: ":portfolioId",
                                        element: <PortfolioDetailPage />
                                    },
                                ]
                            },
                        ]
                    },
                    {
                        path: "community",
                        element: <CommunityPage />,
                    },
                    {
                        path: "community/post/:postId",
                        element: <CommunityPostPage />,
                    },
                    {
                        path: "shop",
                        element: <ShopPage />,

                    },
                    {
                        path: "community",
                        element: <CommunityPage />,
                        
                    },
                    {
                        path: "community/write",
                        element: <WritePage />,
                    },
                    {
                        path: "community/edit/:postId",
                        element: <WritePage />,
                    },
                    {
                        path: "community/post/:postId",
                        element: <CommunityPostPage />,
                    },
                ]
            },
        ]
    }
]);
