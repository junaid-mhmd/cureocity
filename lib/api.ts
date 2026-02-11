import { getAuthHeaders } from "./store";
import { API_BASE } from "./store";
import type { AuthLoginResponse, DummyUser } from "./types";

export interface UsersListResponse {
  users: DummyUser[];
  total: number;
  skip: number;
  limit: number;
}

/** POST /auth/login */
export async function login(
  username: string,
  password: string,
  expiresInMins = 60
): Promise<AuthLoginResponse> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password, expiresInMins }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error((err as { message?: string }).message ?? "Login failed");
  }
  return res.json();
}

/** GET /auth/me */
export async function getAuthMe(): Promise<DummyUser> {
  const res = await fetch(`${API_BASE}/auth/me`, {
    method: "GET",
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    if (res.status === 401) throw new Error("Unauthorized");
    throw new Error("Failed to fetch current user");
  }
  return res.json();
}

/** GET /users?limit=20&skip=0 */
export async function getUsers(limit = 20, skip = 0): Promise<UsersListResponse> {
  const res = await fetch(
    `${API_BASE}/users?limit=${limit}&skip=${skip}`,
    { headers: getAuthHeaders() }
  );
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
}

/** GET /users/{id} */
export async function getUser(id: number): Promise<DummyUser> {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch user");
  return res.json();
}
