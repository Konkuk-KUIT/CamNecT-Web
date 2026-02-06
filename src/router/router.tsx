import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import { AlumniSearchPage } from "../pages/alumni/AlumniPage";
import { ChatListPage } from "../pages/coffee-chat/ChatListPage";
import { ChatRequestListPage } from "../pages/coffee-chat/ChatRequestListPage";
import { ActivityPage } from "../pages/activity/ActivityPage";
import { AdminVerificationDetail } from "../pages/admin/AdminVerificationDetail";
import { AdminVerificationList } from "../pages/admin/AdminVerificationList";
import ActivityPostPage from "../pages/activity/ActivityPostPage";
import { LoginPage } from "../pages/auth/LoginPage";
import { SignUpPage } from "../pages/auth/SignUpPage";
import { HomePage } from "../pages/home/HomePage";
import { MypageEditPage } from "../pages/my-page/MypageEditPage";
import { FollowerPage } from "../pages/my-page/MypageFollowerPage";
import { MypagePage } from "../pages/my-page/MypagePage";
import { OnboardingPage } from "../pages/onboarding/OnboardingPage";
import { WritePage } from "../pages/community/WritePage";
import { AuthGuard } from "./AuthGuard";
import { PortfolioListPage } from "../pages/portfolio/PortfolioListPage";
import { PortfolioDetailPage } from "../pages/portfolio/PortfolioDetailPage";
import { CommunityPage } from "../pages/community/CommunityPage";
import  CommunityPostPage  from "../pages/community/CommunityPostPage";
import { NotificationPage } from "../pages/home/NotificationPage";
import { Schedule } from "../pages/schedule/Schedule";
import { ShopPage } from "../pages/shop/ShopPage";
import { ShopDetailPage } from "../pages/shop/ShopDetailPage";
import { AlumniProfilePage } from "../pages/alumni/ProfilePage";
import { ChatRequestRoomPage } from "../pages/coffee-chat/ChatRequestRoomPage";
import { ChatRoomPage } from "../pages/coffee-chat/ChatRoomPage";
import { MyPostsPage } from "../pages/my-page/sidebar/MyPostPage";
import { MyBookmarksPage } from "../pages/my-page/sidebar/MyBookmarksPage";
import { MySettingsPage } from "../pages/my-page/sidebar/MySettingsPage";
import { AccountSettingsPage } from "../pages/my-page/sidebar/AccountSettingsPage";
import { TermsPage } from "../pages/my-page/sidebar/TermsPage";
import { EditPasswordPage } from "../pages/my-page/sidebar/EditPasswordPage";
import { AlumniPortfolioListPage } from "../pages/alumni/portfolio/AlumniPortfolioListPage";
import { AlumniPortfolioDetailPage } from "../pages/alumni/portfolio/AlumniPortfolioDetailPage";
import { ActivityWritePage } from "../pages/activity/WritePage";
import { ExternalActivityPostPage } from "../pages/activity/ExternalActivityPostPage";
import { RecruitDetailPage } from "../pages/activity/RecruitDetailPage";
import { RecruitWritePage } from "../pages/activity/RecruitWritePage";

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
                                path: "school-verification",
                                element: <AdminVerificationList />,
                            },
                            {
                                path: "school-verification/:id",
                                element: <AdminVerificationDetail />,
                            }
                            // todo 관리자 대외활동 등록 페이지도 추가
                        ]
                    },
                
                    {
                        path: "home",
                        children: [
                            {
                                index: true,
                                element: <HomePage />,
                            },
                            {
                                path: "notices",
                                element: <NotificationPage />,
                            },
                        ]
                    },
                    {
                        path: "alumni",
                        children: [
                            {
                                index: true,
                                element: <AlumniSearchPage />,
                            },
                            {
                                path: "profile",
                                children: [
                                    {
                                        path: ":id",
                                        element: <AlumniProfilePage />,
                                    },
                                    {
                                        path: ":id/portfolio",
                                        element: <AlumniPortfolioListPage />,
                                    },
                                    {
                                        path: ":id/portfolio/:portfolioId",
                                        element: <AlumniPortfolioDetailPage />,
                                    }
                                ]
                            },
                        ]
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
                        children: [
                            {
                                index: true,
                                element: <ActivityPage />,
                            },
                            {
                                path: "write",
                                element: <ActivityWritePage />,
                            },
                            {
                                path: "edit/:postId",
                                element: <ActivityWritePage />,
                            },
                            {
                                path: "internal/:postId",
                                element: <ActivityPostPage />,
                            },
                            {
                                path: "external/:postId",
                                element: <ExternalActivityPostPage />
                            },
                            {
                                path: "recruit/:recruitId",
                                element: <RecruitDetailPage/>
                            },
                            {
                                path:"recruit-write",
                                children: [
                                    {
                                        index: true,
                                        element: <RecruitWritePage/>
                                    },
                                    {
                                        path: ":recruitId",
                                        element: <RecruitWritePage/>
                                    }
                                ]
                            }
                        ]
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
                            {
                                path: "posts",
                                element: <MyPostsPage />
                            },
                            {
                                path: "bookmarks",
                                element: <MyBookmarksPage />
                            },
                            {
                                path: "settings",
                                children: [
                                    {
                                        index: true,
                                        element: <MySettingsPage/>
                                    },
                                    {
                                        path: "account",
                                        children: [
                                            {
                                                index: true,
                                                element: <AccountSettingsPage/>
                                            },
                                            {
                                                path: "password",
                                                element: <EditPasswordPage/>
                                            }
                                        ]
                                    },
                                    {
                                        path: "terms",
                                        element: <TermsPage/>
                                    }
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
                        children: [
                            {
                                index: true,
                                element: <ShopPage />,
                            },
                            {
                                path: ":productId",
                                element: <ShopDetailPage />,
                            },
                        ]
                    },
                    {
                        path: "community",
                        children: [
                            {
                                index: true,
                                element: <CommunityPage />,
                            },
                            {
                                path: "write",
                                element: <WritePage />,
                            },
                            {
                                path: "edit/:postId",
                                element: <WritePage />,
                            },
                            {
                                path: "post/:postId",
                                element: <CommunityPostPage />,
                            },
                        ]
                    },
                    {
                        path: "community/write",
                        element: <WritePage />,
                    },
                    {
                        path: "community/edit/:postId",
                        element: <WritePage />,
                    },
                ]
            },
        ]
    }
]);
