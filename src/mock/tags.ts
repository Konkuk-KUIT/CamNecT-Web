//mock 데이터

export interface Tag {
    id: string;
    name: string;
    category: 'field_major' | 'job_skill' | 'activity_spec' | 'certificate_interest' | 'community';
}

// 태그 카테고리
export const TAG_CATEGORIES = [
    {
        id: 'field_major',
        name: '전공 및 학업',
        tags: [
            { id: 'field_major_15', name: '경영학', category: 'field_major' },
            { id: 'field_major_16', name: '경제학', category: 'field_major' },
            { id: 'field_major_17', name: '심리학', category: 'field_major' },
            { id: 'field_major_18', name: '컴퓨터공학', category: 'field_major' },
            { id: 'field_major_19', name: '디자인', category: 'field_major' },
            { id: 'field_major_20', name: '미디어학', category: 'field_major' },
            { id: 'field_major_21', name: '정치외교', category: 'field_major' },
            { id: 'field_major_22', name: '법학', category: 'field_major' },
            { id: 'field_major_23', name: '교육학', category: 'field_major' },
            { id: 'field_major_24', name: '간호학', category: 'field_major' },
            { id: 'field_major_25', name: '의학', category: 'field_major' },
            { id: 'field_major_26', name: '약학', category: 'field_major' },
            { id: 'field_major_27', name: '생명공학', category: 'field_major' },
            { id: 'field_major_28', name: '화학공학', category: 'field_major' },
            { id: 'field_major_29', name: '기계공학', category: 'field_major' },
            { id: 'field_major_30', name: '건축학', category: 'field_major' },
            { id: 'field_major_31', name: '통계학', category: 'field_major' },
            { id: 'field_major_32', name: '사회학', category: 'field_major' },
            { id: 'field_major_33', name: '철학', category: 'field_major' },
            { id: 'field_major_34', name: '국어국문', category: 'field_major' }
        ] as Tag[]
    },
    {
        id: 'job_skill',
        name: '직무 및 기술·스킬',
        tags: [
            { id: 'job_skill_46', name: '기획', category: 'job_skill' },
            { id: 'job_skill_47', name: '서비스기획', category: 'job_skill' },
            { id: 'job_skill_48', name: 'PM', category: 'job_skill' },
            { id: 'job_skill_49', name: 'PO', category: 'job_skill' },
            { id: 'job_skill_50', name: '마케팅', category: 'job_skill' },
            { id: 'job_skill_51', name: '데이터분석', category: 'job_skill' },
            { id: 'job_skill_52', name: '프론트엔드', category: 'job_skill' },
            { id: 'job_skill_53', name: '백엔드', category: 'job_skill' },
            { id: 'job_skill_54', name: 'iOS개발', category: 'job_skill' },
            { id: 'job_skill_55', name: '안드로이드개발', category: 'job_skill' },
            { id: 'job_skill_56', name: 'AI/딥러닝', category: 'job_skill' },
            { id: 'job_skill_57', name: 'UI/UX디자인', category: 'job_skill' },
            { id: 'job_skill_58', name: '영상편집', category: 'job_skill' },
            { id: 'job_skill_59', name: '브랜딩', category: 'job_skill' },
            { id: 'job_skill_60', name: '광고PR', category: 'job_skill' },
            { id: 'job_skill_61', name: '영업', category: 'job_skill' },
            { id: 'job_skill_62', name: '인사(HR)', category: 'job_skill' },
            { id: 'job_skill_63', name: '회계/재무', category: 'job_skill' },
            { id: 'job_skill_64', name: '전략컨설팅', category: 'job_skill' },
            { id: 'job_skill_65', name: '공기업준비', category: 'job_skill' }
        ] as Tag[]
    },
    {
        id: 'activity_spec',
        name: '대외활동 및 스펙',
        tags: [
            { id: 'activity_spec_77', name: '공모전', category: 'activity_spec' },
            { id: 'activity_spec_78', name: '대외활동', category: 'activity_spec' },
            { id: 'activity_spec_79', name: '서포터즈', category: 'activity_spec' },
            { id: 'activity_spec_80', name: '동아리', category: 'activity_spec' },
            { id: 'activity_spec_81', name: '학생회', category: 'activity_spec' },
            { id: 'activity_spec_82', name: '연합동아리', category: 'activity_spec' },
            { id: 'activity_spec_83', name: '봉사활동', category: 'activity_spec' },
            { id: 'activity_spec_84', name: '인턴십', category: 'activity_spec' },
            { id: 'activity_spec_85', name: '교환학생', category: 'activity_spec' },
            { id: 'activity_spec_86', name: '어학연수', category: 'activity_spec' },
            { id: 'activity_spec_87', name: '학부연구생', category: 'activity_spec' },
            { id: 'activity_spec_88', name: '창업', category: 'activity_spec' },
            { id: 'activity_spec_89', name: '해커톤', category: 'activity_spec' },
            { id: 'activity_spec_90', name: '멘토링', category: 'activity_spec' },
            { id: 'activity_spec_91', name: '교육봉사', category: 'activity_spec' }
        ] as Tag[]
    },
    {
        id: 'certificate_interest',
        name: '자격증 및 어학',
        tags: [
            { id: 'certificate_interest_92', name: '토익', category: 'certificate_interest' },
            { id: 'certificate_interest_93', name: '토플', category: 'certificate_interest' },
            { id: 'certificate_interest_94', name: '오픽', category: 'certificate_interest' },
            { id: 'certificate_interest_95', name: '토스', category: 'certificate_interest' },
            { id: 'certificate_interest_96', name: '정보처리기사', category: 'certificate_interest' },
            { id: 'certificate_interest_97', name: 'ADsP', category: 'certificate_interest' },
            { id: 'certificate_interest_98', name: 'SQLD', category: 'certificate_interest' },
            { id: 'certificate_interest_99', name: '컴활', category: 'certificate_interest' },
            { id: 'certificate_interest_100', name: '한국사', category: 'certificate_interest' },
            { id: 'certificate_interest_101', name: 'CPA', category: 'certificate_interest' },
            { id: 'certificate_interest_102', name: '로스쿨(LEET)', category: 'certificate_interest' },
            { id: 'certificate_interest_103', name: '공무원시험', category: 'certificate_interest' },
            { id: 'certificate_interest_104', name: '제2외국어', category: 'certificate_interest' },
            { id: 'certificate_interest_105', name: '포토샵/일러', category: 'certificate_interest' },
            { id: 'certificate_interest_106', name: '파이썬', category: 'certificate_interest' }
        ] as Tag[]
    },
    {
        id: 'community',
        name: '커뮤니티',
        tags: [
            { id: 'community_107', name: '취업', category: 'community' },
            { id: 'community_108', name: '이직', category: 'community' },
            { id: 'community_109', name: '면접', category: 'community' },
            { id: 'community_110', name: '포트폴리오', category: 'community' },
            { id: 'community_111', name: '백엔드', category: 'community' },
            { id: 'community_112', name: '교환학생', category: 'community' },
            { id: 'community_113', name: '어학', category: 'community' },
            { id: 'community_114', name: '코딩테스트', category: 'community' },
            { id: 'community_115', name: '피드백', category: 'community' },
            { id: 'community_116', name: '진로', category: 'community' },
            { id: 'community_117', name: '멘토링', category: 'community' },
            { id: 'community_118', name: '인턴', category: 'community' },
            { id: 'community_119', name: '글로벌', category: 'community' },
            { id: 'community_120', name: '프로젝트', category: 'community' },
            { id: 'community_121', name: '연구실', category: 'community' },
            { id: 'community_122', name: '디자인', category: 'community' }
        ] as Tag[]
    }
];

export const MOCK_ALL_TAGS: Tag[] = TAG_CATEGORIES.flatMap(category => category.tags);
