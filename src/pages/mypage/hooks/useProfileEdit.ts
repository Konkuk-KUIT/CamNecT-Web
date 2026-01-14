import { useState, useEffect, useMemo } from "react";
import { MOCK_PROFILE_DETAIL_BY_UID } from "../../../mock/mypages";
import { MOCK_PORTFOLIOS_BY_OWNER_ID } from "../../../mock/portfolio";

export function useProfileEdit(userId: string) {

    const meDetail = MOCK_PROFILE_DETAIL_BY_UID[userId];
    
    const [originalData] = useState(() => ({
        user: meDetail.user,
        educations: meDetail.educations,
        careers: meDetail.careers,
        certificates: meDetail.certificates,
        portfolios: MOCK_PORTFOLIOS_BY_OWNER_ID[userId] ?? [],
        showFollowPublic: true
    }));
    
    const [data, setData] = useState({
        user: meDetail.user,
        educations: meDetail.educations,
        careers: meDetail.careers,
        certificates: meDetail.certificates,
        portfolios: MOCK_PORTFOLIOS_BY_OWNER_ID[userId] ?? [],
        showFollowPublic: true
    });

    const hasChanges = useMemo(() => 
        JSON.stringify(data) !== JSON.stringify(originalData),
        [data, originalData]
    );

    const handleSave = () => {
        if (!hasChanges) return;
        console.log('Profile saved:', data);
        alert("프로필이 저장되었습니다!");
    };

    return { 
        data, 
        setData, 
        hasChanges, 
        handleSave,
        meDetail
    };
}