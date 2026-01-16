import { type EducationItem, type CareerItem, type CertificateItem, EDUCATION_STATUS_KR } from "../../../types/mypage/mypageTypes";
import BaseSection from "./BaseSection";
import Icon from "../../../components/Icon";

type InfoType = "education"|"career"|"certificate";
type InfoItem = EducationItem|CareerItem|CertificateItem;

export default function InfoSection({
  type,
  items,
  isEdit,
  onEditClick
}: {
  type: InfoType;
  items: InfoItem[];
  isEdit: boolean;
  onEditClick?: () => void;
}) {
    

    const title: Record<InfoType, string> = {
        education: "학력",
        career: "경력",
        certificate: "자격증"
    };
    const emptyText: Record<InfoType, string> = {
        education: "아직 학력 정보가 등록되지 않았어요!",
        career: "아직 경력 정보가 등록되지 않았어요!",
        certificate: "아직 등록된 자격증 및 보유 기술이 없어요!"
    };
    const editStatement = <button onClick={onEditClick} //TODO: router 설정
                            className="text-R-12-hn text-gray-650 flex items-center gap-[2px]">
                                수정하기
                                <Icon name="more2" className="w-[10px] h-[10px] block shrink-0"/>
                            </button>
    const lines = makeLines(type, items);
    return (
        <BaseSection title={title[type]} right={isEdit ? editStatement : undefined}>
        <div className="text-R-14">
            {lines.length === 0 ? (
            <div className="text-gray-650">{emptyText[type]}</div>
            ) : (
            lines.map((line, idx) => <div className="text-gray-750" key={`${idx}-${line}`}>{line}</div>)
            )}
        </div>
        </BaseSection>
    );
}

/*학력, 경력, 자격증에서 문장 조합*/
function makeLines(type: InfoType, items: InfoItem[]): string[] {
  if (type === "education") {
    return (items as EducationItem[])
      .slice()
      .sort((a, b) => b.startYear - a.startYear)
      .map((e) => `${e.startYear}년 ${e.school} ${EDUCATION_STATUS_KR[e.status]}`);
  }

  if (type === "career") {
    return (items as CareerItem[])
      .slice()
      .sort((a, b) => b.startYear - a.startYear)
      .map((c) => `${c.startYear}년 ${c.organization}`); //TODO: 디자인 수정된 버전 반영하기
  }

  return (items as CertificateItem[])
    .slice()
    .sort((a, b) => b.acquiredYear - a.acquiredYear)
    .map((x) => `${x.acquiredYear}년 ${x.name} 취득`);
}
