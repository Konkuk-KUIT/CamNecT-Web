import { useState } from "react";
import { getMyProfile } from "../../../api/profileApi";
import { useAuthStore } from "../../../store/useAuthStore";
import axios from "axios";
import { 
  updateProfileImage, 
  updateProfileBio, 
  updateProfileTags, 
  updateProfilePrivacy 
} from "../../../api/profileApi";
import { 
  addEducation, 
  updateEducation, 
  deleteEducation,
  addExperience,
  updateExperience,
  deleteExperience,
  addCertificate,
  updateCertificate,
  deleteCertificate
} from "../../../api/userApi";
import { requestProfilePresign } from "../../../api/auth";
import { searchInstitutions } from "../../../api/institutionApi";

// 타입 import
import type { EducationItem, CareerItem, CertificateItem } from "../../../types/mypage/mypageTypes";
import type { ProfileEditData } from "../../../types/mypage/profileEditTypes";

// 유틸 함수 import
import { 
  convertEducationToRequest, 
  convertCareerToRequest, 
  convertCertificateToRequest 
} from "../utils/dataConverter";

interface SaveResult {
  success: boolean;
  error?: string;
}

const DEBUG_DRY_RUN = true;

export function useProfileSave() {
  const user = useAuthStore(state => state.user);
  const userId = user?.id ? parseInt(user.id) : null;
  const [isSaving, setIsSaving] = useState(false);
  const isServerId = (id: string) => /^\d+$/.test(id);

  type ImageChange =
  | { action: "KEEP" }
  | { action: "UPLOAD"; file: File }
  | { action: "DELETE" };

  type DryRunRequest = {
  name: string;
  method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
  url: string;
  params?: Record<string, unknown>;
  body?: unknown;
};

const dryRun = async (req: DryRunRequest) => {
  console.groupCollapsed(`[DRY RUN] ${req.name}`);
  console.log("method:", req.method);
  console.log("url:", req.url);
  if (req.params !== undefined) console.log("params:", req.params);
  if (req.body !== undefined) console.log("body:", req.body);
  console.groupEnd();
};

  /**
   * 프로필 이미지 업로드 및 저장
   */
  const uploadProfileImage = async (file: File): Promise<void> => {
    if (!userId) throw new Error("userId is missing");

    const presignResponse = await requestProfilePresign({
      userId,
      contentType: file.type,
      size: file.size,
      originalFilename: file.name,
    });

    const { uploadUrl, fileKey, requiredHeaders } = presignResponse.data;

    await axios.put(uploadUrl, file, { headers: requiredHeaders });
    await updateProfileImage(userId, { profileImageKey: fileKey });
  };

  const deleteProfileImage = async (): Promise<void> => {
    if (!userId) throw new Error("userId is missing");
    await updateProfileImage(userId, { profileImageKey: null });
    //todo: 아래 코드 삭제. 디버깅용
    const fresh = await getMyProfile({ loginUserId: userId });
    console.log("[after delete] profileImageUrl:", fresh.data.basics.profileImageUrl);
  };

  /**
   * 자기소개 저장
   */
  const saveBio = async (bio: string): Promise<void> => {
    if (!userId) throw new Error("userId is missing");

    try {
      await updateProfileBio(userId, { bio });
    } catch (error) {
      console.error("자기소개 저장 실패:", error);
      throw error;
    }
  };

  /**
   * 태그 저장
   */
  const saveTags = async (tagNames: string[], allTags: { id: number; name: string }[]): Promise<void> => {
    if (!userId) throw new Error("userId is missing");

    try {
      // 태그 이름을 태그 ID로 변환
      const tagIds = tagNames
        .map(name => allTags.find(t => t.name === name)?.id)
        .filter((id): id is number => id !== undefined);

      await updateProfileTags(userId, { tagIds });
    } catch (error) {
      console.error("태그 저장 실패:", error);
      throw error;
    }
  };

  /**
   * 공개 여부 저장
   */
  const savePrivacy = async (data: ProfileEditData): Promise<void> => {
    if (!userId) throw new Error("userId is missing");

    try {
      await updateProfilePrivacy(userId, {
        isFollowerVisible: data.visibility.isFollowerVisible,
        isEducationVisible: data.visibility.educationVisibility,
        isExperienceVisible: data.visibility.careerVisibility,
        isCertificateVisible: data.visibility.certificateVisibility,
      });
    } catch (error) {
      console.error("공개 여부 저장 실패:", error);
      throw error;
    }
  };

  /**
   * 학력 저장 (추가/수정/삭제)
   */
  const saveEducations = async (
    newEducations: EducationItem[],
    originalEducations: EducationItem[]
  ): Promise<void> => {
    if (!userId) throw new Error("userId is missing");

    try {
      // 삭제된 항목 찾기
      const deletedIds = originalEducations
        .filter(orig => !newEducations.find(n => n.id === orig.id))
        .map(e => Number(e.id));

      // 새로 추가된 항목 찾기 (id가 숫자가 아닌 경우 = generateId로 생성된 경우)
      const addedEducations = newEducations.filter(e => !isServerId(e.id));

      // 수정된 항목 찾기
      const updatedEducations = newEducations.filter(n => {
        if (!isServerId(n.id)) return false; // 새로 추가된 항목 제외
        
        const original = originalEducations.find(o => o.id === n.id);
        return original && JSON.stringify(n) !== JSON.stringify(original);
      });

      // 학교 이름 → institutionId 변환 (학교 검색 API 사용)
      const schoolNames = [...new Set([...addedEducations, ...updatedEducations].map(e => e.school))];
      const institutionMap = new Map<string, number>();

      for (const schoolName of schoolNames) {
        const searchResult = await searchInstitutions({ keyword: schoolName });
        const institution = searchResult.data.institutions.find(i => i.nameKor === schoolName);
        if (institution) {
          institutionMap.set(schoolName, institution.id);
        }
      }

      // 삭제 실행
      for (const id of deletedIds) {
        if (DEBUG_DRY_RUN) {
          await dryRun({
            name: "deleteEducation",
            method: "DELETE",
            url: `/api/user/me/educations/${id}`,
            params: { userId },
          });
        } else {
          await deleteEducation(userId, id);
        }
      }

      // 추가 실행
      for (const education of addedEducations) {
        const institutionId = institutionMap.get(education.school);
        if (!institutionId) {
          throw new Error(`학교 ID를 찾을 수 없음: ${education.school}`);
        }
        const request = convertEducationToRequest(education, institutionId);
        if (DEBUG_DRY_RUN) {
          await dryRun({
            name: "addEducation",
            method: "POST",
            url: "/api/user/me/educations",
            params: { userId },
            body: request,
          });
        } else {
          await addEducation(userId, request);
        }
      }

      // 수정 실행
      for (const education of updatedEducations) {
        const institutionId = institutionMap.get(education.school);
        if (!institutionId) {
          throw new Error(`학교 ID를 찾을 수 없음: ${education.school}`);
        }
        const request = convertEducationToRequest(education, institutionId);
        if (DEBUG_DRY_RUN) {
          await dryRun({
            name: "updateEducation",
            method: "PATCH",
            url: `/api/user/me/educations/${Number(education.id)}`,
            params: { userId },
            body: request,
          });
        } else {
          await updateEducation(userId, Number(education.id), request);
        }
      }
    } catch (error) {
      console.error("학력 저장 실패:", error);
      throw error;
    }
  };

  /**
   * 경력 저장 (추가/수정/삭제)
   */
  const saveCareers = async (
    newCareers: CareerItem[],
    originalCareers: CareerItem[]
  ): Promise<void> => {
    if (!userId) throw new Error("userId is missing");

    try {
      // 삭제된 항목
      const deletedIds = originalCareers
        .filter(orig => !newCareers.find(n => n.id === orig.id))
        .map(c => Number(c.id));

      // 새로 추가된 항목
      const addedCareers = newCareers.filter(c => !isServerId(c.id));

      // 수정된 항목
      const updatedCareers = newCareers.filter(n => {
        if (!isServerId(n.id)) return false;
        
        const original = originalCareers.find(o => o.id === n.id);
        return original && JSON.stringify(n) !== JSON.stringify(original);
      });

      // 삭제 실행
      for (const id of deletedIds) {
        if (DEBUG_DRY_RUN) {
          await dryRun({
            name: "deleteExperience",
            method: "DELETE",
            url: `/api/user/me/experiences/${id}`,
            params: { userId },
          });
        } else {
          await deleteExperience(userId, id);
        }
      }

      // 추가 실행
      for (const career of addedCareers) {
        const request = convertCareerToRequest(career);
        if (DEBUG_DRY_RUN) {
          await dryRun({
            name: "addExperience",
            method: "POST",
            url: "/api/user/me/experiences",
            params: { userId },
            body: request,
          });
        } else {
          await addExperience(userId, request);
        }
      }

      // 수정 실행
      for (const career of updatedCareers) {
        const request = convertCareerToRequest(career);
        if (DEBUG_DRY_RUN) {
          await dryRun({
            name: "updateExperience",
            method: "PATCH",
            url: `/api/user/me/experiences/${Number(career.id)}`,
            params: { userId },
            body: request,
          });
        } else {
          await updateExperience(userId, Number(career.id), request);
        }
      }

    } catch (error) {
      console.error("경력 저장 실패:", error);
      throw error;
    }
  };

  /**
   * 자격증 저장 (추가/수정/삭제)
   */
  const saveCertificates = async (
    newCertificates: CertificateItem[],
    originalCertificates: CertificateItem[]
  ): Promise<void> => {
    if (!userId) throw new Error("userId is missing");

    try {
      // 삭제된 항목
      const deletedIds = originalCertificates
        .filter(orig => !newCertificates.find(n => n.id === orig.id))
        .map(c => Number(c.id));

      // 새로 추가된 항목
      const addedCertificates = newCertificates.filter(c => !isServerId(c.id));

      // 수정된 항목
      const updatedCertificates = newCertificates.filter(n => {
        if (!isServerId(n.id)) return false;
        
        const original = originalCertificates.find(o => o.id === n.id);
        return original && JSON.stringify(n) !== JSON.stringify(original);
      });

      // 삭제 실행
      for (const id of deletedIds) {
        if (DEBUG_DRY_RUN) {
          await dryRun({
            name: "deleteCertificate",
            method: "DELETE",
            url: `/api/user/me/certificates/${id}`,
            params: { userId },
          });
        } else {
          await deleteCertificate(userId, id);
        }
      }

      // 추가 실행
      for (const certificate of addedCertificates) {
        const request = convertCertificateToRequest(certificate);
        if (DEBUG_DRY_RUN) {
          await dryRun({
            name: "addCertificate",
            method: "POST",
            url: "/api/user/me/certificates",
            params: { userId },
            body: request,
          });
        } else {
          await addCertificate(userId, request);
        }
      }

      // 수정 실행
      for (const certificate of updatedCertificates) {
        const request = convertCertificateToRequest(certificate);
        if (DEBUG_DRY_RUN) {
          await dryRun({
            name: "updateCertificate",
            method: "PATCH",
            url: `/api/user/me/certificates/${Number(certificate.id)}`,
            params: { userId },
            body: request,
          });
        } else {
          await updateCertificate(userId, Number(certificate.id), request);
        }
      }

    } catch (error) {
      console.error("자격증 저장 실패:", error);
      throw error;
    }
  };

  /**
   * 전체 프로필 저장
   */
  const saveProfile = async (
    currentData: ProfileEditData,
    originalData: ProfileEditData,
    imageChange: ImageChange,
    allTags: { id: number; name: string }[]
  ): Promise<SaveResult> => {
    setIsSaving(true);

    try {
      const tasks: Promise<void>[] = [];
      // 프로필 이미지
      if (imageChange.action === "UPLOAD") {
        tasks.push(uploadProfileImage(imageChange.file));
      } else if (imageChange.action === "DELETE") {
        tasks.push(deleteProfileImage());
      }

      // 자기소개
      if (currentData.user.introduction !== originalData.user.introduction) {
        tasks.push(saveBio(currentData.user.introduction));
      }

      // 태그
      if (JSON.stringify(currentData.user.userTags) !== JSON.stringify(originalData.user.userTags)) {
        tasks.push(saveTags(currentData.user.userTags, allTags));
      }

      // 공개 여부
      if (JSON.stringify(currentData.visibility) !== JSON.stringify(originalData.visibility)) {
        tasks.push(savePrivacy(currentData));
      }

      // 학력
      if (JSON.stringify(currentData.educations) !== JSON.stringify(originalData.educations)) {
        tasks.push(saveEducations(currentData.educations, originalData.educations));
      }

      // 경력
      if (JSON.stringify(currentData.careers) !== JSON.stringify(originalData.careers)) {
        tasks.push(saveCareers(currentData.careers, originalData.careers));
      }

      // 자격증
      if (JSON.stringify(currentData.certificates) !== JSON.stringify(originalData.certificates)) {
        tasks.push(saveCertificates(currentData.certificates, originalData.certificates));
      }

      // 변경사항이 하나도 없으면 그대로 성공 처리
      if (tasks.length === 0) {
        return { success: true };
      }

      const results = await Promise.allSettled(tasks);

      // 실패한 항목 확인
      const failures = results.filter(r => r.status === "rejected");
      
      if (failures.length > 0) {
        console.error("일부 저장 실패:", failures);
        return {
          success: false,
          error: "일부 정보 저장에 실패했습니다.",
        };
      }

      return { success: true };
    } catch (error) {
      console.error("프로필 저장 중 오류:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "프로필 저장 중 오류가 발생했습니다.",
      };
    } finally {
      setIsSaving(false);
    }
  };

  return {
    saveProfile,
    isSaving,
  };
}