// 여러 헤더 스타일을 위한 분기 컴포넌트
import { EmptyHeader } from "./EmptyHeader";
import { HomeHeader } from "./HomeHeader";
import { MainHeader } from "./MainHeader";

export const Header = ({type}: {type: string}) => {
    if (type === "home") return <HomeHeader/>
    if (type === "empty") return <EmptyHeader/>
    if (type === "main") return <MainHeader />
    return null;
}
