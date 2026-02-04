import ActivityListTab from './ActivityListTab';
import type { ActivityPost } from '../../../types/activityPost';

type ExternalTabProps = {
  posts: ActivityPost[];
};

const ExternalTab = ({ posts }: ExternalTabProps) => {
  return <ActivityListTab posts={posts} showWriteButton={false} />;
};

export default ExternalTab;
