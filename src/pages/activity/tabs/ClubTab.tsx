import ActivityListTab from './ActivityListTab';
import type { ActivityPost } from '../../../types/activityPage/activityPageTypes';

type ClubTabProps = {
  posts: ActivityPost[];
};

const ClubTab = ({ posts }: ClubTabProps) => {
  return <ActivityListTab posts={posts} showRecruitStatus tab="club"/>;
};

export default ClubTab;
