import { createQueryKey } from '@/queries/common/config/query-options-factory';
import { queryOptions, useQuery, UseQueryResult } from '@tanstack/react-query';
import {
  GetUserTopArtistsResponse,
  GetUserTopItemsRequest,
  GetUserTopTracksResponse,
  spotifyApi
} from '@spotify-examples/spotify-api';
import { SpotifyUser } from '@spotify-examples/spotify-models';
import { useSpotifyAuth } from '@spotify-examples/spotify-auth';

//#region Queries

export const userProfileQuery = () =>
  queryOptions<SpotifyUser, Error>({
    queryKey: createQueryKey('user.user-profile'),
    queryFn: async () => await spotifyApi.services.user.getCurrentUserProfile()
  });

export const userTopArtistsQuery = (request?: GetUserTopItemsRequest) =>
  queryOptions<GetUserTopArtistsResponse, Error>({
    queryKey: createQueryKey('user.user-top-artists', request),
    queryFn: async () => await spotifyApi.services.user.getUsersTopArtists(request)
  });

export const userTopTracksQuery = (request?: GetUserTopItemsRequest) =>
  queryOptions<GetUserTopTracksResponse, Error>({
    queryKey: createQueryKey('user.user-top-tracks', request),
    queryFn: async () => await spotifyApi.services.user.getUsersTopTracks(request)
  });

//#endregion

//#region Query Hooks

export const useGetUserProfileQuery = (): UseQueryResult<SpotifyUser, Error> => {
  const { isAuthenticated } = useSpotifyAuth();

  return useQuery({ ...userProfileQuery(), enabled: isAuthenticated });
};

//#endregion
