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

        // PWA 설치 이벤트 감지 및 상태에 보관
        const handleBeforeInstall = (e: Event) => {
            e.preventDefault(); // 브라우저의 기본 팝업 방지
            setDeferredPrompt(e as BeforeInstallPromptEvent); // 이벤트 저장
        };

        // 브라우저 전체의 beforeinstallprompt 이벤트 감지
        window.addEventListener('beforeinstallprompt', handleBeforeInstall);

        return () => {
            window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
        };
    }, []);

    // PWA 설치 팝업 띄우기
    const install = async () => {
        if (!deferredPrompt) {
            console.warn("PWA 설치 불가");
            return;
        }

        // 설치 팝업 표시
        await deferredPrompt.prompt();
        
        // 유저 선택 결과 확인
        const { outcome } = await deferredPrompt.userChoice;
        console.log(`설치 결과: ${outcome}`);

        // 사용 완료 후 초기화 (한 번만 사용 가능)
        setDeferredPrompt(null);
    };

    return { 
        isInstallable: !!deferredPrompt, // !!: 강제로 boolean 값으로 변환
        install, 
        clearPrompt: () => setDeferredPrompt(null) 
    };
};