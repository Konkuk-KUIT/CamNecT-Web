import ActivityListTab from './ActivityListTab';
import type { ActivityPost } from '../../../types/activityPost';

type JobTabProps = {
  posts: ActivityPost[];
};

const JobTab = ({ posts }: JobTabProps) => {
  return <ActivityListTab posts={posts} showWriteButton={false} />;
};

export default JobTab;
