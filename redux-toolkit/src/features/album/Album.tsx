import { FC, Fragment } from "react";
import { useLocation, useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useGetAlbumQuery } from "../../state/queries/album.api";
import TrackListing from "../common/TrackListing";
import AppCard from "@benbeck764/react-components/Card";
import Box from "@mui/material/Box";
import { capitalize } from "@mui/material/utils";
import {
  SimplifiedSpotifyArtist,
  SpotifyAlbum,
} from "../../state/queries/models/spotify.models";
import { AppLink } from "../common/AppLink";
import { getArtistUrl } from "../../routing/common/url";

const Album: FC = () => {
  const location = useLocation();
  const params = useParams();
  const albumId = params["albumId"];
  const state = location.state as SpotifyAlbum | null;

  const skipQuery = !albumId || typeof state?.tracks !== "undefined";

  const { data: queriedAlbum, isFetching: loading } = useGetAlbumQuery(
    { id: albumId! },
    { skip: skipQuery }
  );

  const album = skipQuery ? state : queriedAlbum;

  if (loading || !album) {
    return (
      <Stack gap={1}>
        <TrackListing loading={true} />
      </Stack>
    );
  } else {
    return (
      <Stack gap={1}>
        <Stack direction="row" gap={2} py={2}>
          <Stack>
            <Box
              component="img"
              height={250}
              width={250}
              src={album.images[0].url}
            ></Box>
          </Stack>
          <Stack justifyContent="flex-end">
            <Stack gap={0.75}>
              <Typography variant="paragraphBold">
                {capitalize(album.album_type)}
              </Typography>
              <Typography variant="h2">{album.name}</Typography>

              <Stack direction="row" gap={1}>
                {album.artists.map(
                  (a: SimplifiedSpotifyArtist, index: number) => (
                    <Fragment key={index}>
                      <AppLink to={getArtistUrl(a.id)}>
                        <Typography variant="paragraphBold">{`${a.name}`}</Typography>
                      </AppLink>
                      <Typography variant="paragraphBold">{` • `}</Typography>
                    </Fragment>
                  )
                )}
                <Typography>
                  {`${new Date(album.release_date).getFullYear()} • ${
                    album.total_tracks
                  } song${album.total_tracks > 1 ? "s" : ""}`}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <AppCard paperSx={{ p: 2, borderRadius: "16px" }}>
          <TrackListing album={album} />
        </AppCard>
      </Stack>
    );
  }
};

export default Album;
