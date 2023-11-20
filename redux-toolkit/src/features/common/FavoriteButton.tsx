import { FC } from "react";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppSelector, AppRootState } from "../../state/store";
import { SpotifyTrack } from "../../state/queries/models/spotify.models";
import {
  useCheckedSavedTracksQuery,
  useDeleteSavedTracksMutation,
  useSaveTracksMutation,
} from "../../state/queries/spotify.api";
import { debounce } from "@mui/material/utils";

type FavoriteButtonProps = {
  type: "track" | "album";
  size?: "small" | "medium" | "large";
};

const FavoriteButton: FC<FavoriteButtonProps> = (
  props: FavoriteButtonProps
) => {
  const { type, size = "medium" } = props;
  const playbackState = useAppSelector(
    (s: AppRootState) => s.player.playbackState
  );

  const item = playbackState?.item as SpotifyTrack | null | undefined;
  const itemId = type === "track" ? item?.id : item?.album?.id;

  const [favoriteTracks] = useSaveTracksMutation();
  const [unfavoriteTracks] = useDeleteSavedTracksMutation();
  const { data: favoritedRes, refetch: refetchFavorited } =
    useCheckedSavedTracksQuery(
      { ids: itemId! },
      {
        skip: !itemId,
      }
    );
  const favorited = favoritedRes?.[0];

  let fontSize = "32px";
  switch (size) {
    case "small":
      fontSize = "14px";
      break;
    case "medium":
      fontSize = "22px";
      break;
    case "large":
      fontSize = "28px";
      break;
  }

  const handleFavoriteChange = debounce(async (): Promise<void> => {
    if (itemId) {
      if (favorited) {
        await unfavoriteTracks({ ids: [itemId] });
      } else {
        await favoriteTracks({ ids: [itemId] });
      }
      await refetchFavorited();
    }
  }, 200);

  return (
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
          sx={{ fontSize, color: (theme) => theme.palette.text.primary }}
        />
      )}
    </IconButton>
  );
};

export default FavoriteButton;
