import Card from '../../../components/Card';
import Category from '../../../components/Category';
import Icon from '../../../components/Icon';


type RecommendBoxProps = {
    name: string;
    profileImage?: string;
    major: string;
    studentId: string;
    intro: string;
    categories: string[];
};

function RecommendBox({ name, profileImage, major, studentId, intro, categories }: RecommendBoxProps) {
    return (
        //TODO: 동문추천 page 라우터 연결
        <Card
            width='100%'
            height='auto'
            className='flex min-h-[147px] items-start justify-between px-4 py-[15px] [container-type:inline-size]'
        >
            {/* 그룹 1: 프로필 + 정보 */}
            <div className='flex min-w-0 flex-1 items-start gap-[15px]'>
                {profileImage ? (
                    <img
                        src={profileImage}
                        alt={`${name} 프로필`}
                        className='shrink-0 rounded-full object-cover'
                        style={{ width: 'clamp(44px, 12cqw, 54px)', height: 'clamp(44px, 12cqw, 54px)' }}
                    />
                ) : (
                    <div
                        className='shrink-0 rounded-full bg-[#D5D5D5]'
                        style={{
                            width: 'clamp(44px, 12cqw, 54px)',
                            height: 'clamp(44px, 12cqw, 54px)',
                        }}
                        aria-hidden
                    />
                )}
                <div className='flex min-w-0 flex-1 flex-col items-start gap-[5px]'>
                    <p
                        className='text-gray-900 tracking-[-0.04em]'
                        style={{ fontSize: 'clamp(15px, 4cqw, 18px)', lineHeight: '1.35', fontWeight: 600 }}
                    >
                        {name}
                    </p>
                    <p
                        className='text-gray-750 tracking-[-0.04em]'
                        style={{ fontSize: 'clamp(12px, 3.2cqw, 14px)', lineHeight: '1.35', fontWeight: 600 }}
                    >
                        {major} {studentId}학번
                    </p>
                    <p
                        className='text-gray-750 tracking-[-0.02em]'
                        style={{ fontSize: 'clamp(11px, 3cqw, 12px)', lineHeight: '1.4' }}
                    >
                        {intro}
                    </p>
                    <div className='flex flex-wrap gap-[5px]'>
                        {categories.map((category, index) => (
                            <Category key={`${name}-${category}-${index}`} label={category} />
                        ))}
                    </div>
                </div>
            </div>

            {/*TODO: 동문 상세 프로필 페이지 라우터 연결*/}
            <div className='flex shrink-0 flex-col items-end'>
                <Icon
                    name='transmit'
                    style={{ width: 'clamp(18px, 3.8cqw, 24px)', height: 'clamp(18px, 3.8cqw, 24px)' }}
                />
            </div>
        </Card>

    )
}

export type { RecommendBoxProps };
export default RecommendBox;
