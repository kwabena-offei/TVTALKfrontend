import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import useAxios from "../../services/api";

export const useQueryFollowing = (options = {}) => {
  const { axios: axiosClient } = useAxios();
  return useQuery({
    queryKey: ['following'],
    queryFn: () => axiosClient.get('/profile/following'),
    ...options,
  });
};

export const useQueryFollowers = (options = {}) => {
  const { axios: axiosClient } = useAxios();
  return useQuery({
    queryKey: ['followers'],
    queryFn: () => axiosClient.get('/profile/followers'),
    ...options,
  });
};

export const useQueryUserFollowing = (username, options = {}) => {
  const { axios: axiosClient } = useAxios();
  return useQuery({
    queryKey: ['userFollowing', username],
    queryFn: () => axiosClient.get(`/users/${username}/following`),
    enabled: !!username,
    ...options,
  });
};

export const useQueryUserFollowers = (username, options = {}) => {
  const { axios: axiosClient } = useAxios();
  return useQuery({
    queryKey: ['userFollowers', username],
    queryFn: () => axiosClient.get(`/users/${username}/followers`),
    enabled: !!username,
    ...options,
  });
};

export const useMutationFollow = (options = {}) => {
  const { axios: axiosClient } = useAxios();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id) => {
      return axiosClient.post(`/relationships`, { followed_id: id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['following'] });
      queryClient.invalidateQueries({ queryKey: ['followers'] });
      queryClient.invalidateQueries({ queryKey: ['userFollowing'] });
      queryClient.invalidateQueries({ queryKey: ['userFollowers'] });
    },
    ...options,
  });
};

export const useMutationUnfollow = (options = {}) => {
  const { axios: axiosClient } = useAxios();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id) => {
      // debugger;
      return axiosClient.delete(`/relationships/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['following'] });
      queryClient.invalidateQueries({ queryKey: ['followers'] });
      queryClient.invalidateQueries({ queryKey: ['userFollowing'] });
      queryClient.invalidateQueries({ queryKey: ['userFollowers'] });
    },
    ...options,
  });
};
