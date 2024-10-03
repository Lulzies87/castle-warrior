export type Animation = {
  imageSrc: string;
  frameRate: number;
  frameBuffer: number;
  loop: boolean;
  image?: HTMLImageElement;
  onComplete?: () => void;
  isActive?: boolean;
};
