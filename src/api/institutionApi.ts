import type { 
  MajorRequest, 
  MajorResponse,
  InstitutionSearchRequest,
  InstitutionSearchResponse,
  InstitutionRequest,
  InstitutionResponse
} from "../api-types/institutionApiTypes";
import { axiosInstance } from "./axiosInstance";

// 전공 단건 조회 API [GET] (/api/institutions/{institutionId}/majors/{majorId})
export const getMajor = async (data: MajorRequest) => {
  const response = await axiosInstance.get<MajorResponse>(
    `/api/institutions/${data.institutionId}/majors/${data.majorId}`
  );
  return response.data;
};

// 대학 검색 API [GET] (/api/institutions)
export const searchInstitutions = async (data: InstitutionSearchRequest) => {
  const response = await axiosInstance.get<InstitutionSearchResponse>("/api/institutions", {
    params: { keyword: data.keyword }
  });
  return response.data;
};

// 대학 단건 조회 API [GET] (/api/institutions/{institutionId})
export const getInstitution = async (data: InstitutionRequest) => {
  const response = await axiosInstance.get<InstitutionResponse>(
    `/api/institutions/${data.institutionId}`
  );
  return response.data;
};