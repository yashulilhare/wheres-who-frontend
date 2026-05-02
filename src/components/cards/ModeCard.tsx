import style from "./ModeCard.module.css";
import { useNavigate } from "react-router-dom";
import Tilt from "react-parallax-tilt";

interface ModeCardProps {
  imageUrl: string;
  altText: string;
  pageUrl: string;
  pageName: string;
}

const ModeCard = ({ imageUrl, pageUrl, pageName, altText }: ModeCardProps) => {

  const navigate = useNavigate();

  const redirectTo = (route: string) => {
    navigate(route);
  };

  const handleClick = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      redirectTo("/auth");
    } else {
      const gameUrl = `/playground/:${pageUrl}`;
      redirectTo(gameUrl);
    }
  };
  return (
    <Tilt
      tiltMaxAngleX={10}
      tiltMaxAngleY={10}
      glareEnable={false}
      scale={1.05}
    >
      <div className={style.card} onClick={handleClick}>
        <img src={imageUrl} alt={altText} />
        <h2>{pageName}</h2>
      </div>
    </Tilt>
  );
};

export default ModeCard;
