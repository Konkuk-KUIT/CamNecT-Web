import ActivityListTab from './ActivityListTab';
import type { ActivityPost } from '../../../types/activityPage/activityPageTypes';

type JobTabProps = {
  posts: ActivityPost[];
  isAdmin?:boolean;
};

const JobTab = ({ posts, isAdmin }: JobTabProps) => {
  return <ActivityListTab posts={posts} isAdmin={isAdmin} tab="job"/>;
};

export default JobTab;
