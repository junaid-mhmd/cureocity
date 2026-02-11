/** DummyJSON user (list item or single user) */
export interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
  maidenName?: string;
  age?: number;
  gender?: string;
  email: string;
  phone?: string;
  username: string;
  password?: string;
  birthDate?: string;
  image?: string;
  bloodGroup?: string;
  height?: number;
  weight?: number;
  eyeColor?: string;
  hair?: { color: string; type: string };
  address?: {
    address: string;
    city: string;
    state: string;
    stateCode?: string;
    postalCode: string;
    coordinates?: { lat: number; lng: number };
    country: string;
  };
  company?: {
    department: string;
    name: string;
    title: string;
    address?: { address: string; city: string; state: string; country: string };
  };
  role?: "admin" | "moderator" | "user";
  [key: string]: unknown;
}

/** Auth login response from POST /auth/login */
export interface AuthLoginResponse extends Pick<DummyUser, "id" | "username" | "email" | "firstName" | "lastName" | "gender" | "image"> {
  accessToken: string;
  refreshToken: string;
  role?: Role;
}

/** Deterministic role when API doesn't return it (e.g. from /auth/me) */
export type Role = "admin" | "moderator" | "user";

export function getRoleFromId(id: number): Role {
  const roles: Role[] = ["admin", "moderator", "user"];
  return roles[id % 3];
}

export function getRole(user: { id: number; role?: Role }): Role {
  return user.role ?? getRoleFromId(user.id);
}
