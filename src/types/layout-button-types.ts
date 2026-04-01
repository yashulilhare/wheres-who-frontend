export interface LayoutButton {
  url?: string;
  text: string;
  position: number;
  className: string;
}

export interface ButtonClass {
  new (
    position: number,
    text: string,
    className: string,
    url?: string,
  ): LayoutButton;
}
