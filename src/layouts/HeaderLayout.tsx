import { Outlet } from "react-router-dom";

// Header (X) BottomNav (X) 레이아웃
export const HeaderLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};
