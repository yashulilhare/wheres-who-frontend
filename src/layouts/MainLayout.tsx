import "./MainLayout.css";

import MainLayoutButton from "@/components/buttons/MainLayoutButton";
import { Outlet } from "react-router-dom";

import type { LayoutButton } from "@/types/layout-button-types";

interface MainLayoutProps {
  buttons: LayoutButton[];
}

const MainLayout = ({ buttons }: MainLayoutProps) => {
  return (
    <>
      {buttons.map((button) => {
        return (
          <MainLayoutButton
            url={button?.url || "/homepage"}
            text={button.text}
            className={button.className}
            key={button.text}
          />
        );
      })}
      <Outlet />
    </>
  );
};

export default MainLayout;
