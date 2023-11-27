import { SpotifyAlbum } from "../state/queries/models/spotify.models";
import { capitalize } from "@mui/material/utils";

export const getAlbumType = (album: SpotifyAlbum) => {
  if (album.album_type === "single" && album.total_tracks >= 3) return "EP";
  return capitalize(album.album_type);
};
