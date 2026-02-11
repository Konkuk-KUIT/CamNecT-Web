import { useEffect, useState } from 'react';

// 1. 브라우저가 보내주는 '설치 이벤트' Interface
interface BeforeInstallPromptEvent extends Event {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const usePwaInstall = () => {
    // 브라우저의 설치 권한 이벤트를 저장할 상태
    const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);

    useEffect(() => {
        const handleBeforeInstall = (e: Event) => {
            e.preventDefault(); // 브라우저가 설치 권한 이벤트를 처리하지 않도록 

            setDeferredPrompt(e as BeforeInstallPromptEvent); // 설치 권한 이벤트를 저장
        };

        // 브라우저가 설치 권한 이벤트를 발생시킬 때 실행
        window.addEventListener('beforeinstallprompt', handleBeforeInstall);

        return () => {
            // 컴포넌트가 언마운트 될 때 이벤트 리스너 제거
            window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
        };
    }, []);

    return { 
        deferredPrompt, 
        clearPrompt: () => setDeferredPrompt(null) 
    };
};