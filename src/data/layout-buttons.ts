"use strict";
//info: there was going to be different buttons on  different pages so this separate file was created to provide ordered list of buttons per page.
// But as only homepage buttons were used on all pages so other data are removed and keeping the remaining setup

import type { ButtonClass, LayoutButton } from "@/types/layout-button-types";

class LayoutButtonClass implements LayoutButton {
  position: number;
  text: string;
  url?: string;
  className: string;
  imgUrl: string;
  origin: "SELF" | "CROSS";
  constructor(
    position: number,
    text: string,
    className: string,
    imgUrl: string,
    origin: "SELF" | "CROSS",
    url?: string,
  ) {
    this.position = position;
    this.text = text;
    this.url = url;
    this.className = className;
    this.origin = origin;
    this.imgUrl = imgUrl;
  }
}

const Button: ButtonClass = LayoutButtonClass;

const logoButton = new Button(
  1,
  "Shot'Em",
  "top-left",
  "/icons/gun.png",
  "SELF",
  "/",
);
const leaderboardButton = new Button(
  2,
  "Leaderboard",
  "top-right",
  "/icons/podium.png",
  "SELF",
  "/leaderboard",
);
const creditButton = new Button(
  4,
  "Credits",
  "bottom-right",
  "/icons/content.png",
  "SELF",
  "/credits",
);

const githubButton = new Button(
  3,
  "GitHub",
  "bottom-left",
  "/icons/github.png",
  "CROSS",
  "https://github.com/yashulilhare/wheres-who-frontend",
);

export const homepageButtons = [
  logoButton,
  leaderboardButton,
  githubButton,
  creditButton,
];
