import ActivityListTab from './ActivityListTab';
import type { ActivityPost } from '../../../types/activityPage/activityPageTypes';

type StudyTabProps = {
  posts: ActivityPost[];
};

const StudyTab = ({ posts }: StudyTabProps) => {
  return <ActivityListTab posts={posts} showRecruitStatus tab="study"/>;
};

export default StudyTab;
 