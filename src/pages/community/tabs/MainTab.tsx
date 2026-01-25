import { Link } from 'react-router-dom';
import Card from '../../../components/Card';
import Category from '../../../components/Category';
import MainBoxCarousel from '../components/MainBoxCarousel';
import type { InfoPost, QuestionPost } from '../data';
import { formatTimeAgo } from '../time';

type MainTabProps = {
  userMajor: string;
  alumniInfos: InfoPost[];
  unansweredQuestions: QuestionPost[];
};

// 메인 탭: 전공 히어로 + 동문 카드 + 미답변 질문 목록
const MainTab = ({ userMajor, alumniInfos, unansweredQuestions }: MainTabProps) => {
  return (
    <div>
      {/* 상단 히어로 영역: 전공 해시태그 + 안내 문구 + 캐러셀 */}
      <div className='flex flex-col bg-white' style={{ padding: '30px 0', gap: '25px' }}>
        <section className='flex flex-col' style={{ padding: '0 25px', gap: '3px' }}>
          {/* TODO: 사용자 전공 데이터 API 연동 후 실제 값 주입 */}
          <div className='text-b-20' style={{ color: 'var(--ColorMain, #00C56C)' }}>
            #{userMajor}
          </div>
          <div className='text-m-16' style={{ color: 'var(--ColorBlack, #202023)' }}>
            동문들의 경험과 조언을 확인해보세요!
          </div>
        </section>

        <section className='flex flex-col' style={{ gap: '12px' }}>
          {/* TODO: 알럼나이 정보 리스트 API 연결 */}
          {alumniInfos.length > 0 ? (
            <MainBoxCarousel items={alumniInfos} />
          ) : (
            <div
              className='flex flex-col items-center justify-center text-center'
              style={{ gap: '30px', height: 'clamp(165px, 35vw, 180px)' }}
            >
              <div className='text-sb-18' style={{ color: 'var(--ColorGray2, #A1A1A1)', whiteSpace: 'pre-line' }}>
                {'반가운 동문들과 나눌\n첫 소식을 기다리고 있어요.'}
              </div>
              <div className='text-m-14' style={{ color: 'var(--ColorGray2, #A1A1A1)' }}>
                지금 바로 정보를 공유해 보세요!
              </div>
            </div>
          )}
        </section>
      </div>

      <svg width="100%" height="40" viewBox="0 0 375 10" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0H375V10H0V0Z" fill="#ECECEC" />
      </svg>

      {/* 답변 대기 질문 섹션 */}
      <section className='flex flex-col bg-white' style={{ padding: '30px 25px', gap: '20px' }}>
        <div className='flex items-center' style={{ gap: '5px' }}>
          <div className='text-sb-20' style={{ color: 'var(--ColorBlack, #202023)' }}>
            답변을 기다리는 질문들
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M8.25 4.5L15.75 12L8.25 19.5" stroke="#646464" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <Card
          width="100%"
          height="flex"
          className="flex flex-col"
        >
          {/* TODO: 미답변 질문 리스트 API 연결 */}
          {unansweredQuestions.length > 0 ? (
            unansweredQuestions.map((question, index) => {
              const isLast = index === unansweredQuestions.length - 1;
              return (
                <Link key={question.id} to={`/community/post/${question.id}`} className='block'>
                  <div
                    className='flex flex-col'
                    style={{
                      padding: '15px 20px',
                      gap: '7px',
                      boxShadow: isLast
                        ? undefined
                        : 'inset 0 -1px 0 var(--ColorGray1, #ECECEC)',
                    }}
                  >
                    <div className='flex flex-wrap items-center' style={{ gap: '5px' }}>
                      {question.categories.map((category) => (
                        <Category key={category} label={category} className='px-[6px]' />
                      ))}
                    </div>

                    <div className='flex flex-col' style={{ gap: '3px' }}>
                      <div className='text-m-14' style={{ color: 'var(--ColorBlack, #202023)' }}>
                        {question.title}
                      </div>
                      <div
                        className='flex items-center justify-between text-r-12'
                        style={{ color: 'var(--ColorGray3, #646464)' }}
                      >
                        <span>답변 {question.answers}</span>
                        <span>{formatTimeAgo(question.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })
          ) : (
            <div
              className='flex flex-col items-center justify-center text-center'
              style={{ gap: '30px', height: 'clamp(120px, 25vw, 165px)' }}
            >
              <div className='text-sb-18' style={{ color: 'var(--ColorGray2, #A1A1A1)' }}>
                모든 질문의 궁금증이 풀렸어요
              </div>
              <div className='text-m-14' style={{ color: 'var(--ColorGray2, #A1A1A1)' }}>
                동문들의 지혜가 필요한 새로운 질문을 등록해 보세요
              </div>
            </div>
          )}
        </Card>
      </section>
    </div>
  );
};

export default MainTab;
