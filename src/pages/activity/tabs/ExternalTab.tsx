import ActivityListTab from './ActivityListTab';
import type { ActivityPost } from '../../../types/activityPage/activityPageTypes';

type ExternalTabProps = {
  posts: ActivityPost[];
};

const ExternalTab = ({ posts }: ExternalTabProps) => {
  return <ActivityListTab posts={posts} showWriteButton={false} tab="external"/>;
};

export default ExternalTab;
