import { create } from "zustand";
import type { AuthLoginResponse, DummyUser, Role } from "./types";
import { getRole } from "./types";

const DUMMYJSON = "https://dummyjson.com";

interface AuthState {
  token: string | null;
  user: (DummyUser & { accessToken?: string }) | null;
  role: Role | null;
  selectedUserId: number | null;
  setAuth: (token: string, user: DummyUser | AuthLoginResponse) => void;
  setSelectedUser: (id: number | null) => void;
  logout: () => void;
  hydrate: () => void;
  persist: () => void;
}

const STORAGE_KEY = "cureocity-auth";

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,
  role: null,
  selectedUserId: null,

  setAuth: (token, user) => {
    const role = user.role ?? getRole({ id: user.id, role: user.role });
    set({
      token,
      user: { ...user, accessToken: token } as DummyUser & { accessToken?: string },
      role,
    });
    get().persist();
  },

  setSelectedUser: (id) => {
    set({ selectedUserId: id });
  },

  logout: () => {
    set({ token: null, user: null, role: null, selectedUserId: null });
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch {
        // ignore
      }
    }
  },

  hydrate: () => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw) as {
        token: string;
        user: DummyUser & { accessToken?: string };
        role: Role;
      };
      if (data.token && data.user) {
        set({
          token: data.token,
          user: data.user,
          role: data.role ?? getRole({ id: data.user.id, role: data.user.role }),
        });
      }
    } catch {
      // ignore
    }
  },

  persist: () => {
    if (typeof window === "undefined") return;
    const { token, user, role } = get();
    if (!token || !user) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          token,
          user: { ...user, accessToken: undefined },
          role,
        })
      );
    } catch {
      // ignore
    }
  },
}));

export function getAuthHeaders(): HeadersInit {
  const token = useAuthStore.getState().token;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const API_BASE = DUMMYJSON;
