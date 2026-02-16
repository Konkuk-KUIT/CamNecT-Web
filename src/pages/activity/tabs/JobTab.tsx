import ActivityListTab from './ActivityListTab';

type JobTabProps = {
  isAdmin?: boolean;
  searchQuery?: string;
};

const JobTab = ({ isAdmin, searchQuery }: JobTabProps) => {
  return <ActivityListTab isAdmin={isAdmin} tab='job' searchQuery={searchQuery} />;
};

export default JobTab;