import { FC, useMemo, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import {
  TypographySkeleton,
  StyledEllipsingTextContainer,
} from "@benbeck764/react-components";
import AppChip from "@benbeck764/react-components/Chip";
import {
  SearchItemResponse,
  SpotifyArtist,
} from "../../../state/queries/models/spotify.models";
import { getAlbumUrl, getArtistUrl } from "../../../routing/common/url";
import { AppLink } from "../../common/AppLink";
import { StyledCard } from "../../common/common.styles";
import { useHovered } from "../../../utilities/hooks/useHovered";
import { useAppSelector, AppRootState } from "../../../state/store";
import PlayButton from "../../player/PlayButton";

type TopResult = {
  type: "artist" | "track" | "album";
  name: string;
  resultUrl: string;
  imageUri: string;
  playUri: string;
  popularity: number;
  artists: SpotifyArtist[];
};

type TopResultCardProps = {
  searchResult?: SearchItemResponse | undefined;
  searchTerm?: string | undefined;
  loading: boolean;
};

const TopResultCard: FC<TopResultCardProps> = (props: TopResultCardProps) => {
  const { searchResult, searchTerm, loading } = props;
  const theme = useTheme();
  const cardFocusRef = useRef<HTMLDivElement>();
  const hovered = useHovered(cardFocusRef);

  const playbackState = useAppSelector(
    (s: AppRootState) => s.player.playbackState
  );

  const calculateTopResult = (): TopResult | undefined => {
    const topArtist = searchResult?.artists?.items?.[0];
    const topTrack = searchResult?.tracks?.items?.[0];
    const topAlbum = searchResult?.albums?.items?.[0];

    if (searchTerm && topArtist && topTrack && topAlbum) {
      const term = searchTerm.toLocaleLowerCase();
      const topResults: TopResult[] = [
        {
          type: "artist",
          name: topArtist.name,
          resultUrl: getArtistUrl(topArtist.id),
          imageUri: topArtist.images?.[0].url,
          playUri: topArtist.uri,
          popularity: topArtist.popularity,
          artists: [topArtist],
        },
        {
          type: "track",
          name: topTrack.name,
          resultUrl: "", // [TODO]
          imageUri: topTrack.album.images?.[0].url,
          playUri: topTrack.uri,
          popularity: topTrack.popularity,
          artists: topTrack.artists,
        },
        {
          type: "album",
          name: topAlbum.name,
          resultUrl: getAlbumUrl(topAlbum.id),
          imageUri: topAlbum.images?.[0].url,
          playUri: topAlbum.uri,
          popularity: topAlbum.popularity,
          artists: topAlbum.artists as SpotifyArtist[],
        },
      ];

      const sortedTopResults = topResults.sort((a: TopResult, b: TopResult) => {
        const nameA = a.name.toLocaleLowerCase();
        const nameB = b.name.toLocaleLowerCase();
        const typeOrder = { artist: 0, track: 1, album: 2 };

        // First, sort by whether the name starts with the specified string
        if (nameA.startsWith(term) && !nameB.startsWith(term)) {
          return -1;
        } else if (!nameA.startsWith(term) && nameB.startsWith(term)) {
          return 1;
        }

        // Them, sort by the type: "artist" < "track" < "album"
        if (typeOrder[a.type] < typeOrder[b.type]) {
          return -1;
        } else if (typeOrder[a.type] > typeOrder[b.type]) {
          return 1;
        }

        // Else, then sort by popularity
        return b.popularity - a.popularity;
      });

      return sortedTopResults[0];
    }
  };

  const topResult = useMemo(() => {
    return calculateTopResult();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, searchResult]);

  if (!topResult || loading) {
    return (
      <>
        <Typography variant="h5">Top result</Typography>
        <StyledCard height="100%">
          <Stack gap={2}>
            <Skeleton variant="circular" width={100} height={100} />
            <TypographySkeleton
              variant="h4"
              charCount={12}
              charCountVariance={6}
              lines={1}
            />
            <Skeleton
              variant="rounded"
              width={60}
              height={32}
              sx={{ borderRadius: "500px" }}
            />
          </Stack>
        </StyledCard>
      </>
    );
  } else {
    const isCurrentItem =
      playbackState !== null &&
      (((topResult.type === "artist" || topResult.type) === "album" &&
        playbackState !== null &&
        topResult.playUri === playbackState.context?.uri) ||
        (topResult.type === "track" &&
          topResult.playUri === playbackState.item?.uri));

    const isPlaying = isCurrentItem && playbackState.is_playing;

    return (
      <>
        <Typography variant="h5">Top result</Typography>
        <Box sx={{ position: "relative" }} height="100%" ref={cardFocusRef}>
          <AppLink
            to={topResult.resultUrl}
            sx={{
              height: "100%",
              "&:hover": {
                textDecoration: "none",
              },
            }}
          >
            <StyledCard height="100%">
              <Stack gap={2}>
                <Avatar
                  sx={{ width: 100, height: 100 }}
                  src={topResult.imageUri}
                />
                <StyledEllipsingTextContainer
                  lines={1}
                  reserveHeight={
                    +(
                      theme.typography.h4.lineHeight
                        ?.toString()
                        .replace("px", "") || 0
                    )
                  }
                >
                  <Typography variant="h4">{topResult.name}</Typography>
                </StyledEllipsingTextContainer>
                {topResult.type === "artist" && (
                  <AppChip
                    sx={{ width: 60 }}
                    label={
                      <Typography variant="paragraphBold">Artist</Typography>
                    }
                  />
                )}
                {topResult.type === "track" && (
                  <Stack
                    direction="row"
                    flexWrap="wrap"
                    gap={0.5}
                    alignItems="center"
                  >
                    {topResult.artists
                      .slice(0, 10)
                      .map((a: SpotifyArtist, artistIndex: number) => (
                        <AppLink
                          key={a.id}
                          to={getArtistUrl(a.id)}
                          state={a}
                          sx={{
                            display: "inline-block",
                            height: 20,
                          }}
                        >
                          <Typography
                            variant="paragraphSmallBold"
                            sx={{
                              color: (theme) => theme.palette.text.primary,
                              lineHeight: "20px",
                            }}
                          >
                            {a.name}
                            {artistIndex !== 9 &&
                              artistIndex !== topResult.artists.length - 1 &&
                              ","}
                          </Typography>
                        </AppLink>
                      ))}
                    <AppChip
                      sx={{ maxWidth: 60, height: 20 }}
                      label={
                        <Typography variant="paragraphSmallBold">
                          Song
                        </Typography>
                      }
                    />
                  </Stack>
                )}
              </Stack>
            </StyledCard>
          </AppLink>
          {(hovered || isPlaying) && (
            <PlayButton
              variant="action-button"
              type={topResult.type}
              dataUri={topResult.playUri}
              sx={{ position: "absolute", bottom: 15, right: 15, zIndex: 1052 }}
              stopPropagation
            />
          )}
        </Box>
      </>
    );
  }
};

export default TopResultCard;
