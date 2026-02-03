import { Navigate, useParams } from "react-router-dom";
import { PortfolioDetailPage } from "../../portfolio/PortfolioDetailPage";
import { alumniList } from "../data";
import { MOCK_SESSION } from "../../../mock/mypages";

export const AlumniPortfolioDetailPage = () => {
    const { id, portfolioId } = useParams();
    const profile = alumniList.find((item) => item.id === id);

    if (!profile || !portfolioId) {
        return <Navigate to="/alumni" replace />;
    }

    const meUid = MOCK_SESSION.meUid;
    const isMine = profile.userId === meUid;

    return (
        <PortfolioDetailPage
            ownerId={profile.userId}
            isMine={isMine}
            portfolioId={portfolioId}
        />
    );
};
