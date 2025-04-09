import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useHovered = (ref: any, defaultState = false) => {
  const [focused, setFocused] = useState<boolean>(defaultState);

  useEffect(() => {
    const onMouseEnter = () => setFocused(true);
    const onMouseOut = () => setFocused(false);

    if (ref.current) {
      ref.current.addEventListener("mouseover", onMouseEnter);
      ref.current.addEventListener("mouseout", onMouseOut);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener("mouseover", onMouseEnter);
        // eslint-disable-next-line react-hooks/exhaustive-deps
        ref.current.removeEventListener("mouseout", onMouseOut);
      }
    };
  }, [ref]);

  return focused;
};
