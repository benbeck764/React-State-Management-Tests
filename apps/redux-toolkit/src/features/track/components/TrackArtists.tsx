import { FC } from "react";
import { SpotifyArtist } from "../../../state/queries/models/spotify.models";
import ArtistsGrid from "../../common/ArtistsGrid/ArtistsGrid";

type TrackArtistsProps = {
  loading: boolean;
  artists?: SpotifyArtist[];
  onArtistSelected?: (artist: SpotifyArtist) => void;
};

const TrackArtists: FC<TrackArtistsProps> = (props: TrackArtistsProps) => {
  const { loading, artists, onArtistSelected } = props;

  if (loading || !artists) {
    return (
      <ArtistsGrid
        data={undefined}
        cardVariant="track"
        loading={loading}
        pageSize={loading ? 3 : undefined}
      />
    );
  } else {
    return (
      <ArtistsGrid
        data={artists}
        cardVariant="track"
        loading={loading}
        onArtistSelected={onArtistSelected}
      />
    );
  }
};

export default TrackArtists;
