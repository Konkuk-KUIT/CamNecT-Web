// src/pages/mypage/hooks/useProfileEdit.ts

import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMyProfile } from "../../../api/profileApi";
import { getMajor, getInstitution } from "../../../api/institutionApi";
import { 
  mapToPortfolios, 
  mapToEducations, 
  mapToCareers, 
  mapToCertificates 
} from "../utils/profileMapper";
import { type ProfileEditData } from "../../../types/mypage/profileEditTypes";
import defaultProfileImg from "../../../assets/image/defaultProfileImg.png";

export function useProfileEdit(userId: number | null) {
    // 프로필 데이터 조회
    const { 
        data: profileResponse, 
        isLoading,
        isError 
    } = useQuery({
        queryKey: ["myProfile", userId],
        queryFn: () => getMyProfile({ loginUserId: userId! }),
        enabled: !!userId,
    });

    const profileData = profileResponse?.data;

    // 학교 정보 조회
    const { data: institutionResponse } = useQuery({
        queryKey: ["institution", profileData?.basics.institutionId],
        queryFn: () => getInstitution({
            institutionId: profileData!.basics.institutionId,
        }),
        enabled: !!profileData?.basics.institutionId,
    });

    // 전공 정보 조회
    const { data: majorResponse } = useQuery({
        queryKey: ["major", profileData?.basics.institutionId, profileData?.basics.majorId],
        queryFn: () => getMajor({
            institutionId: profileData!.basics.institutionId,
            majorId: profileData!.basics.majorId,
        }),
        enabled: !!profileData?.basics.institutionId && !!profileData?.basics.majorId,
    });

    // 원본 데이터 (API에서 가져온 초기 데이터)
    const [originalData, setOriginalData] = useState<ProfileEditData | null>(null);
    
    // 현재 수정 중인 데이터
    const [data, setData] = useState<ProfileEditData | null>(null);

    // 프로필 데이터가 로드되면 초기화
    useEffect(() => {
        if (!profileData) return;
        if (!institutionResponse?.data) return;
        if (!majorResponse?.data) return;
        if (originalData) return;
        
        const schoolName = institutionResponse?.data.nameKor || "";
        const majorName = majorResponse?.data.nameKor || "";
        
        const initialData: ProfileEditData = {
            user: {
                uid: profileData.userId.toString(),
                name: profileData.name,
                profileImg: profileData.basics.profileImageUrl || defaultProfileImg,
                univ: schoolName, 
                major: majorName,
                gradeNumber: profileData.basics.studentNo.slice(2, 4),
                userTags: profileData.tags.map(t => t.name),
                introduction: profileData.basics.bio || "",
                following: profileData.following,
                follower: profileData.following,
                point: 0,
            },
            visibility: {
                isFollowerVisible: profileData.basics.isFollowerVisible,
                educationVisibility: true, // 실제로는 API에서 가져와야 함
                careerVisibility: true,
                certificateVisibility: true,
            },
            educations: mapToEducations(profileData),
            careers: mapToCareers(profileData),
            certificates: mapToCertificates(profileData),
            portfolios: mapToPortfolios(profileData),
        }
        setOriginalData(initialData);
        setData(initialData);
    }, [profileData, institutionResponse?.data, majorResponse?.data, originalData]);

    // 변경사항 추적
    const hasChanges = useMemo(() => {
        if (!data || !originalData) return false;
        return JSON.stringify(data) !== JSON.stringify(originalData);
    }, [data, originalData]);

    return { 
        data, 
        setData, 
        hasChanges,
        originalData,
        isLoading,
        isError,
    };
}