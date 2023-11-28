import { FC, useMemo, useState } from "react";
import Chip from "@mui/material/Chip";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { TypographySkeleton } from "@benbeck764/react-components/common";
import { getDiscographyUrl } from "../../../routing/common/url";
import {
  DiscographyType,
  SimplifiedSpotifyAlbum,
  SpotifyAlbum,
  SpotifyArtist,
} from "../../../state/queries/models/spotify.models";
import AlbumsGrid from "../../common/AlbumsGrid/AlbumsGrid";
import { AppLink } from "../../common/AppLink";
import { useGetArtistAlbumsQuery } from "../../../state/queries/artist.api";
import { useGetMultipleAlbumsQuery } from "../../../state/queries/album.api";
import { debounce } from "@mui/material/utils";

type DiscographyState = {
  type: DiscographyType;
  title: string;
  selected: boolean;
};

type ArtistDiscographyProps = {
  artist?: SpotifyArtist | null;
  onAlbumSelected: (artist: SpotifyAlbum) => void;
};

const ArtistDiscography: FC<ArtistDiscographyProps> = (
  props: ArtistDiscographyProps
) => {
  const { artist, onAlbumSelected } = props;

  //#region Data Fetching
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

  let latestRelease: SpotifyAlbum | undefined = undefined;
  if (artistAllAlbumsResponse?.items) {
    latestRelease = [...artistAllAlbumsResponse.items].sort(
      (a, b) =>
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
    )?.[0] as unknown as SpotifyAlbum | undefined;
  }

  let popularReleases = multipleAlbums ? [...multipleAlbums] : undefined;
  if (popularReleases && latestRelease) {
    popularReleases = popularReleases.sort(
      (a: SpotifyAlbum, b: SpotifyAlbum) => b.popularity - a.popularity
    );
    popularReleases = [latestRelease, ...popularReleases.slice(0, 5)];
  }

  const allAlbums = artistAllAlbumsResponse?.items?.filter(
    (a: SimplifiedSpotifyAlbum) => a.album_type === "album"
  ) as SpotifyAlbum[] | undefined;
  const albums = allAlbums?.slice(0, 6);

  const allSingles = artistAllAlbumsResponse?.items?.filter(
    (a: SimplifiedSpotifyAlbum) => a.album_type === "single"
  ) as SpotifyAlbum[] | undefined;
  const singles = allSingles?.slice(0, 6);

  const allCompilations = artistAllAlbumsResponse?.items?.filter(
    (a: SimplifiedSpotifyAlbum) =>
      a.album_type === "compilation" && a.album_group === "compilation"
  ) as SpotifyAlbum[] | undefined;
  const compilations = allCompilations?.slice(0, 6);

  const loading = loadingArtistAllAlbums || loadingMultipleAlbums;

  //#endregion

  //#region State

  const discographyTypeToTitle: Record<DiscographyType, string> = {
    all: "Popular releases",
    album: "Albums",
    single: "Singles and EPs",
    compilation: "Compilations",
  };

  const discographyTypes: DiscographyType[] = [
    "all",
    "album",
    "single",
    "compilation",
  ];

  const [discographyState, setDiscographyState] = useState<DiscographyState[]>(
    discographyTypes.map((dt: DiscographyType) => {
      return {
        type: dt,
        title: discographyTypeToTitle[dt],
        selected: dt === "all",
      };
    })
  );
  const selected = discographyState.find(
    (s: DiscographyState) => s.selected === true
  );

  const discographyTypeExists = (type: DiscographyType) => {
    let exists = false;
    switch (type) {
      case "all":
        exists =
          typeof popularReleases !== "undefined" && popularReleases.length > 0;
        break;
      case "album":
        exists = typeof allAlbums !== "undefined" && allAlbums.length > 0;
        break;
      case "single":
        exists = typeof allSingles !== "undefined" && allSingles.length > 0;
        break;
      case "compilation":
        exists =
          typeof allCompilations !== "undefined" && allCompilations.length > 0;
        break;
    }

    return exists;
  };

  const handleSelectDiscographyType = (type: DiscographyType) => {
    console.log("bruh");
    setDiscographyState((prev: DiscographyState[]) =>
      prev.map((dt: DiscographyState) => ({
        ...dt,
        selected: dt.type === type,
      }))
    );
  };

  const debouncedSelectDiscographyType = useMemo(
    () => debounce(handleSelectDiscographyType, 150),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selected]
  );

  //#endregion

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
        <Stack direction="row" alignItems="center" gap={1} mt={2}>
          {Array.from(Array(4).keys()).map((num: number) => (
            <Skeleton
              key={num}
              variant="rounded"
              width={60}
              height={28}
              sx={{ borderRadius: "500px" }}
            />
          ))}
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
          <AppLink to={getDiscographyUrl(artist.id, selected?.type ?? "all")}>
            <Typography
              variant="paragraphBold"
              sx={{ color: (theme) => theme.palette.grey[400] }}
            >
              Show all
            </Typography>
          </AppLink>
        </Stack>
        <Stack direction="row" alignItems="center" gap={1} mt={2}>
          {discographyState.map((s: DiscographyState) => {
            if (discographyTypeExists(s.type))
              return (
                <Chip
                  key={s.type}
                  variant="filled"
                  onClick={() => debouncedSelectDiscographyType(s.type)}
                  label={
                    <Typography
                      variant="paragraphSmall"
                      sx={{
                        color: (theme) =>
                          s.selected
                            ? theme.palette.grey[800]
                            : theme.palette.text.primary,
                      }}
                    >
                      {s.title}
                    </Typography>
                  }
                  sx={{
                    height: 28,
                    backgroundColor: (theme) =>
                      s.selected
                        ? theme.palette.text.primary
                        : theme.palette.grey[800],
                    "&:hover": {
                      backgroundColor: (theme) =>
                        s.selected
                          ? theme.palette.text.primary
                          : theme.palette.coolGrey[800],
                    },
                  }}
                />
              );
          })}
        </Stack>
        <AlbumsGrid
          data={
            selected?.type === "all"
              ? popularReleases
              : selected?.type === "album"
              ? albums
              : selected?.type === "single"
              ? singles
              : selected?.type === "compilation"
              ? compilations
              : undefined
          }
          loading={loading}
          latestRelease={
            selected?.type === "all" ||
            selected?.type === latestRelease?.album_type
          }
          onAlbumSelected={onAlbumSelected}
          pageSize={6}
        />
      </Stack>
    );
  }
};

export default ArtistDiscography;
