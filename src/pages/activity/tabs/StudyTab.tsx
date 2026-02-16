import ActivityListTab from './ActivityListTab';

type StudyTabProps = {
  searchQuery?: string;
};

const StudyTab = ({ searchQuery }: StudyTabProps) => {
  return <ActivityListTab showRecruitStatus tab='study' searchQuery={searchQuery} />;
};

export default StudyTab;