import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { keyframes, styled } from "@mui/material/styles";
import { FC } from "react";

const Equalizer: FC = () => {
  //
  return (
    <Box sx={{ width: "14px", height: "14px", transform: "rotate(180deg)" }}>
      <Stack direction="row" gap="2px">
        <StyledEqualizerBar delay={0.1} />
        <StyledEqualizerBar delay={0.2} />
        <StyledEqualizerBar delay={0.4} />
        <StyledEqualizerBar delay={0.9} />
      </Stack>
    </Box>
  );
};

export default Equalizer;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const bounce = keyframes`
  0% {
    height: 0px;
  }
  100% {
    height: 14px;
  }
`;

export const StyledEqualizerBar = styled(Box)<{ delay: number }>(
  ({ theme, delay }) => ({
    backgroundColor: theme.palette.primary.main,
    width: "2px",
    transition: `height 1s ease-in-out ${delay}s`,
    animation: `${bounce} 0.5s infinite alternate ${delay}s`,
  })
);
