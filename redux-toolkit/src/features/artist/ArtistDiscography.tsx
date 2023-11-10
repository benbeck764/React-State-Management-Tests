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
  const { scrollPercentage } = useScrollDetection({ debounceMs: 300 });

  const [queryParams, setQueryParams] = useState<{
    offset: number;
    limit: number;
  }>({ offset: 0, limit: 3 });

  const { artist } = useGetTopArtistsQuery(
    {},
    {
      selectFromResult: (res) => ({
        artist: res.data?.items.find((a: SpotifyArtist) => a.id === artistId),
      }),
    }
  );

  const {
    data: discographyData,
    isFetching: isLoadingDiscography,
    refetch,
  } = useGetArtistDiscographyQuery(
    { id: artistId!, limit: queryParams.limit, offset: queryParams.offset },
    { skip: !artistId }
  );

  useEffect(() => {
    if (scrollPercentage > 90) {
      if (
        discographyData &&
        discographyData.albums.length < discographyData.total
      ) {
        setQueryParams((prev) => {
          return {
            offset: Math.min(prev.offset + 3, discographyData.total),
            limit:
              prev.offset + 3 >= discographyData.total
                ? discographyData.total - discographyData.albums.length
                : prev.limit,
          };
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollPercentage]);

  useEffect(() => {
    console.log(queryParams);
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParams]);

  return (
    <Stack gap={1}>
      <AppLink to={getArtistUrl(artistId!)}>
        <Typography variant="h2">{artist?.name}</Typography>
      </AppLink>
      <Stack gap={2}>
        <DiscographyGrid
          data={discographyData}
          loading={isLoadingDiscography}
          onAlbumSelected={() => void 0}
        />
      </Stack>
    </Stack>
  );
};

export default ArtistDiscography;
