export interface LayoutButton {
  url?: string;
  text: string;
  position: number;
  className: string;
  imgUrl: string;
  origin: "SELF" | "CROSS";
}

export interface ButtonClass {
  new (
    position: number,
    text: string,
    className: string,
    imgUrl: string,
    origin: "SELF" | "CROSS",
    url?: string,
  ): LayoutButton;
}
