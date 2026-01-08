import Category from '../../components/Category';
import type { InfoPost, QuestionPost } from './data';
import { formatTimeAgo } from './time';

type MainTabProps = {
  userMajor: string;
  alumniInfos: InfoPost[];
  unansweredQuestions: QuestionPost[];
};

const MainTab = ({ userMajor, alumniInfos, unansweredQuestions }: MainTabProps) => {
  return (
    <div className='flex flex-col bg-white' style={{ padding: '20px 25px', gap: '16px' }}>
      <section className='flex flex-col' style={{ gap: '8px' }}>
        <h2
          style={{
            color: 'var(--ColorBlack, #202023)',
            fontFamily: 'Pretendard',
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '150%',
          }}
        >
          나의 학부
        </h2>
        <div
          className='rounded-[10px]'
          style={{
            padding: '12px 14px',
            border: '1px solid var(--ColorGray1, #ECECEC)',
            background: 'var(--Color_Gray_B, #FCFCFC)',
            color: 'var(--ColorBlack, #202023)',
            fontFamily: 'Pretendard',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '140%',
          }}
        >
          {userMajor}
        </div>
      </section>

      <section className='flex flex-col' style={{ gap: '10px' }}>
        <div
          style={{
            color: 'var(--ColorBlack, #202023)',
            fontFamily: 'Pretendard',
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '150%',
          }}
        >
          동문 정보글
        </div>

        <div className='flex flex-col' style={{ gap: '12px' }}>
          {alumniInfos.map((post) => (
            <article
              key={post.id}
              className='flex flex-col'
              style={{
                gap: '8px',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid var(--Color_Gray_B, #FCFCFC)',
              }}
            >
              <div className='flex flex-wrap items-center' style={{ gap: '5px' }}>
                {post.categories.map((category) => (
                  <Category key={category} label={category} height={20} className='px-[6px]' />
                ))}
              </div>
              <div
                style={{
                  color: 'var(--ColorBlack, #202023)',
                  fontFamily: 'Pretendard',
                  fontWeight: 600,
                  fontSize: '15px',
                  lineHeight: '150%',
                }}
              >
                {post.title}
              </div>
              <div
                className='flex items-center gap-[8px]'
                style={{
                  color: 'var(--ColorGray2, #A1A1A1)',
                  fontFamily: 'Pretendard',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '140%',
                }}
              >
                <span>{post.author.major} {post.author.studentId}학번</span>
                <span>·</span>
                <span>{formatTimeAgo(post.createdAt)}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className='flex flex-col' style={{ gap: '10px' }}>
        <div
          style={{
            color: 'var(--ColorBlack, #202023)',
            fontFamily: 'Pretendard',
            fontWeight: 600,
            fontSize: '16px',
            lineHeight: '150%',
          }}
        >
          답변을 기다리는 질문
        </div>

        <div className='flex flex-col' style={{ gap: '12px' }}>
          {unansweredQuestions.map((question) => (
            <article
              key={question.id}
              className='flex flex-col'
              style={{
                gap: '6px',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid var(--Color_Gray_B, #FCFCFC)',
              }}
            >
              <div
                style={{
                  color: 'var(--ColorBlack, #202023)',
                  fontFamily: 'Pretendard',
                  fontWeight: 600,
                  fontSize: '15px',
                  lineHeight: '150%',
                }}
              >
                {question.title}
              </div>
              <div
                style={{
                  color: 'var(--ColorGray3, #646464)',
                  fontFamily: 'Pretendard',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '150%',
                }}
              >
                {question.content}
              </div>
              <div
                className='flex items-center gap-[8px]'
                style={{
                  color: 'var(--ColorGray2, #A1A1A1)',
                  fontFamily: 'Pretendard',
                  fontWeight: 400,
                  fontSize: '12px',
                  lineHeight: '140%',
                }}
              >
                <span>{question.author.major} {question.author.studentId}학번</span>
                <span>·</span>
                <span>{formatTimeAgo(question.createdAt)}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MainTab;
