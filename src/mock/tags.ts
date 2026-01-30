//mock 데이터

export interface Tag {
    id: string;
    name: string;
    category: 'field_major' | 'job_skill' | 'activity_spec' | 'certificate_interest';
}

// 태그 카테고리
export const TAG_CATEGORIES = [
    {
        id: 'field_major',
        name: '전공 및 학업',
        tags: [
            { id: 'field_major_1', name: '경영학', category: 'field_major' },
            { id: 'field_major_2', name: '경제학', category: 'field_major' },
            { id: 'field_major_3', name: '심리학', category: 'field_major' },
            { id: 'field_major_4', name: '컴퓨터공학', category: 'field_major' },
            { id: 'field_major_5', name: '디자인', category: 'field_major' },
            { id: 'field_major_6', name: '미디어학', category: 'field_major' },
            { id: 'field_major_7', name: '정치외교', category: 'field_major' },
            { id: 'field_major_8', name: '법학', category: 'field_major' },
            { id: 'field_major_9', name: '교육학', category: 'field_major' },
            { id: 'field_major_10', name: '간호학', category: 'field_major' },
            { id: 'field_major_11', name: '의학', category: 'field_major' },
            { id: 'field_major_12', name: '약학', category: 'field_major' },
            { id: 'field_major_13', name: '생명공학', category: 'field_major' },
            { id: 'field_major_14', name: '화학공학', category: 'field_major' },
            { id: 'field_major_15', name: '기계공학', category: 'field_major' },
            { id: 'field_major_16', name: '건축학', category: 'field_major' },
            { id: 'field_major_17', name: '통계학', category: 'field_major' },
            { id: 'field_major_18', name: '사회학', category: 'field_major' },
            { id: 'field_major_19', name: '철학', category: 'field_major' },
            { id: 'field_major_20', name: '국어국문', category: 'field_major' }
        ] as Tag[]
    },
    {
        id: 'job_skill',
        name: '직무 및 기술·스킬',
        tags: [
            { id: 'job_skill_1', name: '기획', category: 'job_skill' },
            { id: 'job_skill_2', name: '서비스기획', category: 'job_skill' },
            { id: 'job_skill_3', name: 'PM', category: 'job_skill' },
            { id: 'job_skill_4', name: 'PO', category: 'job_skill' },
            { id: 'job_skill_5', name: '마케팅', category: 'job_skill' },
            { id: 'job_skill_6', name: '데이터분석', category: 'job_skill' },
            { id: 'job_skill_7', name: '프론트엔드', category: 'job_skill' },
            { id: 'job_skill_8', name: '백엔드', category: 'job_skill' },
            { id: 'job_skill_9', name: 'iOS개발', category: 'job_skill' },
            { id: 'job_skill_10', name: '안드로이드개발', category: 'job_skill' },
            { id: 'job_skill_11', name: 'AI/딥러닝', category: 'job_skill' },
            { id: 'job_skill_12', name: 'UI/UX디자인', category: 'job_skill' },
            { id: 'job_skill_13', name: '영상편집', category: 'job_skill' },
            { id: 'job_skill_14', name: '브랜딩', category: 'job_skill' },
            { id: 'job_skill_15', name: '광고PR', category: 'job_skill' },
            { id: 'job_skill_16', name: '영업', category: 'job_skill' },
            { id: 'job_skill_17', name: '인사(HR)', category: 'job_skill' },
            { id: 'job_skill_18', name: '회계/재무', category: 'job_skill' },
            { id: 'job_skill_19', name: '전략컨설팅', category: 'job_skill' },
            { id: 'job_skill_20', name: '공기업준비', category: 'job_skill' }
        ] as Tag[]
    },
    {
        id: 'activity_spec',
        name: '대외활동 및 스펙',
        tags: [
            { id: 'activity_spec_1', name: '공모전', category: 'activity_spec' },
            { id: 'activity_spec_2', name: '대외활동', category: 'activity_spec' },
            { id: 'activity_spec_3', name: '서포터즈', category: 'activity_spec' },
            { id: 'activity_spec_4', name: '동아리', category: 'activity_spec' },
            { id: 'activity_spec_5', name: '학생회', category: 'activity_spec' },
            { id: 'activity_spec_6', name: '연합동아리', category: 'activity_spec' },
            { id: 'activity_spec_7', name: '봉사활동', category: 'activity_spec' },
            { id: 'activity_spec_8', name: '인턴십', category: 'activity_spec' },
            { id: 'activity_spec_9', name: '교환학생', category: 'activity_spec' },
            { id: 'activity_spec_10', name: '어학연수', category: 'activity_spec' },
            { id: 'activity_spec_11', name: '학부연구생', category: 'activity_spec' },
            { id: 'activity_spec_12', name: '창업', category: 'activity_spec' },
            { id: 'activity_spec_13', name: '해커톤', category: 'activity_spec' },
            { id: 'activity_spec_14', name: '멘토링', category: 'activity_spec' },
            { id: 'activity_spec_15', name: '교육봉사', category: 'activity_spec' }
        ] as Tag[]
    },
    {
        id: 'certificate_interest',
        name: '자격증 및 어학',
        tags: [
            { id: 'certificate_interest_1', name: '토익', category: 'certificate_interest' },
            { id: 'certificate_interest_2', name: '토플', category: 'certificate_interest' },
            { id: 'certificate_interest_3', name: '오픽', category: 'certificate_interest' },
            { id: 'certificate_interest_4', name: '토스', category: 'certificate_interest' },
            { id: 'certificate_interest_5', name: '정보처리기사', category: 'certificate_interest' },
            { id: 'certificate_interest_6', name: 'ADsP', category: 'certificate_interest' },
            { id: 'certificate_interest_7', name: 'SQLD', category: 'certificate_interest' },
            { id: 'certificate_interest_8', name: '컴활', category: 'certificate_interest' },
            { id: 'certificate_interest_9', name: '한국사', category: 'certificate_interest' },
            { id: 'certificate_interest_10', name: 'CPA', category: 'certificate_interest' },
            { id: 'certificate_interest_11', name: '로스쿨(LEET)', category: 'certificate_interest' },
            { id: 'certificate_interest_12', name: '공무원시험', category: 'certificate_interest' },
            { id: 'certificate_interest_13', name: '제2외국어', category: 'certificate_interest' },
            { id: 'certificate_interest_14', name: '포토샵/일러', category: 'certificate_interest' },
            { id: 'certificate_interest_15', name: '파이썬', category: 'certificate_interest' }
        ] as Tag[]
    },
    {
        id: 'community',
        name: '커뮤니티',
        tags: [
            { id: 'community_1', name: '취업', category: 'community' },
            { id: 'community_2', name: '이직', category: 'community' },
            { id: 'community_3', name: '면접', category: 'community' },
            { id: 'community_4', name: '포트폴리오', category: 'community' },
            { id: 'community_5', name: '백엔드', category: 'community' },
            { id: 'community_6', name: '교환학생', category: 'community' },
            { id: 'community_7', name: '어학', category: 'community' },
            { id: 'community_8', name: '코딩테스트', category: 'community' },
            { id: 'community_9', name: '피드백', category: 'community' },
            { id: 'community_10', name: '진로', category: 'community' },
            { id: 'community_11', name: '멘토링', category: 'community' },
            { id: 'community_12', name: '인턴', category: 'community' },
            { id: 'community_13', name: '글로벌', category: 'community' },
            { id: 'community_14', name: '프로젝트', category: 'community' },
            { id: 'community_15', name: '연구실', category: 'community' },
            { id: 'community_16', name: '디자인', category: 'community' }
        ] as Tag[]
    }
];

export const MOCK_ALL_TAGS: Tag[] = TAG_CATEGORIES.flatMap(category => category.tags);
