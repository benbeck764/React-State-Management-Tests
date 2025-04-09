import Box from '@mui/material/Box';
import { keyframes, styled } from '@mui/material/styles';

type StyledBarProps = {
  delay: number;
  dimensionSize: string;
  barWidth: string;
};

const bounce = (height: string) => keyframes`
  0% { height: 0px; }
  100% { height: ${height}; }
`;

export const StyledEqualizerBar = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'delay' && prop !== 'dimensionSize' && prop !== 'barWidth'
})<StyledBarProps>(({ theme, ...props }) => ({
  backgroundColor: theme.palette.primary.main,
  width: props.barWidth,
  transition: `height 1s ease-in-out ${props.delay}s`,
  animation: `${bounce(props.dimensionSize)} 0.5s infinite alternate ${props.delay}s`
}));
