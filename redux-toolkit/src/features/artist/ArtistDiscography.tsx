import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetTopArtistsQuery } from "../../state/queries/spotify.api";
import { SpotifyArtist } from "../../state/queries/models/spotify.models";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import DiscographyGrid from "../common/DiscographyGrid/DiscographyGrid";
import { useGetArtistDiscographyQuery } from "../../state/queries/artist.api";
import { AppLink } from "../common/AppLink";
import { getArtistUrl } from "../../routing/common/url";
import useScrollDetection from "../../utilities/hooks/useScrollDetection";

const ArtistDiscography: FC = () => {
  const params = useParams();
  const artistId = params["artistId"];
  const pageSize = 20; // Max allowed w/ Spotify API
  const { scrollPercentage } = useScrollDetection({});

  const [queryParams, setQueryParams] = useState<{
    offset: number;
    limit: number;
  }>({ offset: 0, limit: pageSize });

  const { artist } = useGetTopArtistsQuery(
    { limit: 24 },
    {
      selectFromResult: (res) => ({
        artist: res.data?.items.find((a: SpotifyArtist) => a.id === artistId),
      }),
    }
  );

  const { data: discographyData, isFetching: isLoadingDiscography } =
    useGetArtistDiscographyQuery(
      {
        id: artistId!,
        limit: queryParams.limit,
        offset: queryParams.offset,
        include_groups: "album,single",
      },
      { skip: !artistId }
    );

  useEffect(() => {
    if (scrollPercentage > 65) {
      if (
        discographyData &&
        discographyData.albums.length < discographyData.total
      ) {
        setQueryParams((prev: { offset: number; limit: number }) => {
          return {
            offset: Math.min(prev.offset + pageSize, discographyData.total - 1),
            limit:
              discographyData.total - (prev.offset + pageSize) >= prev.limit
                ? prev.limit
                : discographyData.total - (prev.offset + pageSize),
          };
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollPercentage]);

  return (
    <Stack gap={1}>
      <AppLink to={getArtistUrl(artistId!)}>
        <Typography variant="h2">{artist?.name}</Typography>
      </AppLink>
      <Stack gap={2}>
        <DiscographyGrid
          data={discographyData}
          loading={isLoadingDiscography}
          pageSize={pageSize}
          onAlbumSelected={() => void 0}
        />
      </Stack>
    </Stack>
  );
};

export default ArtistDiscography;
