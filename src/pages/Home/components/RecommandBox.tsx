import Card from '../../../components/Card';
import Category from '../../../components/Category';
import Icon from '../../../components/Icon';

type RecommandBoxProps = {
    name: string;
    profileImage?: string;
    major: string;
    studentId: string;
    intro: string;
    categories: string[];
};

function RecommandBox({ name, profileImage, major, studentId, intro, categories }: RecommandBoxProps) {
    return (
        <Card
            width='325px'
            height='auto'
            style={{ minHeight: '147px' }}
            className='flex items-start justify-between px-4 py-[15px]'
        >
            {/* 그룹 1: 프로필 + 정보 */}
            <div className='flex items-start gap-[15px]'>
                {profileImage ? (
                    <img
                        src={profileImage}
                        alt={`${name} 프로필`}
                        className='w-[54px] h-[54px] shrink-0 rounded-full object-cover'
                    />
                ) : (
                    <div className='w-[54px] h-[54px] shrink-0 rounded-full bg-gray-300' aria-hidden />
                )}
                <div className='flex flex-col items-start gap-[5px] w-[205px]'>
                    <p
                        style={{
                            fontFamily: 'Pretendard',
                            fontWeight: 600,
                            fontStyle: 'thin',
                            fontSize: '18px',
                            lineHeight: '140%',
                            letterSpacing: '-0.04em',
                        }}
                    >
                        {name}
                    </p>
                    <p
                        style={{
                            fontFamily: 'Pretendard',
                            fontWeight: 600,
                            fontStyle: 'thin',
                            fontSize: '14px',
                            lineHeight: '140%',
                            letterSpacing: '-0.04em',
                            color: 'var(--color-gray-750)',
                        }}
                    >
                        {major} {studentId}학번
                    </p>
                    <p
                        style={{
                            fontFamily: 'Pretendard',
                            fontWeight: 400,
                            fontStyle: 'thin',
                            fontSize: '12px',
                            lineHeight: '140%',
                            letterSpacing: '-0.24px',
                            color: 'var(--ColorGray3, #646464)',
                        }}
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

            {/* 그룹 2: 전송버튼 -> 나중에 라우터 연결*/}
            <div className='flex flex-col items-end'>
                <Icon name='transmit' className='w-[18px] h-[18px]' />
            </div>
        </Card>

    )
}

export type { RecommandBoxProps };
export default RecommandBox;
