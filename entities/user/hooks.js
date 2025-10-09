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

export const useMutationFollow = (options = {}) => {
  const { axios: axiosClient } = useAxios();
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id) => {
      return axiosClient.post(`/relationships`, { followed_id: id });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['following'] });
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
    },
    ...options,
  });
};
