import { endpoints } from "./common/endpoints";
import { GetTrackRequest, SpotifyTrack } from "./models/spotify.models";
import { spotifyApi } from "./spotify.api";

const trackApi = spotifyApi.injectEndpoints({
  endpoints: (builder) => ({
    getTrack: builder.query<SpotifyTrack, GetTrackRequest>({
      query: (req: GetTrackRequest) => ({
        url: endpoints.spotify.tracks.byId(req.id),
        method: "GET",
        params: req,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetTrackQuery } = trackApi;
