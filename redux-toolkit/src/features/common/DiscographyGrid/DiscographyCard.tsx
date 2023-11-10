import { useTheme } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import AlbumIcon from "@mui/icons-material/Album";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import Typography from "@mui/material/Typography";
import {
  StyledEllipsingTextContainer,
  TypographySkeleton,
} from "@benbeck764/react-components/common";
import {
  SimplifiedSpotifyTrack,
  SpotifyAlbum,
} from "../../../state/queries/models/spotify.models";
import { StyledCard } from "../common.styles";
import { capitalize } from "@mui/material/utils";
import { AppLink } from "../AppLink";
import { formatMilliseconds } from "../../../utilities/number";
import { getArtistUrl } from "../../../routing/common/url";
import Box from "@mui/material/Box";
import { groupBy } from "../../../utilities/array";
import Divider from "@mui/material/Divider";
import { Fragment } from "react";

type AlbumCardProps =
  | {
      album: SpotifyAlbum;
      loadingPlaceholder?: never;
    }
  | {
      album?: SpotifyAlbum;
      loadingPlaceholder: true;
    };

const ArtistCard = (props: AlbumCardProps) => {
  const theme = useTheme();

  if (props.loadingPlaceholder) {
    return (
      <StyledCard>
        <Stack direction="row" gap={2}>
          <Stack gap={1.5}>
            <Skeleton variant="rectangular" width={125} height={125} />
          </Stack>
          <Stack>
            <TypographySkeleton
              variant="h2"
              charCount={22}
              charCountVariance={10}
              lines={1}
            />
            <TypographySkeleton
              variant="paragraph"
              charCount={15}
              charCountVariance={5}
              lines={1}
            />
          </Stack>
        </Stack>
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
                <TypographySkeleton
                  variant="paragraph"
                  charCount={1}
                  lines={1}
                />
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
      </StyledCard>
    );
  } else {
    const { album } = props;
    const discs = groupBy(
      album.tracks.items,
      (t: SimplifiedSpotifyTrack) => t.disc_number
    );

    return (
      <Box sx={{ padding: (theme) => theme.spacing(2), borderRadius: "16px" }}>
        <Stack direction="row" gap={2}>
          <Stack gap={1.5}>
            <Avatar
              variant="rounded"
              sx={{ width: 125, height: 125 }}
              src={album.images[0].url}
            />
          </Stack>
          <Stack>
            <StyledEllipsingTextContainer
              lines={1}
              reserveHeight={
                +(
                  theme.typography.h2.lineHeight
                    ?.toString()
                    .replace("px", "") || 0
                )
              }
            >
              <AppLink to="/">
                <Typography variant="h2">{album.name}</Typography>
              </AppLink>
            </StyledEllipsingTextContainer>
            <Typography
              variant="paragraph"
              sx={{ color: (theme) => theme.palette.grey[400] }}
            >
              {`${new Date(album.release_date).getFullYear()} • ${capitalize(
                album.album_type
              )} • ${album.total_tracks} song${
                album.total_tracks > 1 ? "s" : ""
              }`}
            </Typography>
          </Stack>
        </Stack>
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
                  {tracks.map((t) => (
                    <Stack
                      direction="row"
                      key={t.track_number}
                      alignItems="center"
                      justifyContent="space-between"
                      p={1}
                      sx={{
                        borderRadius: "4px",
                        "&:hover": {
                          backgroundColor: (theme) =>
                            theme.palette.coolGrey[800],
                        },
                      }}
                    >
                      <Stack direction="row" alignItems="center" gap={2}>
                        <Typography variant="paragraph">
                          {t.track_number}
                        </Typography>
                        <Stack>
                          <Typography variant="h6">{t.name}</Typography>
                          <AppLink to={getArtistUrl(t.artists[0].id)}>
                            <Typography
                              variant="paragraph"
                              sx={{ color: (theme) => theme.palette.grey[400] }}
                            >
                              {t.artists[0].name}
                            </Typography>
                          </AppLink>
                        </Stack>
                      </Stack>
                      <Typography
                        variant="paragraph"
                        sx={{ color: (theme) => theme.palette.grey[400] }}
                      >
                        {formatMilliseconds(t.duration_ms)}
                      </Typography>
                    </Stack>
                  ))}
                </Fragment>
              );
            }
          )}
        </Stack>
      </Box>
    );
  }
};

export default ArtistCard;
