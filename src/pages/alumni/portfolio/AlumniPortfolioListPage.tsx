import { Navigate, useParams } from "react-router-dom";
import { PortfolioListPage } from "../../portfolio/PortfolioListPage";
import { alumniList } from "../data";
import { MOCK_SESSION } from "../../../mock/mypages";

export const AlumniPortfolioListPage = () => {
    const { id } = useParams();
    const profile = alumniList.find((item) => item.id === id);

    if (!profile) {
        return <Navigate to="/alumni" replace />;
    }

    const meUid = MOCK_SESSION.meUid;
    const isMine = profile.userId === meUid;

    return (
        <PortfolioListPage
            ownerId={profile.userId}
            isMine={isMine}
            basePath={`/alumni/profile/${profile.id}/portfolio`}
        />
    );
};
