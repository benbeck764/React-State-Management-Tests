import { FC, Fragment } from "react";
import { useLocation, useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useGetAlbumQuery } from "../../state/queries/album.api";
import TrackListing from "../common/TrackListing/TrackListing";
import AppCard from "@benbeck764/react-components/Card";
import Box from "@mui/material/Box";
import {
  SimplifiedSpotifyArtist,
  SimplifiedSpotifyTrack,
  SpotifyAlbum,
} from "../../state/queries/models/spotify.models";
import { AppLink } from "../common/AppLink";
import { getArtistUrl } from "../../routing/common/url";
import PlayButton from "../player/PlayButton";
import FavoriteButton from "../common/FavoriteButton";
import Skeleton from "@mui/material/Skeleton";
import { TypographySkeleton } from "@benbeck764/react-components/common";
import { getAlbumType } from "../../utilities/spotify.utils";
import { formatAsLongDurationString } from "../../utilities/time";

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
        <Stack direction="row" gap={2} py={2}>
          <Stack>
            <Skeleton variant="rectangular" height={250} width={250}></Skeleton>
          </Stack>
          <Stack justifyContent="flex-end">
            <Stack gap={0.75}>
              <TypographySkeleton variant="paragraphBold" charCount={6} />
              <TypographySkeleton
                variant="h3"
                charCount={15}
                charCountVariance={5}
              />
              <Stack direction="row" gap={1}>
                <TypographySkeleton variant="paragraphBold" charCount={6} />
                <TypographySkeleton variant="paragraph" charCount={4} />
                <TypographySkeleton variant="paragraph" charCount={6} />
                <TypographySkeleton variant="paragraph" charCount={20} />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
        <TrackListing loading={true} />
      </Stack>
    );
  } else {
    const albumTotalDuration = album.tracks.items.reduce<number>(
      (total: number, track: SimplifiedSpotifyTrack) =>
        total + track.duration_ms,
      0
    );

    return (
      <Stack gap={1}>
        <Stack direction="row" gap={2} py={2}>
          <Stack>
            <Box
              component="img"
              height={250}
              width={250}
              src={album.images?.[0]?.url}
            />
          </Stack>
          <Stack justifyContent="flex-end">
            <Stack gap={0.75}>
              <Typography variant="paragraphBold">
                {getAlbumType(album)}
              </Typography>
              <Typography variant="h3">{album.name}</Typography>

              <Stack direction="row" gap={1}>
                {album.artists.map(
                  (a: SimplifiedSpotifyArtist, index: number) => (
                    <Fragment key={index}>
                      <AppLink to={getArtistUrl(a.id)} state={a}>
                        <Typography variant="paragraphBold">{`${a.name}`}</Typography>
                      </AppLink>
                      <Typography variant="paragraphBold">{` • `}</Typography>
                    </Fragment>
                  )
                )}
                <Typography>
                  {`${new Date(album.release_date).getFullYear()} • ${
                    album.total_tracks
                  } song${
                    album.total_tracks > 1 ? "s" : ""
                  }, ${formatAsLongDurationString(albumTotalDuration)}`}
                </Typography>
              </Stack>
            </Stack>
          </Stack>
        </Stack>

        <AppCard paperSx={{ p: 2, borderRadius: "16px" }}>
          <Stack direction="row" gap={2} alignItems="center">
            <PlayButton
              type="album"
              variant="action-button"
              dataUri={album.uri}
              size="large"
            />
            <FavoriteButton type="album" itemId={album.id} size="large" />
          </Stack>
          <TrackListing album={album} />
        </AppCard>
      </Stack>
    );
  }
};

export default Album;
