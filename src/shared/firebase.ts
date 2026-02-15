import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getInstallations } from "firebase/installations";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Firebase App 초기화
const app = initializeApp(firebaseConfig);

// messaging(푸시알림) 및 설치 (FID 발급용) 객체
export const messaging = getMessaging(app);
export const installations = getInstallations(app);

export default app;