/* eslint-disable react/require-default-props */
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  Transition as RTGTransition,
  TransitionStatus,
} from "react-transition-group";
import { TransitionType, generateStyles, transitionDuration } from "./utility";

interface TransitionProps {
  type: TransitionType;
  children: ReactNode;
  duration?: number;
  delay?: number;
  classOverrides?: string;
  inProp?: boolean;
}

export default function Transition({
  children,
  type,
  delay = 0,
  duration = 500,
  classOverrides = "",
  inProp = true,
}: Readonly<TransitionProps>) {
  const nodeRef = useRef(null);
  const [inState, setInState] = useState(false);

  useEffect(() => {
    setInState(inProp);
    return () => setInState(false);
  }, [inProp]);

  return (
    <RTGTransition nodeRef={nodeRef} in={inState} timeout={transitionDuration}>
      {(state: TransitionStatus) => (
        <div
          ref={nodeRef}
          className={classOverrides || "h-full"}
          style={generateStyles({ type, state, duration, delay })}
        >
          {children}
        </div>
      )}
    </RTGTransition>
  );
}
