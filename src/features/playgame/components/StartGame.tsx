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

const ImageCard = ({ url, charName }: { url: string; charName: string }) => {
  return (
    <div className={styles.imgCard}>
      <img src={url} alt={charName} />
      <p>{charName}</p>
    </div>
  );
};

const StartGame = ({ startGame, characters }: StartGameProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.contentWrapper}>
        <p>Characters to shot</p>
        <div className={styles.imgContainer}>
          {characters.map((char) => {
            return (
              <ImageCard
                url={`/characters/${char.modeName}/${char.imageCode}.png`}
                key={char.name}
                charName={char.name}
              />
            );
          })}
        </div>
        <button onClick={startGame}>Start</button>
      </div>
    </div>
  );
};

export default StartGame;
