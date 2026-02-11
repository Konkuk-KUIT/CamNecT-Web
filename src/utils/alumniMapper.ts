import type { AlumniApiItem, AlumniProfileDetail } from "../api-types/alumniApiTypes";
import type { AlumniProfile } from "../types/alumni/alumniTypes";
import { mapMajorIdToName } from "./majorMapper";

const toProfileImage = (url?: string | null) => (url && url.trim() ? url : undefined);

const resolveName = (item: AlumniApiItem) => {
  const name = item.userName?.trim();
  if (name) return name;
  return `사용자 ${item.userId}`;
};

const resolveMajor = (majorId: number | null) => mapMajorIdToName(majorId);

const resolveStudentId = (studentNo: string | null, yearLevel: number | null) => {
  const trimmedStudentNo = studentNo?.trim();
  if (trimmedStudentNo) {
    return trimmedStudentNo.length >= 4 ? trimmedStudentNo.slice(2, 4) : trimmedStudentNo;
  }
  if (yearLevel) return String(yearLevel);
  return "";
};

export const mapAlumniApiItemToProfile = (item: AlumniApiItem): AlumniProfile => {
  const { userProfile, tagList } = item;
  const userIdString = String(item.userId);
  const tagNames = Array.isArray(tagList)
    ? tagList
        .map((tag) => (typeof tag === "string" ? tag : tag.name))
        .filter((name): name is string => Boolean(name && name.trim()))
    : [];
  return {
    id: `alumni-${userIdString}`,
    userId: userIdString,
    author: {
      name: resolveName(item),
      major: resolveMajor(userProfile.majorId),
      studentId: resolveStudentId(userProfile.studentNo, userProfile.yearLevel),
    },
    profileImage: toProfileImage(userProfile.profileImageUrl),
    privacy: {
      showFollowStats: userProfile.isFollowerVisible,
      showPortfolio: true,
      showEducation: userProfile.isEducationVisible,
      showCareer: userProfile.isExperienceVisible,
      showCertificates: userProfile.isCertificateVisible,
      openToCoffeeChat: userProfile.openToCoffeeChat,
    },
    portfolioItems: [],
    educationItems: [],
    careerItems: [],
    certificateItems: [],
    isFollowing: false,
    categories: Array.from(new Set(tagNames)),
    intro: userProfile.bio ?? "",
    followingCount: 0,
    followerCount: 0,
  };
};

export const mapAlumniApiListToProfiles = (items: AlumniApiItem[]): AlumniProfile[] =>
  items
    .filter((item) => item.userId !== 2)
    .map(mapAlumniApiItemToProfile);

const formatPeriod = (startDate: string, endDate?: string, isCurrent?: boolean) => {
  if (isCurrent) return `${startDate}~현재`;
  if (endDate) return `${startDate}~${endDate}`;
  return startDate;
};

export const mapAlumniProfileDetailToProfile = (
  detail: AlumniProfileDetail
): AlumniProfile => {
  const userIdString = String(detail.userId);
  const showEducation =
    detail.basics.isEducationVisible && detail.educations.length > 0;
  const showCareer =
    detail.basics.isExperienceVisible && detail.experience.length > 0;
  const showCertificates =
    detail.basics.isCertificateVisible && detail.certificate.length > 0;
  return {
    id: `alumni-${userIdString}`,
    userId: userIdString,
    author: {
      name: detail.name,
      major: resolveMajor(detail.basics.majorId),
      studentId: resolveStudentId(detail.basics.studentNo, 0),
    },
    profileImage: toProfileImage(detail.basics.profileImageUrl),
    privacy: {
      showFollowStats: detail.basics.isFollowerVisible,
      showPortfolio: true,
      showEducation,
      showCareer,
      showCertificates,
      openToCoffeeChat: detail.basics.openToCoffeeChat,
    },
    portfolioItems: detail.portfolioProjectList
      .filter((item) => item.isPublic)
      .map((item) => ({
        id: String(item.portfolioId),
        title: item.title,
        image: item.thumbnailUrl || undefined,
      })),
    educationItems: detail.educations.map((item) => ({
      id: String(item.educationId),
      period: formatPeriod(item.startDate, item.endDate ?? undefined),
      school: item.schoolName,
      status: item.status,
    })),
    careerItems: detail.experience.map((item) => ({
      id: String(item.experienceId),
      period: formatPeriod(item.startDate, item.endDate, item.isCurrent),
      company: item.companyName,
      tasks: item.responsibilities,
    })),
    certificateItems: detail.certificate.map((item) => ({
      id: String(item.certificateId),
      date: item.acquiredDate,
      name: item.certificateName,
    })),
    isFollowing: false,
    categories: Array.from(
      new Set(detail.tags.map((tag) => tag.name).filter((name) => name && name.trim()))
    ),
    intro: detail.basics.bio ?? "",
    followingCount: detail.following,
    followerCount: detail.follower,
  };
};
