"use strict";

interface MainLayoutButtonProps {
  text: string;
  className: string;
  url?: string;
}

const MainLayoutButton = ({ text, className, url }: MainLayoutButtonProps) => {
  return (
    <a href={url} className={`${className} mainlayout-buttons`}>
      {text}
    </a>
  );
};

export default MainLayoutButton;
