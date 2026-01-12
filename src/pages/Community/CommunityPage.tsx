import { useMemo, useState } from 'react';
import Icon from '../../components/Icon';
import { Tabs, type TabItem } from '../../components/Tabs';
import MainLayout from '../../layouts/MainLayout';
import InfoTab from './tabs/InfoTab';
import MainTab from './tabs/MainTab';
import QuestionTab from './tabs/QuestionTab';
import { infoPosts, loggedInUserMajor, questionPosts } from './data';

const tabItems: TabItem[] = [
  { id: 'all', label: '전체' },
  { id: 'info', label: '정보' },
  { id: 'question', label: '질문' },
];

const Community = () => {
  const [activeTab, setActiveTab] = useState<string>(tabItems[0].id);

  // 미리 가공된 파생 데이터 (동문 정보, 미답변 질문)을 메모이즈
  const alumniInfos = useMemo(
    () => infoPosts.filter((post) => post.author.isAlumni),
    [],
  );

  const unansweredQuestions = useMemo(
    () => questionPosts.filter((post) => post.answers === 0),
    [],
  );

  // 현재 탭에 맞는 화면 반환
  const renderTab = () => {
    if (activeTab === 'info') return <InfoTab posts={infoPosts} />;
    if (activeTab === 'question') return <QuestionTab posts={questionPosts} />;
    return (
      <MainTab
        userMajor={loggedInUserMajor}
        alumniInfos={alumniInfos}
        unansweredQuestions={unansweredQuestions}
      />
    );
  };

  return (
    //TODO: 각 탭별로 search 기능 구현 
    <MainLayout
      title='커뮤니티'
      rightElement={activeTab === 'all' ? undefined : <Icon name='search' />}
    >
      <div className='bg-white'>
        <Tabs tabs={tabItems} activeId={activeTab} onChange={setActiveTab} />
      </div>

      <div>{renderTab()}</div>
    </MainLayout>
  );
};

export default Community;
