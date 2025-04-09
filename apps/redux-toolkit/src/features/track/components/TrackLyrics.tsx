import { FC } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { TypographySkeleton } from "@benbeck764/react-components/common";
import {
  SpotifyArtist,
  SpotifyTrack,
} from "../../../state/queries/models/spotify.models";
import {
  useGeniusSearchQuery,
  useGetGeniusLyricsQuery,
} from "../../../state/queries/genius.api";

type TrackLyricsProps = {
  track?: SpotifyTrack | null;
};

const TrackLyrics: FC<TrackLyricsProps> = (props: TrackLyricsProps) => {
  const { track } = props;

  const getTitle = (title: string, artists: SpotifyArtist[]) => {
    const artist = artists?.[0]?.name;
    const searchQuery = `${title} ${artist}`;

    return searchQuery
      .toLowerCase()
      .replace(/ *\([^)]*\) */g, "")
      .replace(/ *\[[^\]]*]/, "")
      .replace(/feat.|ft./g, "")
      .replace(/\s+/g, " ")
      .replace(/\s*-\s*\d{4}\s*(Remaster|Remastered)\s*/i, "")
      .trim();
  };

  const { data: geniusSearchResult, isFetching: loadingGeniusSearch } =
    useGeniusSearchQuery(
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      getTitle(track?.name!, track?.artists!),
      { skip: !track }
    );

  const geniusSearchSong = geniusSearchResult?.response?.hits?.[0]?.result;

  const { data: lyrics, isFetching: loadingGeniusLyrics } =
    useGetGeniusLyricsQuery(
      // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
      geniusSearchSong?.url!,
      {
        skip: !geniusSearchSong?.id,
      }
    );

  const loading = loadingGeniusSearch || loadingGeniusLyrics;

  if (loading || !lyrics) {
    return (
      <Stack gap={2}>
        <TypographySkeleton variant="h4" charCount={6} />
        <Stack gap={0.5}>
          {Array.from(Array(20).keys()).map((num: number) => (
            <TypographySkeleton
              key={num}
              variant="paragraphBold"
              charCount={35}
              charCountVariance={15}
            />
          ))}
        </Stack>
      </Stack>
    );
  } else {
    return (
      <Stack gap={2}>
        <Typography variant="h4">Lyrics</Typography>
        <Stack gap={0.5}>
          {lyrics.map((lyricLine: string, index: number) => (
            <Typography
              key={index}
              variant="paragraphBold"
              sx={{ color: (theme) => theme.palette.grey[400] }}
            >
              {lyricLine}
            </Typography>
          ))}
        </Stack>
      </Stack>
    );
  }
};

export default TrackLyrics;
