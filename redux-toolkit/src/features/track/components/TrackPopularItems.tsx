import { FC } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { capitalize } from "@mui/material/utils";
import { TypographySkeleton } from "@benbeck764/react-components/common";
import {
  DiscographyType,
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
  variant: "releases" | "albums" | "singles";
  artists?: SpotifyArtist[];
  onAlbumSelected: (album: SpotifyAlbum) => void;
};

const TrackPopularItems: FC<TrackPopularAlbumsProps> = (
  props: TrackPopularAlbumsProps
) => {
  const { variant, artists, onAlbumSelected } = props;

  const { data: artistAlbumsResponse, isFetching: loadingArtistAlbums } =
    useGetArtistAlbumsQuery(
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      { id: artists?.[0]?.id!, limit: 50 }, // Max 50 per API spec
      { skip: !artists || variant === "singles" }
    );

  const { data: artistSinglesResponse, isFetching: loadingArtistSingles } =
    useGetArtistAlbumsQuery(
      {
        /* eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain */
        id: artists?.[0]?.id!,
        limit: 50,
        include_groups: "single",
      }, // Max 50 per API spec
      { skip: !artists || variant !== "singles" }
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
        skip:
          !artistAlbumsResponse ||
          loadingArtistAlbums ||
          variant !== "releases",
      }
    );

  let popularReleases = multipleAlbums ? [...multipleAlbums] : undefined;
  if (popularReleases) {
    popularReleases = popularReleases.sort(
      (a: SpotifyAlbum, b: SpotifyAlbum) => b.popularity - a.popularity
    );
    popularReleases = popularReleases.slice(0, 6);
  }

  const popularAlbums = artistAlbumsResponse?.items?.slice(0, 6);
  const popularSingles = artistSinglesResponse?.items?.slice(0, 6);

  const artist = artists?.[0];
  const loading =
    loadingArtistAlbums || loadingArtistSingles || loadingPopularAlbums;

  if (loading || !artist) {
    return (
      <Stack gap={1}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <TypographySkeleton
            variant="h4"
            charCount={22}
            charCountVariance={8}
          />
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
    let albums: SpotifyAlbum[] | undefined;
    let discographyType: DiscographyType;
    let title: string;
    switch (variant) {
      case "releases":
        albums = popularReleases;
        discographyType = "album";
        title = `Popular ${capitalize(variant)} by ${artist.name}`;
        break;
      case "albums":
        albums = popularAlbums as SpotifyAlbum[] | undefined;
        discographyType = "album";
        title = `Popular ${capitalize(variant)} by ${artist.name}`;
        break;
      case "singles":
        albums = popularSingles as SpotifyAlbum[] | undefined;
        discographyType = "single";
        title = `Popular Singles and EPs by ${artist.name}`;
        break;
    }
    return (
      <Stack gap={1}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <AppLink to={getDiscographyUrl(artist.id, discographyType)}>
            <Typography variant="h4">{title}</Typography>
          </AppLink>
          <AppLink to={getDiscographyUrl(artist.id, discographyType)}>
            <Typography
              variant="paragraphSmallBold"
              sx={{ color: (theme) => theme.palette.grey[400] }}
            >
              Show all
            </Typography>
          </AppLink>
        </Stack>
        <AlbumsGrid
          data={albums}
          loading={loading}
          cardType="minimal"
          pageSize={6}
          onAlbumSelected={onAlbumSelected}
        />
      </Stack>
    );
  }
};

export default TrackPopularItems;
