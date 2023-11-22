import { FC } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  useCheckedSavedAlbumsQuery,
  useCheckedSavedTracksQuery,
  useDeleteSavedAlbumsMutation,
  useDeleteSavedTracksMutation,
  useSaveAlbumsMutation,
  useSaveTracksMutation,
} from "../../state/queries/spotify.api";
import { debounce } from "@mui/material/utils";
import Tooltip from "@mui/material/Tooltip";

type FavoriteButtonProps = {
  type: "track" | "album";
  itemId: string;
  size?: "small" | "medium" | "large";
};

const FavoriteButton: FC<FavoriteButtonProps> = (
  props: FavoriteButtonProps
) => {
  const { type, itemId, size = "medium" } = props;

  const [favoriteTracks] = useSaveTracksMutation();
  const [unfavoriteTracks] = useDeleteSavedTracksMutation();
  const { data: trackFavorited, refetch: refetchFavoritedTracks } =
    useCheckedSavedTracksQuery(
      { ids: itemId! },
      {
        skip: type !== "track" || !itemId,
      }
    );

  const [favoriteAlbums] = useSaveAlbumsMutation();
  const [unfavoriteAlbums] = useDeleteSavedAlbumsMutation();
  const { data: albumFavorited, refetch: refetchFavoritedAlbums } =
    useCheckedSavedAlbumsQuery(
      { ids: itemId! },
      {
        skip: type !== "album" || !itemId,
      }
    );
  const favorited =
    type === "track"
      ? trackFavorited?.[0]
      : type === "album"
      ? albumFavorited?.[0]
      : undefined;

  let fontSize = "32px";
  switch (size) {
    case "small":
      fontSize = "22px";
      break;
    case "medium":
      fontSize = "30px";
      break;
    case "large":
      fontSize = "38px";
      break;
  }

  const handleFavoriteChange = debounce(async (): Promise<void> => {
    if (itemId) {
      if (favorited) {
        if (type === "track") await unfavoriteTracks({ ids: [itemId] });
        if (type === "album") await unfavoriteAlbums({ ids: [itemId] });
      } else {
        if (type === "track") await favoriteTracks({ ids: [itemId] });
        if (type === "album") await favoriteAlbums({ ids: [itemId] });
      }
      if (type === "track") await refetchFavoritedTracks();
      if (type === "album") await refetchFavoritedAlbums();
    }
  }, 200);

  return (
    <Tooltip
      title={favorited ? "Remove from Your Library" : "Save to Your Library"}
      placement="top"
    >
      <IconButton
        sx={{
          width: fontSize,
          height: fontSize,
        }}
        onClick={handleFavoriteChange}
      >
        {favorited ? (
          <FavoriteIcon
            sx={{ fontSize, color: (theme) => theme.palette.primary.dark }}
          />
        ) : (
          <FavoriteBorderIcon
            sx={{
              fontSize,
              color: (theme) => theme.palette.grey[300],
              "&:hover": {
                color: (theme) => theme.palette.text.primary,
              },
            }}
          />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default FavoriteButton;
