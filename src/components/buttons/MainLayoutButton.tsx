import { Link } from "react-router-dom";
interface MainLayoutButtonProps {
  text: string;
  className: string;
  imgUrl: string;
  origin: "SELF" | "CROSS";
  url?: string;
}

const MainLayoutButton = ({
  text,
  className,
  url,
  imgUrl,
  origin,
}: MainLayoutButtonProps) => {
  if (origin === "CROSS") {
    return (
      <a
        href={`https://${url}`}
        className={`${className} mainlayout-buttons`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <img src={imgUrl} aria-hidden className="logoIcon" />
        <span>{text}</span>
      </a>
    );
  }
  return (
    <Link to={url || "/"} className={`${className} mainlayout-buttons`}>
      <img src={imgUrl} aria-hidden className="logoIcon" />
      <span className="buttonText">{text}</span>
    </Link>
  );
};

export default MainLayoutButton;
