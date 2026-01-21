import { useEffect, useRef } from 'react';

//뒤로가기를 모달 닫기로 연결하는 훅
export const useModalHistory = (
    onClose: () => void,
    hasChanges?: boolean,
    onWarning?: () => void
) => {
    const hasChangesRef = useRef(hasChanges);
    const onCloseRef = useRef(onClose);
    const onWarningRef = useRef(onWarning);
    const unmountingRef = useRef(false);

    // ref 업데이트
    useEffect(() => {
        hasChangesRef.current = hasChanges;
        onCloseRef.current = onClose;
        onWarningRef.current = onWarning;
    });

    useEffect(() => {
        unmountingRef.current = false;
        
        // 히스토리 추가
        window.history.pushState({ modalOpen: true, timestamp: Date.now() }, '');

        const handlePopState = (e: PopStateEvent) => {
            // unmounting 중이면 무시
            if (unmountingRef.current) {
                return;
            }
            
            // 모달 히스토리를 벗어난 경우
            if (!e.state?.modalOpen) {
                
                if (hasChangesRef.current && onWarningRef.current) {
                    window.history.pushState({ modalOpen: true, timestamp: Date.now() }, '');
                    onWarningRef.current();
                } else {
                    unmountingRef.current = true;
                    onCloseRef.current();
                }
            }
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            unmountingRef.current = true;
            
            window.removeEventListener('popstate', handlePopState);
            
            setTimeout(() => {
                if (window.history.state?.modalOpen) {
                    window.history.back();
                }
            }, 0);
        };
    }, []);
};