"use strict";

class Mode {
  imageUrl: string;
  pagePath: string;
  name: string;
  description: string;
  modeImageUrl: string;

  constructor(
    imageUrl: string,
    pagePath: string,
    name: string,
    description: string,
    modeImageUrl: string,
  ) {
    this.imageUrl = imageUrl;
    this.pagePath = pagePath;
    this.name = name;
    this.description = description;
    this.modeImageUrl = modeImageUrl;
  }
}

export const undrcity = new Mode(
  "./src/assets/images/undrcity-compressed.jpg",
  "undrcity",
  "Undrcity",
  "Image is banner for Undrcity mode.",
  "/images/undrcity.jpg",
);

export const universe113 = new Mode(
  "./src/assets/images/universe113-compressed.jpg",
  "universe113",
  "Universe113",
  "Image is banner for universe113 mode.",
  "/images/universe113.jpg",
);

export const pokeverse = new Mode(
  "./src/assets/images/pokeverse-compressed.jpg",
  "pokeverse",
  "Pokeverse",
  "pokeverse mode images demo",
  "/images/pokemon.jpg",
);

export const modeList = [undrcity, universe113, pokeverse];

export default Mode;
