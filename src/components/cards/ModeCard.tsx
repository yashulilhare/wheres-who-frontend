import style from "./ModeCard.module.css";
import { Link } from "react-router-dom";

interface ModeCardProps {
  imageUrl: string;
  altText: string;
  pageUrl: string;
  pageName: string;
}

const ModeCard = ({ imageUrl, pageUrl, pageName, altText }: ModeCardProps) => {
  return (
    <div className={style.card}>
      <Link to={`/playground/:${pageUrl}`}>
        <img src={imageUrl} alt={altText} />
        <h2>{pageName}</h2>
      </Link>
    </div>
  );
};

export default ModeCard;
