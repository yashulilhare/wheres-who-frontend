import styles from "./Credit.module.css";
import Logo from "@/components/partials/Logo";

interface CardProps {
  children: React.ReactNode;
  category: string;
}
const Card = ({ children, category }: CardProps) => {
  return (
    <div className={styles.card}>
      <h1>{category}</h1>
      {children}
    </div>
  );
};

const Credits = () => {
  return (
    <main className={styles.main}>
      <Logo />
      <div>
        <p className={styles.creditPara}>
          All images, icons, audio, and other media used on this website have
          been sourced from platforms that provide free-to-use content,
          including resources from sites such as{" "}
          <a
            href="https://www.flaticon.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Flaticon
          </a>
          ,{" "}
          <a
            href="https://docs.freepik.com/introduction"
            target="_blank"
            rel="noopener noreferrer"
          >
            Freepik
          </a>
          ,{" "}
          <a
            href="https://pixabay.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pixabay
          </a>
          ,{" "}
          <a
            href="https://uppbeat.io/"
            target="_blank"
            rel="noopener noreferrer"
            title="upbeat.io"
          >
            Uppbeat
          </a>
          , and others. Wherever required, proper attribution has been provided
          in accordance with the respective licensing terms of each platform and
          creator.
        </p>
        <p className={styles.creditPara}>
          This project is built for learning purpose only, and every effort has
          been made to ensure that the included media complies with applicable
          copyright and licensing guidelines. If you are a content owner and
          believe any material has been used incorrectly or without proper
          credit, please feel free to reach out so it can be promptly reviewed
          and corrected.
        </p>
      </div>
      <Card category="Game Images">
        <p>
          Undrcity and Universe113 by{" "}
          <a
            href="https://chekavo.artstation.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Egor Klyuchnyk
          </a>
        </p>
      </Card>
      <Card category="Icons and other images">
        <p>
          From{" "}
          <a
            href="https://www.flaticon.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Flaticon
          </a>{" "}
          and{" "}
          <a
            href="https://docs.freepik.com/introduction"
            target="_blank"
            rel="noopener noreferrer"
          >
            Freepik
          </a>
        </p>
      </Card>
      <Card category="Background sound and effects">
        <p>
          From{" "}
          <a
            href="https://pixabay.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Pixabay
          </a>{" "}
          and{" "}
          <a
            href="https://uppbeat.io/"
            target="_blank"
            rel="noopener noreferrer"
            title="upbeat.io"
          >
            Uppbeat
          </a>
        </p>
      </Card>
    </main>
  );
};

export default Credits;
