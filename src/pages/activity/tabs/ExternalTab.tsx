import ActivityListTab from './ActivityListTab';
import type { ActivityPost } from '../../../types/activityPage/activityPageTypes';

type ExternalTabProps = {
  posts: ActivityPost[];
  isAdmin?:boolean;
};

const ExternalTab = ({ posts, isAdmin }: ExternalTabProps) => {
  return <ActivityListTab posts={posts} isAdmin={isAdmin} tab="external"/>;
};

export default ExternalTab;
