import { FC } from "react";
import { SpotifyArtist } from "../../../../state/queries/models/spotify.models";
import { ArtistCardVariant } from "../ArtistsGrid";
import ArtistCardSmall from "./ArtistCard.small";
import ArtistCardLarge from "./ArtistCard.large";

export type ArtistCardProps = { variant: ArtistCardVariant } & (
  | {
      artist: SpotifyArtist;
      loadingPlaceholder?: never;
    }
  | {
      artist?: SpotifyArtist;
      loadingPlaceholder: true;
    }
);

const ArtistCard: FC<ArtistCardProps> = (props: ArtistCardProps) => {
  const { variant } = props;
  if (variant === "small") {
    return <ArtistCardSmall {...props} />;
  }
  if (variant === "large") {
    return <ArtistCardLarge {...props} />;
  }
};

export default ArtistCard;
