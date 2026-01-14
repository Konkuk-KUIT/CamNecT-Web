// mock 데이터
export interface Tag {
    id: string;
    name: string;
    category: 'major' | 'interest' | 'career' | 'etc';
}

export const MOCK_ALL_TAGS: Tag[] = [
    // 학업 (분야)
    { id: 'tag_1', name: 'UX/UI', category: 'major' },
    { id: 'tag_2', name: '공부', category: 'major' },
    { id: 'tag_3', name: '시험', category: 'major' },
    { id: 'tag_4', name: '과제', category: 'major' },
    { id: 'tag_5', name: '프로젝트', category: 'major' },
    { id: 'tag_6', name: '발표', category: 'major' },
    { id: 'tag_7', name: '디자인', category: 'major' },
    { id: 'tag_8', name: '개발', category: 'major' },
    { id: 'tag_9', name: '마케팅', category: 'major' },
    { id: 'tag_10', name: '경영', category: 'major' },
    
    // 대외 활동 (관심사)
    { id: 'tag_11', name: '동아리', category: 'interest' },
    { id: 'tag_12', name: '멘토링', category: 'interest' },
    { id: 'tag_13', name: '팀플 모집', category: 'interest' },
    { id: 'tag_14', name: '스터디', category: 'interest' },
    { id: 'tag_15', name: '공모전', category: 'interest' },
    { id: 'tag_16', name: '대외활동', category: 'interest' },
    { id: 'tag_17', name: '봉사', category: 'interest' },
    { id: 'tag_18', name: '교환학생', category: 'interest' },
    { id: 'tag_19', name: '인턴', category: 'interest' },
    { id: 'tag_20', name: '해커톤', category: 'interest' },
    
    // 진로
    { id: 'tag_21', name: '취업', category: 'career' },
    { id: 'tag_22', name: '창업', category: 'career' },
    { id: 'tag_23', name: '스펙', category: 'career' },
    { id: 'tag_24', name: '포트폴리오', category: 'career' },
    { id: 'tag_25', name: '자기소개서', category: 'career' },
    { id: 'tag_26', name: '면접', category: 'career' },
    { id: 'tag_27', name: '이력서', category: 'career' },
    { id: 'tag_28', name: '대학원', category: 'career' },
    { id: 'tag_29', name: '유학', category: 'career' },
    { id: 'tag_30', name: '자격증', category: 'career' },
    
    // 기타
    { id: 'tag_31', name: '정보', category: 'etc' },
    { id: 'tag_32', name: '학과 이슈', category: 'etc' },
    { id: 'tag_33', name: '기타', category: 'etc' },
    { id: 'tag_34', name: '친목', category: 'etc' },
    { id: 'tag_35', name: '질문', category: 'etc' },
    { id: 'tag_36', name: '경영경제', category: 'etc' },
    { id: 'tag_37', name: '후기', category: 'etc' },
    { id: 'tag_38', name: '추천', category: 'etc' },
    { id: 'tag_39', name: '피그마', category: 'etc' },
];

export const TAG_CATEGORIES = [
    { id: 'major', name: '학업', tags: MOCK_ALL_TAGS.filter(t => t.category === 'major') },
    { id: 'interest', name: '대외 활동', tags: MOCK_ALL_TAGS.filter(t => t.category === 'interest') },
    { id: 'career', name: '진로', tags: MOCK_ALL_TAGS.filter(t => t.category === 'career') },
    { id: 'etc', name: '기타', tags: MOCK_ALL_TAGS.filter(t => t.category === 'etc') },
];