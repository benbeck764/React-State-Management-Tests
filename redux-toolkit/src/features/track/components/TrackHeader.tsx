import { FC } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { TypographySkeleton } from "@benbeck764/react-components/common";
import {
  SpotifyArtist,
  SpotifyTrack,
} from "../../../state/queries/models/spotify.models";
import { formatMilliseconds } from "../../../utilities/number";
import { getAlbumUrl, getArtistUrl } from "../../../routing/common/url";
import { AppLink } from "../../common/AppLink";

type TrackHeaderProps = {
  loading: boolean;
  track?: SpotifyTrack | null;
  artist?: SpotifyArtist;
};

const TrackHeader: FC<TrackHeaderProps> = (props: TrackHeaderProps) => {
  const { loading, track, artist } = props;
  if (loading || !track || !artist) {
    return (
      <Stack gap={1}>
        <Stack direction="row" gap={2} py={2}>
          <Stack>
            <Skeleton variant="rectangular" height={250} width={250} />
          </Stack>
          <Stack justifyContent="flex-end">
            <Stack gap={0.75}>
              <TypographySkeleton variant="paragraphExtraSmall" charCount={4} />
              <TypographySkeleton
                variant="h3"
                charCount={13}
                charCountVariance={7}
              />

              <Stack direction="row" gap={0.5} alignItems="center">
                <Skeleton variant="circular" height={20} width={20} />
                <TypographySkeleton
                  variant="paragraphSmallBold"
                  charCount={12}
                  charCountVariance={5}
                />
                <TypographySkeleton variant="paragraphSmall" charCount={1} />
                <TypographySkeleton
                  variant="paragraphSmall"
                  charCount={12}
                  charCountVariance={5}
                />
                <TypographySkeleton variant="paragraphSmall" charCount={1} />
                <TypographySkeleton variant="paragraphSmall" charCount={4} />
                <TypographySkeleton variant="paragraphSmall" charCount={1} />
                <TypographySkeleton variant="paragraphSmall" charCount={5} />
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    );
  } else {
    const album = track.album;

    return (
      <Stack>
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
                <Typography variant="paragraphExtraSmall">Song</Typography>
                <Typography variant="h3">{track.name}</Typography>

                <Stack direction="row" gap={0.5} alignItems="center">
                  <Avatar
                    variant="circular"
                    src={artist?.images?.[0]?.url}
                    alt={artist?.name}
                    sx={{ height: 20, width: 20 }}
                  />
                  <AppLink to={getArtistUrl(artist.id)}>
                    <Typography variant="paragraphSmallBold">
                      {artist.name}
                    </Typography>
                  </AppLink>
                  <Typography variant="paragraphSmall">•</Typography>
                  <AppLink to={getAlbumUrl(album.id)}>
                    <Typography variant="paragraphSmall">
                      {album.name}
                    </Typography>
                  </AppLink>
                  <Typography variant="paragraphSmall">•</Typography>
                  <Typography variant="paragraphSmall">{`${new Date(
                    album.release_date
                  ).getFullYear()}`}</Typography>
                  <Typography variant="paragraphSmall">•</Typography>
                  <Typography variant="paragraphSmall">
                    {formatMilliseconds(track.duration_ms)}
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    );
  }
};

export default TrackHeader;
