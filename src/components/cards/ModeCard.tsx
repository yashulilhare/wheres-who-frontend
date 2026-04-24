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
  // todo: if yes then fetch server for information for the game
  // two possibilities : 1. successfull data fetch then move forward with the game.
  // 2. failed fetch. 1) may be auth error like expired token so send code that tells it was an auth error. -> redirect them to login page
  // 2) if auth  is not available then some internal error occured ->  show that error as disappearing alert error
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
      // glareMaxOpacity={0.45}
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
