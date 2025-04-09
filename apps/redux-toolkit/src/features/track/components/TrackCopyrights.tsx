import { FC } from "react";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { TypographySkeleton } from "@benbeck764/react-components/common";
import {
  SpotifyCopyRights,
  SpotifyTrack,
} from "../../../state/queries/models/spotify.models";
import { useGetAlbumQuery } from "../../../state/queries/album.api";
import { formatWithPrecision } from "../../../utilities/time";

type TrackCopyrightsProps = {
  track?: SpotifyTrack | null;
};

const TrackCopyrights: FC<TrackCopyrightsProps> = (
  props: TrackCopyrightsProps
) => {
  const { track } = props;
  const { data: album, isFetching: loading } = useGetAlbumQuery(
    // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
    { id: track?.album?.id! },
    { skip: !track }
  );

  if (loading || !album) {
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
      <Stack gap={0.25}>
        <Typography
          variant="paragraph"
          sx={{ color: (theme) => theme.palette.grey[400] }}
        >
          {formatWithPrecision(
            album.release_date,
            album.release_date_precision
          )}
        </Typography>
        {album.copyrights.map((c: SpotifyCopyRights) => (
          <Typography
            key={`${c.text}${c.type}`}
            variant="paragraphExtraSmall"
            sx={{ color: (theme) => theme.palette.grey[400] }}
          >
            {c.text}
          </Typography>
        ))}
        <Typography
          variant="paragraphExtraSmall"
          sx={{ color: (theme) => theme.palette.grey[400] }}
        >
          Lyrics provided by Genius
        </Typography>
      </Stack>
    );
  }
};

export default TrackCopyrights;
