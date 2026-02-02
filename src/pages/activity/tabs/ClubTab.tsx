import ActivityListTab from './ActivityListTab';
import type { ActivityPost } from '../../../types/activityPost';

type ClubTabProps = {
  posts: ActivityPost[];
};

const ClubTab = ({ posts }: ClubTabProps) => {
  return <ActivityListTab posts={posts} linkToPost showRecruitStatus />;
};

export default ClubTab;
