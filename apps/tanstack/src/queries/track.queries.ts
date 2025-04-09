import { createQueryKey } from '@/queries/common/config/query-options-factory';
import {
  GetRecommendationsRequest,
  GetRecommendationsResponse,
  spotifyApi
} from '@spotify-examples/spotify-api';
import { SpotifyTrack } from '@spotify-examples/spotify-models';
import { queryOptions } from '@tanstack/react-query';

//#region Queries

export const getTrackQuery = ({ id }: { id: string }) =>
  queryOptions<SpotifyTrack, Error>({
    queryKey: createQueryKey('track.get-track', id),
    queryFn: async () => await spotifyApi.services.track.getTrack(id)
  });

export const getRecommendationsQuery = (request: GetRecommendationsRequest) =>
  queryOptions<GetRecommendationsResponse, Error>({
    queryKey: createQueryKey('track.get-recommendations', request),
    queryFn: async () => await spotifyApi.services.track.getRecommendations(request)
  });

//#endregion
