import "./MainLayout.css";

import MainLayoutButton from "@/components/buttons/MainLayoutButton";
import { Outlet } from "react-router-dom";
import { useRef, useState } from "react";

import type { LayoutButton } from "@/types/layout-button-types";

interface MainLayoutProps {
  buttons: LayoutButton[];
}

const MainLayout = ({ buttons }: MainLayoutProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [soundToggle, setSoundToggle] = useState(false);

  return (
    <>
      {buttons.map((button) => {
        return (
          <MainLayoutButton
            url={button?.url || "/homepage"}
            text={button.text}
            className={button.className}
            key={button.text}
          />
        );
      })}
      <Outlet context={soundToggle} />
      <audio
        src="/sounds/clovers.mp3"
        loop
        preload="auto"
        ref={audioRef}
      ></audio>
      <div className="footerButtonsDiv">
        <button
          className={`footerButtons sound ${soundToggle ? "soundOn" : "soundOff"}`}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (soundToggle) {
              setSoundToggle(false);
              localStorage.setItem("sound", "off");
              if (audioRef.current) {
                audioRef.current.pause();
              }
            } else {
              setSoundToggle(true);
              localStorage.setItem("sound", "on");
              if (audioRef.current) {
                audioRef.current.volume = 0.3;
                audioRef.current.play();
              }
            }
          }}
        ></button>
        <button
          className="footerButtons logout"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.reload();
          }}
        ></button>
      </div>
    </>
  );
};

export default MainLayout;
