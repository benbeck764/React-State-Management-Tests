import { FC, Fragment } from "react";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import AlbumIcon from "@mui/icons-material/Album";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { TypographySkeleton } from "@benbeck764/react-components/common";
import {
  SimplifiedSpotifyTrack,
  SpotifyAlbum,
} from "../../../state/queries/models/spotify.models";
import { groupBy } from "../../../utilities/array";
import TrackListingRow from "./TrackListingRow";

type TrackListingProps =
  | {
      album: SpotifyAlbum;
      loading?: never;
    }
  | {
      album?: never;
      loading: true;
    };

const TrackListing: FC<TrackListingProps> = (props: TrackListingProps) => {
  if (props.loading) {
    return (
      <Stack mt={5.5}>
        {Array.from(Array(16).keys()).map((num: number) => (
          <Stack
            key={num}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            p={1}
          >
            <Stack direction="row" alignItems="center" gap={2}>
              <TypographySkeleton variant="paragraph" charCount={1} lines={1} />
              <Stack>
                <TypographySkeleton
                  variant="h6"
                  charCount={20}
                  charCountVariance={10}
                  lines={1}
                />
                <TypographySkeleton variant="h6" charCount={18} lines={1} />
              </Stack>
            </Stack>
            <TypographySkeleton variant="paragraph" charCount={8} lines={1} />
          </Stack>
        ))}
      </Stack>
    );
  } else {
    const { album } = props;
    const discs = groupBy(
      album.tracks.items,
      (t: SimplifiedSpotifyTrack) => t.disc_number
    );
    return (
      <Stack mt={1.5}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          p={1}
        >
          <Stack direction="row" gap={2}>
            <Typography
              variant="paragraph"
              sx={{ color: (theme) => theme.palette.grey[400] }}
            >
              #
            </Typography>
            <Typography
              variant="paragraph"
              sx={{ color: (theme) => theme.palette.grey[400] }}
            >
              Title
            </Typography>
          </Stack>
          <AccessTimeIcon
            fontSize="small"
            sx={{ color: (theme) => theme.palette.grey[400] }}
          />
        </Stack>
        <Divider
          sx={{
            backgroundColor: (theme) => theme.palette.grey[800],
          }}
        />
        {Object.entries(discs).map(
          ([discNumber, tracks]: [string, SimplifiedSpotifyTrack[]]) => {
            const numDiscs = Object.keys(discs).length;
            return (
              <Fragment key={discNumber}>
                {numDiscs > 1 && (
                  <>
                    <Stack
                      direction="row"
                      alignItems="center"
                      gap={1}
                      pt={1.5}
                      pb={1}
                    >
                      <AlbumIcon
                        sx={{ color: (theme) => theme.palette.grey[400] }}
                      />
                      <Typography
                        variant="h5"
                        sx={{ color: (theme) => theme.palette.grey[400] }}
                      >{`Disc ${discNumber}`}</Typography>
                    </Stack>
                  </>
                )}
                {tracks.map((t: SimplifiedSpotifyTrack) => (
                  <TrackListingRow key={t.id} album={album} track={t} />
                ))}
              </Fragment>
            );
          }
        )}
      </Stack>
    );
  }
};

export default TrackListing;
