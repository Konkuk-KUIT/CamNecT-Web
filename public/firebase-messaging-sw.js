// 1. Firebase SDK 라이브러리 가져오기 (Service Worker용)
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js");

// Firebase 초기화 
// public 폴더는 .env를 읽을 수 없음
const firebaseConfig = {
    apiKey: "AIzaSyDKm54MixjuhZcHwoT802Vk9ZT5crgdeZs",
    authDomain: "camnect-2f279.firebaseapp.com",
    projectId: "camnect-2f279",
    storageBucket: "camnect-2f279.firebasestorage.app",
    messagingSenderId: "762216197891",
    appId: "1:762216197891:web:3b0b6bb843238f49c74336",
    measurementId: "G-LNCBSSCV0M"
};

firebase.initializeApp(firebaseConfig);

// 3. 메시징 객체 생성
const messaging = firebase.messaging();

// todo 4,5번 이해할 것
// 4. 백그라운드 메시지 핸들러
messaging.onBackgroundMessage((payload) => {
    console.log('💤 [백그라운드] FCM 메시지 도착:', payload);
    
    // 알림 제목과 본문은 주로 payload.notification에서 가져옴
    const title = payload.notification?.title || "CamNecT";
    const body = payload.notification?.body || "새로운 알림이 도착했습니다.";
    
    const notificationOptions = {
        body: body,
        icon: '/icons/camnect1.png',
        badge: '/icons/camnect1.png',
        // 클릭 시 사용할 데이터들을 보관
        data: {
            link: payload.data?.link || '/',
            type: payload.data?.type,
            requestId: payload.data?.requestId
        }
    };
    
    self.registration.showNotification(title, notificationOptions);
});

// 5. 알림 클릭 이벤트 처리
self.addEventListener('notificationclick', function (event) {
    event.notification.close(); 

    const urlToOpen = event.notification.data?.link || '/';          

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
            // (A) 이미 우리 사이트가 탭에 하나라도 열려 있다면?
            if (clientList.length > 0) {
                let client = clientList[0];
                for (let i = 0; i < clientList.length; i++) {
                    if (clientList[i].focused) {
                        client = clientList[i];
                        break;
                    }
                }
                return client.navigate(urlToOpen).then(c => c.focus());
            }
            // (B) 우리 사이트가 전혀 열려있지 않다면?
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});