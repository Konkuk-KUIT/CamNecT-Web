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

// 4. 백그라운드 메시지 핸들러
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] 백그라운드 메시지 수신: ', payload);
    
    // 서버에서 보낸 데이터 
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/icons/camnect1.png', // 아이콘
    };
    
    // 브라우저 시스템 알림창 생성 
    self.registration.showNotification(notificationTitle, notificationOptions);
});