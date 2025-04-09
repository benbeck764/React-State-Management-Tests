import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { keyframes, styled } from "@mui/material/styles";
import { FC } from "react";

type EqualizerProps = {
  size?: "small" | "large";
};

const Equalizer: FC<EqualizerProps> = (props: EqualizerProps) => {
  const { size = "small" } = props;

  let dimensionSize = "32px";
  let barWidth = "2px";
  switch (size) {
    case "small":
      dimensionSize = "14px";
      barWidth = "2px";
      break;

    case "large":
      dimensionSize = "28px";
      barWidth = "4px";
      break;
  }

  return (
    <Box
      sx={{
        width: dimensionSize,
        height: dimensionSize,
        transform: "rotate(180deg)",
      }}
    >
      <Stack direction="row" gap={barWidth}>
        <StyledEqualizerBar
          delay={0.1}
          dimensionSize={dimensionSize}
          barWidth={barWidth}
        />
        <StyledEqualizerBar
          delay={0.2}
          dimensionSize={dimensionSize}
          barWidth={barWidth}
        />
        <StyledEqualizerBar
          delay={0.4}
          dimensionSize={dimensionSize}
          barWidth={barWidth}
        />
        <StyledEqualizerBar
          delay={0.9}
          dimensionSize={dimensionSize}
          barWidth={barWidth}
        />
      </Stack>
    </Box>
  );
};

export default Equalizer;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const bounce = (height: string) => keyframes`
  0% {
    height: 0px;
  }
  100% {
    height: ${height};
  }
`;

export const StyledEqualizerBar = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== "delay" && prop !== "dimensionSize" && prop !== "barWidth",
})<{
  delay: number;
  dimensionSize: string;
  barWidth: string;
}>(({ theme, delay, dimensionSize, barWidth }) => ({
  backgroundColor: theme.palette.primary.main,
  width: barWidth,
  transition: `height 1s ease-in-out ${delay}s`,
  animation: `${bounce(dimensionSize)} 0.5s infinite alternate ${delay}s`,
}));
