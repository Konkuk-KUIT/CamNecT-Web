import type { User, ProfileVisibility, EducationItem, CareerItem, CertificateItem } from "./mypageTypes";
import { type Portfolio } from "../portfolio/portfolioTypes";

export interface ProfileEditData {
    user: User;
    visibility: ProfileVisibility;
    educations: EducationItem[];
    careers: CareerItem[];
    certificates: CertificateItem[];
    portfolios: Portfolio[];
}