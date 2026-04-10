import styles from "./StartGame.module.css";

interface CharacterData {
  name: string;
  imageCode: number;
  modeName: string;
}

interface StartGameProps {
  startGame: () => void;
  characters: CharacterData[];
}

const ImageCard = ({ url }: { url: string }) => {
  return (
    <div className={styles.imgCard}>
      <img src={url} alt="" />
      <p></p>
    </div>
  );
};

const StartGame = ({ startGame, characters }: StartGameProps) => {
  return (
    <div className={styles.container}>
      <p>Shot these criminals.</p>
      <div className={styles.imgContainer}>
        {characters.map((char) => {
          return (
            <ImageCard
              url={`/characters/${char.modeName}/${char.imageCode}.png`}
            />
          );
        })}
      </div>
      <button onClick={startGame}>Start</button>
    </div>
  );
};

export default StartGame;
