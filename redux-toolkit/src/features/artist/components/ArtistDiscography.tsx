import { FC } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { TypographySkeleton } from "@benbeck764/react-components/common";
import { getDiscographyUrl } from "../../../routing/common/url";
import {
  SimplifiedSpotifyAlbum,
  SpotifyAlbum,
  SpotifyArtist,
} from "../../../state/queries/models/spotify.models";
import AlbumsGrid from "../../common/AlbumsGrid/AlbumsGrid";
import { AppLink } from "../../common/AppLink";
import { useGetArtistAlbumsQuery } from "../../../state/queries/artist.api";
import { useGetMultipleAlbumsQuery } from "../../../state/queries/album.api";

type ArtistDiscographyProps = {
  artist?: SpotifyArtist | null;
  onAlbumSelected: (artist: SpotifyAlbum) => void;
};

const ArtistDiscography: FC<ArtistDiscographyProps> = (
  props: ArtistDiscographyProps
) => {
  const { artist, onAlbumSelected } = props;

  const { data: artistAllAlbumsResponse, isFetching: loadingArtistAllAlbums } =
    useGetArtistAlbumsQuery(
      {
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        id: artist?.id!,
        limit: 50,
        include_groups: "album,single,compilation",
      },
      { skip: !artist?.id }
    );

  const { data: multipleAlbums, isFetching: loadingMultipleAlbums } =
    useGetMultipleAlbumsQuery(
      {
        /* eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain */
        ids: artistAllAlbumsResponse?.items?.map(
          (a: SimplifiedSpotifyAlbum) => a.id
        )!,
      },
      {
        skip: !artistAllAlbumsResponse || loadingArtistAllAlbums,
      }
    );

  //   const { data: artistAlbumsResponse, isFetching: loadingArtistAlbums } =
  //     useGetArtistAlbumsQuery(
  //       {
  //         // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  //         id: artist?.id!,
  //         limit: 6,
  //         include_groups: "album",
  //       },
  //       { skip: !artist?.id }
  //     );

  //   const { data: artistSinglesResponse, isFetching: loadingArtistSingles } =
  //     useGetArtistAlbumsQuery(
  //       {
  //         // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  //         id: artist?.id!,
  //         limit: 6,
  //         include_groups: "single",
  //       },
  //       { skip: !artist?.id }
  //     );

  //   const {
  //     data: artistCompilationsResponse,
  //     isFetching: loadingArtistCompilations,
  //   } = useGetArtistAlbumsQuery(
  //     {
  //       // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  //       id: artist?.id!,
  //       limit: 6,
  //       include_groups: "compilation",
  //     },
  //     { skip: !artist?.id }
  //   );

  let latestRelease: SimplifiedSpotifyAlbum | undefined = undefined;
  if (artistAllAlbumsResponse?.items) {
    latestRelease = [...artistAllAlbumsResponse.items].sort(
      (a, b) =>
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
    )?.[0];
  }

  let popularReleases = multipleAlbums ? [...multipleAlbums] : undefined;
  if (popularReleases && latestRelease) {
    popularReleases = popularReleases.sort(
      (a: SpotifyAlbum, b: SpotifyAlbum) => b.popularity - a.popularity
    );
    popularReleases = [
      latestRelease as unknown as SpotifyAlbum,
      ...popularReleases.slice(0, 5),
    ];
  }

  const allAlbums = artistAllAlbumsResponse?.items?.filter(
    (a: SimplifiedSpotifyAlbum) => a.album_type === "album"
  );
  const albums =
    latestRelease?.album_type === "album"
      ? [latestRelease, ...(allAlbums?.slice(0, 5) ?? [])]
      : allAlbums?.slice(0, 6);

  const allSingles = artistAllAlbumsResponse?.items?.filter(
    (a: SimplifiedSpotifyAlbum) => a.album_type === "single"
  );
  const singles =
    latestRelease?.album_type === "single"
      ? [latestRelease, ...(allSingles?.slice(0, 5) ?? [])]
      : allSingles?.slice(0, 6);

  const allCompilations = artistAllAlbumsResponse?.items?.filter(
    (a: SimplifiedSpotifyAlbum) =>
      a.album_type === "compilation" && a.album_group === "compilation"
  );
  const compilations =
    latestRelease?.album_type === "compilation" &&
    latestRelease.album_group === "compilation"
      ? [latestRelease, ...(allCompilations?.slice(0, 5) ?? [])]
      : allCompilations?.slice(0, 6);

  const loading = loadingArtistAllAlbums || loadingMultipleAlbums;

  if (!artist || loading) {
    return (
      <Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <TypographySkeleton variant="h4" charCount={11} />
          <TypographySkeleton variant="paragraphBold" charCount={8} />
        </Stack>
        <AlbumsGrid data={undefined} loading={true} pageSize={6} />
      </Stack>
    );
  } else {
    return (
      <Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="h4">Discography</Typography>
          <AppLink to={getDiscographyUrl(artist.id, "all")}>
            <Typography
              variant="paragraphBold"
              sx={{ color: (theme) => theme.palette.grey[400] }}
            >
              Show all
            </Typography>
          </AppLink>
        </Stack>
        <AlbumsGrid
          data={popularReleases}
          loading={loading}
          onAlbumSelected={onAlbumSelected}
          pageSize={6}
        />
      </Stack>
    );
  }
};

export default ArtistDiscography;
