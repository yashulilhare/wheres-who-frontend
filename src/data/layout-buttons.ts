"use strict";

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
const homepageButton = new Button(
  2,
  "Homepage",
  "/icons/gun.png",
  "top-right",
  "SELF",
  "/",
);
const githubButton = new Button(
  3,
  "GitHub",
  "bottom-left",
  "/icons/github.png",
  "CROSS",
  "www.github.com",
);

// this is going to be an array
export const homepageButtons = [
  logoButton,
  leaderboardButton,
  githubButton,
  creditButton,
];
export const leaderboardButtons = [
  logoButton,
  homepageButton,
  githubButton,
  creditButton,
];
