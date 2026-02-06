import ActivityListTab from './ActivityListTab';
import type { ActivityPost } from '../../../types/activityPage/activityPageTypes';

type JobTabProps = {
  posts: ActivityPost[];
};

const JobTab = ({ posts }: JobTabProps) => {
  return <ActivityListTab posts={posts} showWriteButton={false} tab="job"/>;
};

export default JobTab;
