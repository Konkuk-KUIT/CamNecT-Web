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
        console.log('[ModalBackButton] Component mounted, setting up history');
        
        unmountingRef.current = false;
        
        // 히스토리 추가
        window.history.pushState({ modalOpen: true, timestamp: Date.now() }, '');

        const handlePopState = (e: PopStateEvent) => {
            console.log('[ModalBackButton] popstate event');
            console.log('[ModalBackButton] hasChanges:', hasChangesRef.current);
            console.log('[ModalBackButton] event state:', e.state);
            console.log('[ModalBackButton] unmounting:', unmountingRef.current);
            
            // unmounting 중이면 무시
            if (unmountingRef.current) {
                console.log('[ModalBackButton] Component unmounting, ignoring popstate');
                return;
            }
            
            // 모달 히스토리를 벗어난 경우
            if (!e.state?.modalOpen) {
                console.log('[ModalBackButton] Left modal history');
                
                if (hasChangesRef.current && onWarningRef.current) {
                    console.log('[ModalBackButton] Has changes, showing warning');
                    window.history.pushState({ modalOpen: true, timestamp: Date.now() }, '');
                    onWarningRef.current();
                } else {
                    console.log('[ModalBackButton] No changes, closing modal');
                    unmountingRef.current = true;
                    onCloseRef.current();
                }
            }
        };

        window.addEventListener('popstate', handlePopState);

        return () => {
            console.log('[ModalBackButton] Component unmounting');
            unmountingRef.current = true;
            
            window.removeEventListener('popstate', handlePopState);
            
            setTimeout(() => {
                if (window.history.state?.modalOpen) {
                    console.log('[ModalBackButton] Modal history still exists, removing');
                    window.history.back();
                }
            }, 0);
        };
    }, []);
};