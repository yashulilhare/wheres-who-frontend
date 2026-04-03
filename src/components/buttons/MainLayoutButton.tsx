"use strict";

import { Link } from "react-router-dom";
interface MainLayoutButtonProps {
  text: string;
  className: string;
  url?: string;
}

const MainLayoutButton = ({ text, className, url }: MainLayoutButtonProps) => {
  return (
    <Link to={url || "/"} className={`${className} mainlayout-buttons`}>
      {text}
    </Link>
  );
};

export default MainLayoutButton;
