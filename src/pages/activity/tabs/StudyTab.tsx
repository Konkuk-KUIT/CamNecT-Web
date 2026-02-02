import ActivityListTab from './ActivityListTab';
import type { ActivityPost } from '../../../types/activityPost';

type StudyTabProps = {
  posts: ActivityPost[];
};

const StudyTab = ({ posts }: StudyTabProps) => {
  return <ActivityListTab posts={posts} linkToPost showRecruitStatus />;
};

export default StudyTab;
 