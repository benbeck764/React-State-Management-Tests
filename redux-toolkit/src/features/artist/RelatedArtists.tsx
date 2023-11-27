import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useGetArtistRelatedArtistsQuery } from "../../state/queries/artist.api";
import { getArtistUrl } from "../../routing/common/url";
import { SpotifyArtist } from "../../state/queries/models/spotify.models";
import ArtistsGrid from "../common/ArtistsGrid/ArtistsGrid";

const RelatedArtists: FC = () => {
  const navigate = useNavigate();

  const params = useParams();
  const artistId = params["artistId"];

  const { data: relatedArtistsResponse, isFetching: loading } =
    useGetArtistRelatedArtistsQuery(
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      { id: artistId! },
      { skip: !artistId }
    );

  const relatedArtists = relatedArtistsResponse?.artists;

  const handleArtistSelected = (artist: SpotifyArtist) => {
    navigate(getArtistUrl(artist.id), { state: artist });
  };

  return (
    <Stack gap={1}>
      <Typography variant="h4">Fans also like</Typography>
      <ArtistsGrid
        data={relatedArtists}
        cardVariant="large"
        loading={loading}
        pageSize={6}
        onArtistSelected={handleArtistSelected}
      />
    </Stack>
  );
};

export default RelatedArtists;
