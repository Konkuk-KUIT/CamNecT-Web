import ActivityListTab from './ActivityListTab';

type ClubTabProps = {
  searchQuery?: string;
};

const ClubTab = ({ searchQuery }: ClubTabProps) => {
  return <ActivityListTab showRecruitStatus tab='club' searchQuery={searchQuery} />;
};

export default ClubTab;