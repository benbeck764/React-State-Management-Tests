import { FC, useState } from "react";
import { useGetTopArtistsQuery } from "../../state/queries/spotify.api";
import ArtistsGrid from "../common/ArtistsGrid/ArtistsGrid";
import Stack from "@mui/material/Stack";
import { SpotifyArtist } from "../../state/queries/models/spotify.models";
import { useNavigate } from "react-router-dom";
import { getArtistUrl } from "../../routing/common/url";
import { AppGridDataRequest } from "@benbeck764/react-components-grid/Grid";
import { useDebounce } from "../../utilities/hooks/useDebounce";
import Greeting from "./Greeting";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const Home: FC = () => {
  const navigate = useNavigate();

  const [dataRequest, setDataRequest] = useState<AppGridDataRequest>({
    pageNumber: 0,
    pageSize: 16,
  });

  const debouncedDataRequest = useDebounce(dataRequest, 300);

  const { data, isFetching } = useGetTopArtistsQuery({
    limit: debouncedDataRequest.pageSize,
    offset: debouncedDataRequest.pageSize * debouncedDataRequest.pageNumber,
  });

  const handleArtistSelected = (artist: SpotifyArtist) => {
    navigate(getArtistUrl(artist.id), { state: artist });
  };

  const handleDataRequested = (newDataRequest: AppGridDataRequest) => {
    setDataRequest(newDataRequest);
  };

  return (
    <Stack gap={5}>
      <Greeting />
      <Box>
        <Typography variant="h4">Favorite Artists</Typography>
        <ArtistsGrid
          data={data}
          loading={isFetching}
          onArtistSelected={handleArtistSelected}
          onDataRequested={handleDataRequested}
          cardVariant="small"
        />
      </Box>
    </Stack>
  );
};

export default Home;
