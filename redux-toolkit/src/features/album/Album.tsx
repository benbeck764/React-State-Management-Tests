import { FC } from "react";
import { useParams } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useGetAlbumQuery } from "../../state/queries/album.api";
import TrackListing from "../common/TrackListing";
import AppCard from "@benbeck764/react-components/Card";

const Album: FC = () => {
  const params = useParams();
  const albumId = params["albumId"];

  const { data: album, isFetching: loading } = useGetAlbumQuery(
    { id: albumId! },
    { skip: !albumId }
  );

  if (loading) {
    return (
      <Stack gap={1}>
        <TrackListing loading={true} />
      </Stack>
    );
  } else {
    return (
      <Stack gap={1}>
        <Typography variant="h1">{album?.name}</Typography>
        <AppCard paperSx={{ p: 2, borderRadius: "16px" }}>
          <TrackListing album={album!} />
        </AppCard>
      </Stack>
    );
  }
};

export default Album;
