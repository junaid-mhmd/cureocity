"use client";

import {
  useQuery,
  useMutation,
  useQueryClient,
  type UseQueryResult,
  type UseMutationResult,
} from "@tanstack/react-query";
import * as api from "./api";
import { useAuthStore } from "./store";
import type { AuthLoginResponse, DummyUser } from "./types";

export const queryKeys = {
  auth: ["auth"] as const,
  me: () => [...queryKeys.auth, "me"] as const,
  users: (limit: number, skip: number) => ["users", limit, skip] as const,
  user: (id: number) => ["users", id] as const,
};

/** GET /auth/me — current user (cached, invalidate on login/logout) */
export function useAuthMe(): UseQueryResult<DummyUser, Error> {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: queryKeys.me(),
    queryFn: api.getAuthMe,
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
  });
}

/** GET /users?limit=20&skip=0 — paginated users list */
export function useUsersList(limit: number, skip: number) {
  return useQuery({
    queryKey: queryKeys.users(limit, skip),
    queryFn: () => api.getUsers(limit, skip),
    staleTime: 2 * 60 * 1000,
  });
}

/** GET /users/{id} — single user (for selected user detail) */
export function useUser(id: number | null) {
  return useQuery({
    queryKey: queryKeys.user(id ?? 0),
    queryFn: () => api.getUser(id!),
    enabled: id != null && id > 0,
    staleTime: 2 * 60 * 1000,
  });
}

/** POST /auth/login — mutation; on success sets store and invalidates me */
export function useLogin(): UseMutationResult<
  AuthLoginResponse,
  Error,
  { username: string; password: string },
  unknown
> {
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: ({ username, password }) => api.login(username, password),
    onSuccess: (data) => {
      setAuth(data.accessToken, data);
      queryClient.setQueryData(queryKeys.me(), data);
      queryClient.invalidateQueries({ queryKey: queryKeys.auth });
    },
  });
}
