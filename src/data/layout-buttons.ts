"use strict";

import type { ButtonClass, LayoutButton } from "@/types/layout-button-types";

class LayoutButtonClass implements LayoutButton {
  position: number;
  text: string;
  url?: string;
  className: string;
  constructor(position: number, text: string, className: string, url?: string) {
    this.position = position;
    this.text = text;
    this.url = url;
    this.className = className;
  }
}

const Button: ButtonClass = LayoutButtonClass;

const logoButton = new Button(1, "Where's Who?", "top-left", "/homepage");
const leaderboardButton = new Button(
  2,
  "Leaderboard",
  "top-right",
  "/leaderboard",
);
const creditButton = new Button(4, "Image Credits", "bottom-right", "/credits");
const homepageButton = new Button(2, "Homepage", "top-right", "/homepage");
const githubButton = new Button(3, "GitHub", "bottom-left", "www.github.com");

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
