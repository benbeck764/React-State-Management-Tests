import { FC } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const Search: FC = () => {
  return (
    <Stack gap={5}>
      <Box>
        <Typography variant="h4">Search</Typography>
      </Box>
    </Stack>
  );
};

export default Search;
