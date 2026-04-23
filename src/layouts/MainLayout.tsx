import "./MainLayout.css";
import { api } from "@/lib/api";

import MainLayoutButton from "@/components/buttons/MainLayoutButton";
import { Outlet } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

import type { LayoutButton } from "@/types/layout-button-types";

interface MainLayoutProps {
  buttons: LayoutButton[];
}

const MainLayout = ({ buttons }: MainLayoutProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [soundToggle, setSoundToggle] = useState(false);

  const jwt = localStorage.getItem("token");
  const [token, setToken] = useState(jwt);

  useEffect(() => {
    // when using free server then server may be kept on sleep, setting a request to activate it
    const startServer = async () => {
      const baseUrl = import.meta.env.VITE_API_BASE_URL;
      const initAuthUrl = `${baseUrl}/me`;
      const controller = new AbortController();
      const response = api(initAuthUrl, {
        method: "GET",
        signal: controller.signal,
      });
      response
        .then(() => {
          console.log("Server Started");
        })
        .catch(() => {
          console.warn("something went wrong");
        });
    };
    startServer();
  }, []);

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
      <Outlet context={{ soundToggle, setToken }} />
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
          type="button"
        ></button>
        {token && (
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
        )}
      </div>
    </>
  );
};

export default MainLayout;
