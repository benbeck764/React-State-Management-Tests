import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { keyframes, styled } from "@mui/material/styles";

const rotate = () => keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const StyledDeviceRefreshButton = styled(IconButton, {
  shouldForwardProp: (prop) => prop !== "fetching",
})<{
  fetching: boolean;
}>(({ fetching }) => ({
  ...(fetching && {
    animation: `${rotate()} 0.25s linear infinite`,
  }),
}));

export const StyledDeviceRow = styled(Stack)(({ theme }) => ({
  padding: "16px 16px",
  cursor: "pointer",
  borderRadius: theme.shape.borderRadius,
  "&:hover": {
    backgroundColor: theme.palette.coolGrey[800],
  },
  "&:focus": {
    backgroundColor: theme.palette.coolGrey[800],
    outline: "none",
  },
  flexDirection: "row",
  alignItems: "center",
  gap: theme.spacing(2),
}));
