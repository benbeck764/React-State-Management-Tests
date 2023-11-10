import { FC } from "react";
import { useParams } from "react-router-dom";
import { useGetTopArtistsQuery } from "../../state/queries/spotify.api";
import { SpotifyArtist } from "../../state/queries/models/spotify.models";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DiscographyGrid from "../common/DiscographyGrid/DiscographyGrid";
import {
  useGetArtistAlbumsQuery,
  useGetArtistDiscographyQuery,
} from "../../state/queries/artist.api";
import { AppLink } from "../common/AppLink";
import { getArtistUrl } from "../../routing/common/url";

const ArtistDiscography: FC = () => {
  const params = useParams();
  const artistId = params["artistId"];

  const { artist } = useGetTopArtistsQuery(
    {},
    {
      selectFromResult: (res) => ({
        artist: res.data?.items.find((a: SpotifyArtist) => a.id === artistId),
      }),
    }
  );

  const { data: albumsData, isLoading: isLoadingAlbums } =
    useGetArtistAlbumsQuery({ id: artistId!, limit: 20 }, { skip: !artistId });
  const { data: discographyData, isLoading: isLoadingDiscography } =
    useGetArtistDiscographyQuery(
      {
        ids: albumsData?.items
          ? albumsData.items.map((a) => a.id).join(",")
          : "",
      },
      { skip: !artistId || isLoadingAlbums || !albumsData?.items?.length }
    );

  return (
    <Stack gap={1}>
      <AppLink to={getArtistUrl(artistId!)}>
        <Typography variant="h2">{artist?.name}</Typography>
      </AppLink>
      <Stack gap={2}>
        <DiscographyGrid
          data={discographyData}
          loading={isLoadingDiscography}
          onAlbumSelected={() => void 0}
        />
      </Stack>
    </Stack>
  );
};

export default ArtistDiscography;
