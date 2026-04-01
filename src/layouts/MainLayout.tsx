import MainLayoutButton from "@/components/buttons/MainLayoutButton";

import type { LayoutButton } from "@/types/layout-button-types";

interface MainLayoutProps {
  buttons: LayoutButton[];
}

const MainLayout = ({ buttons }: MainLayoutProps) => {
  return buttons.map((button) => {
    return (
      <MainLayoutButton
        url={button?.url || "/homepage"}
        text={button.text}
        className={button.className}
      />
    );
  });
};

export default MainLayout;
