import { FC } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { TypographySkeleton } from "@benbeck764/react-components/common";

type TrackLyricsProps = {
  loading: boolean;
  lyrics?: string[];
};

const TrackLyrics: FC<TrackLyricsProps> = (props: TrackLyricsProps) => {
  const { loading, lyrics } = props;
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
