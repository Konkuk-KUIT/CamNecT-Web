//다른 url로 이동했을 때 맨 위로 스크롤

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
    const location = useLocation();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            window.scrollTo(0,0);
        }, 0)

        return () => clearTimeout(timeoutId)
    }, [location.pathname, location.key]);

    return null;
}