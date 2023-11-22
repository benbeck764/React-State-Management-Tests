import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import { keyframes, styled } from "@mui/material/styles";
import { useHovered } from "../../utilities/hooks/useHovered";

const ScrollingContainer: FC<PropsWithChildren<unknown>> = (
  props: PropsWithChildren<unknown>
) => {
  const { children } = props;

  const containerRef = useRef<HTMLDivElement>();
  const startTimeRef = useRef<number>();
  const timerRef = useRef<NodeJS.Timeout | number>();
  const hovered = useHovered(containerRef);
  const [animating, setAnimating] = useState<boolean>(false);

  useEffect(() => {
    if (hovered) {
      if (!animating) {
        startTimeRef.current = Date.now();
        timerRef.current = setTimeout(() => {
          setAnimating(false);
        }, 20000 - (Date.now() - startTimeRef.current));
        setAnimating(true);
      } else {
        clearTimeout(timerRef.current);
        setAnimating(false);
      }
    } else {
      if (!animating) {
        timerRef.current = setTimeout(() => {
          setAnimating(false);
        }, 20000 - (Date.now() - (startTimeRef.current ?? 0)));
        setAnimating(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered]);

  const xDistance =
    (containerRef.current?.clientWidth ?? 0) -
      (containerRef.current?.parentElement?.clientWidth ?? 0) >
    0
      ? (containerRef.current?.clientWidth ?? 0) -
        (containerRef.current?.parentElement?.clientWidth ?? 0)
      : 0;

  return (
    <StyledTitleScrollingContainer
      ref={containerRef}
      animating={animating}
      xDistance={xDistance}
    >
      {children}
    </StyledTitleScrollingContainer>
  );
};

const moveX = (xDistance: number) => keyframes`
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-${xDistance}px);
    mask-image: none;
  }
  100% {
    transform: translateX(0)
  }
`;

const StyledTitleScrollingContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== "animating" && prop !== "xDistance",
})<{ animating: boolean; xDistance: number }>(({ animating, xDistance }) => ({
  maskImage:
    xDistance > 0
      ? "linear-gradient(90deg,transparent 0,#000 -6px,#000 calc(100% - 12px),transparent)"
      : "none",
  overflow: "hidden",
  textOverflow: "clip",
  whiteSpace: "nowrap",
  width: "fit-content",
  animation: `${moveX(xDistance)} 20s linear`,
  animationPlayState: animating ? "running" : "paused",
}));

export default ScrollingContainer;
