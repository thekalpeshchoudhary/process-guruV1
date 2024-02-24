import { CSSProperties } from "react";
import { TransitionStatus } from "react-transition-group";

export const transitionDuration = 500;
export type TransitionType = "fadeIn" | "grow";

export const fadeInStyles: { [key in TransitionStatus]?: CSSProperties } = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
  unmounted: { opacity: 0 },
};

export const defaultfadeInStyles = (
  duration: number,
  delay: number,
): CSSProperties => {
  return {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
    transitionDelay: `${delay}ms`,
  };
};

export const growStyles: { [key in TransitionStatus]?: CSSProperties } = {
  entering: { transform: "scale(0)" },
  entered: { transform: "scale(1)" },
  exiting: { transform: "scale(0)" },
  exited: { transform: "scale(0)" },
  unmounted: { transform: "scale(0)" },
};

export const defaultGrowStyles = (
  duration: number = transitionDuration,
  delay: number = 0,
): CSSProperties => {
  return {
    transition: `transform ${duration}ms ease-in-out`,
    transform: "scale(0)",
    transitionDelay: `${delay}ms`,
  };
};

type StyleGenerate = {
  type: TransitionType;
  state: TransitionStatus;
  duration: number;
  delay: number;
};

export const generateStyles = (data: StyleGenerate): CSSProperties => {
  const { state, type, delay, duration } = data;
  switch (type) {
    case "fadeIn":
      return {
        ...defaultfadeInStyles(duration, delay),
        ...fadeInStyles[state],
      };
    case "grow":
      return {
        ...defaultGrowStyles(duration, delay),
        ...growStyles[state],
      };

    default:
      return {};
  }
};
