import ActivityListTab from './ActivityListTab';

type ExternalTabProps = {
  isAdmin?: boolean;
  searchQuery?: string;
};

const ExternalTab = ({ isAdmin, searchQuery }: ExternalTabProps) => {
  return <ActivityListTab isAdmin={isAdmin} tab='external' searchQuery={searchQuery} />;
};

export default ExternalTab;