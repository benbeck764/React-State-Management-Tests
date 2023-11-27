import { FC } from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import { TypographySkeleton } from "@benbeck764/react-components/common";
import {
  SimplifiedSpotifyAlbum,
  SpotifyAlbum,
  SpotifyArtist,
} from "../../../state/queries/models/spotify.models";
import AlbumsGrid from "../../common/AlbumsGrid/AlbumsGrid";
import { AppLink } from "../../common/AppLink";
import { getDiscographyUrl } from "../../../routing/common/url";
import { useGetMultipleAlbumsQuery } from "../../../state/queries/album.api";
import { useGetArtistAlbumsQuery } from "../../../state/queries/artist.api";

type TrackPopularAlbumsProps = {
  artist?: SpotifyArtist;
  onAlbumSelected: (album: SpotifyAlbum) => void;
};

const TrackArtistsPopularItems: FC<TrackPopularAlbumsProps> = (
  props: TrackPopularAlbumsProps
) => {
  const { artist, onAlbumSelected } = props;

  const { data: artistAlbumsResponse, isFetching: loadingArtistAlbums } =
    useGetArtistAlbumsQuery(
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      { id: artist?.id!, limit: 50, include_groups: "album,single" }, // Max 50 per API spec
      { skip: !artist }
    );

  const { data: multipleAlbums, isFetching: loadingPopularAlbums } =
    useGetMultipleAlbumsQuery(
      {
        /* eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain */
        ids: artistAlbumsResponse?.items?.map(
          (a: SimplifiedSpotifyAlbum) => a.id
        )!,
      },
      {
        skip: !artistAlbumsResponse || loadingArtistAlbums,
      }
    );

  let popularReleases = multipleAlbums ? [...multipleAlbums] : undefined;
  if (popularReleases) {
    popularReleases = popularReleases.sort(
      (a: SpotifyAlbum, b: SpotifyAlbum) => b.popularity - a.popularity
    );
    popularReleases = popularReleases.slice(0, 6);
  }

  const loading = loadingArtistAlbums || loadingPopularAlbums;

  if (loading || !artist) {
    return (
      <Stack gap={1}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center" gap={1}>
            <Skeleton variant="circular" height={48} width={48} />
            <Stack>
              <TypographySkeleton
                variant="paragraphExtraSmallBold"
                charCount={16}
              />
              <TypographySkeleton
                variant="h4"
                charCount={22}
                charCountVariance={8}
              />
            </Stack>
          </Stack>

          <TypographySkeleton variant="paragraphSmallBold" charCount={8} />
        </Stack>
        <AlbumsGrid
          data={undefined}
          loading={true}
          pageSize={6}
          cardType="minimal"
        />
      </Stack>
    );
  } else {
    return (
      <Stack gap={1}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack direction="row" alignItems="center" gap={1}>
            <Avatar
              variant="circular"
              src={artist.images?.[0]?.url}
              sx={{ height: 48, width: 48 }}
            />
            <Stack>
              <Typography
                variant="paragraphExtraSmallBold"
                sx={{ color: (theme) => theme.palette.grey[400] }}
              >
                Popular releases
              </Typography>
              <AppLink to={getDiscographyUrl(artist.id, "album")}>
                <Typography variant="h4">{artist.name}</Typography>
              </AppLink>
            </Stack>
          </Stack>
          <AppLink to={getDiscographyUrl(artist.id, "album")}>
            <Typography
              variant="paragraphSmallBold"
              sx={{ color: (theme) => theme.palette.grey[400] }}
            >
              Show all
            </Typography>
          </AppLink>
        </Stack>
        <AlbumsGrid
          data={popularReleases as SpotifyAlbum[] | undefined}
          loading={loading}
          cardType="minimal"
          pageSize={6}
          onAlbumSelected={onAlbumSelected}
        />
      </Stack>
    );
  }
};

export default TrackArtistsPopularItems;
