import { useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { useMutation } from "@tanstack/react-query";
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

  type DryRunRequest = {
  name: string;
  method: "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
  url: string;
  params?: any;
  body?: any;
};

const dryRun = async (req: DryRunRequest) => {
  console.groupCollapsed(`[DRY RUN] ${req.name}`);
  console.log("method:", req.method);
  console.log("url:", req.url);
  if (req.params !== undefined) console.log("params:", req.params);
  if (req.body !== undefined) console.log("body:", req.body);
  console.groupEnd();
  return true; // 성공 처리
};

  /**
   * 프로필 이미지 업로드 및 저장
   */
  const saveProfileImage = async (imageFile: File | null, imageKey: string | null): Promise<boolean> => {
    if (!userId) return false;

    try {
      // 1. 이미지 파일이 있으면 presign URL 발급 후 S3 업로드
      if (imageFile) {
        const presignResponse = await requestProfilePresign({
          userId,
          contentType: imageFile.type,
          size: imageFile.size,
          originalFilename: imageFile.name,
        });

        const { uploadUrl, fileKey, requiredHeaders } = presignResponse.data;

        // S3에 직접 업로드
        await axios.put(uploadUrl, imageFile, {
          headers: requiredHeaders,
        });

        // 2. fileKey로 프로필 이미지 업데이트
        await updateProfileImage(userId, { profileImageKey: fileKey });
      } else if (imageKey) {
        // 이미지 파일은 없지만 기존 imageKey가 있는 경우 (삭제 등)
        await updateProfileImage(userId, { profileImageKey: imageKey });
      }

      return true;
    } catch (error) {
      console.error("프로필 이미지 저장 실패:", error);
      return false;
    }
  };

  /**
   * 자기소개 저장
   */
  const saveBio = async (bio: string): Promise<boolean> => {
    if (!userId) return false;

    try {
      await updateProfileBio(userId, { bio });
      return true;
    } catch (error) {
      console.error("자기소개 저장 실패:", error);
      return false;
    }
  };

  /**
   * 태그 저장
   */
  const saveTags = async (tagNames: string[], allTags: { id: number; name: string }[]): Promise<boolean> => {
    if (!userId) return false;

    try {
      // 태그 이름을 태그 ID로 변환
      const tagIds = tagNames
        .map(name => allTags.find(t => t.name === name)?.id)
        .filter((id): id is number => id !== undefined);

      await updateProfileTags(userId, { tagIds });
      return true;
    } catch (error) {
      console.error("태그 저장 실패:", error);
      return false;
    }
  };

  /**
   * 공개 여부 저장
   */
  const savePrivacy = async (
    data: ProfileEditData
  ): Promise<boolean> => {
    if (!userId) return false;

    try {
      await updateProfilePrivacy(userId, {
        isFollowerVisible: data.visibility.isFollowerVisible,
        isEducationVisible: data.visibility.educationVisibility,
        isExperienceVisible: data.visibility.careerVisibility, // ⚠️ API 필드명 다름
        isCertificateVisible: data.visibility.certificateVisibility,
      });
      return true;
    } catch (error) {
      console.error("공개 여부 저장 실패:", error);
      return false;
    }
  };

  /**
   * 학력 저장 (추가/수정/삭제)
   */
  const saveEducations = async (
    newEducations: EducationItem[],
    originalEducations: EducationItem[]
  ): Promise<boolean> => {
    if (!userId) return false;

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
          console.error(`학교 ID를 찾을 수 없음: ${education.school}`);
          continue;
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
          console.error(`학교 ID를 찾을 수 없음: ${education.school}`);
          continue;
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

      return true;
    } catch (error) {
      console.error("학력 저장 실패:", error);
      return false;
    }
  };

  /**
   * 경력 저장 (추가/수정/삭제)
   */
  const saveCareers = async (
    newCareers: CareerItem[],
    originalCareers: CareerItem[]
  ): Promise<boolean> => {
    if (!userId) return false;

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

      return true;
    } catch (error) {
      console.error("경력 저장 실패:", error);
      return false;
    }
  };

  /**
   * 자격증 저장 (추가/수정/삭제)
   */
  const saveCertificates = async (
    newCertificates: CertificateItem[],
    originalCertificates: CertificateItem[]
  ): Promise<boolean> => {
    if (!userId) return false;

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

      return true;
    } catch (error) {
      console.error("자격증 저장 실패:", error);
      return false;
    }
  };

  /**
   * 전체 프로필 저장
   */
  const saveProfile = async (
    currentData: any,
    originalData: any,
    imageFile: File | null,
    allTags: { id: number; name: string }[]
  ): Promise<SaveResult> => {
    setIsSaving(true);

    try {
      const results = await Promise.allSettled([
        // 프로필 이미지 저장
        currentData.user.profileImg !== originalData.user.profileImg
          ? saveProfileImage(imageFile, null)
          : Promise.resolve(true),

        // 자기소개 저장
        currentData.user.introduction !== originalData.user.introduction
          ? saveBio(currentData.user.introduction)
          : Promise.resolve(true),

        // 태그 저장
        JSON.stringify(currentData.user.userTags) !== JSON.stringify(originalData.user.userTags)
          ? saveTags(currentData.user.userTags, allTags)
          : Promise.resolve(true),

        // 공개 여부 저장
        JSON.stringify(currentData.visibility) !== JSON.stringify(originalData.visibility)
          ? savePrivacy(currentData)
          : Promise.resolve(true),

        // 학력 저장
        JSON.stringify(currentData.educations) !== JSON.stringify(originalData.educations)
          ? saveEducations(currentData.educations, originalData.educations)
          : Promise.resolve(true),

        // 경력 저장
        JSON.stringify(currentData.careers) !== JSON.stringify(originalData.careers)
          ? saveCareers(currentData.careers, originalData.careers)
          : Promise.resolve(true),

        // 자격증 저장
        JSON.stringify(currentData.certificates) !== JSON.stringify(originalData.certificates)
          ? saveCertificates(currentData.certificates, originalData.certificates)
          : Promise.resolve(true),
      ]);

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
        error: "프로필 저장 중 오류가 발생했습니다.",
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