import axios from "axios";

export const API_BASE_URL =
  (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_API_BASE_URL) ||
  "http://localhost:8080";

export const TOKEN_KEY = "stfs_token";
export const USER_KEY = "stfs_user";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (token) {
      config.headers = config.headers ?? {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err?.response?.status === 401 && typeof window !== "undefined") {
      window.localStorage.removeItem(TOKEN_KEY);
      window.localStorage.removeItem(USER_KEY);
    }
    return Promise.reject(err);
  },
);

// ---- Types matching backend contracts ----
export interface AuthUser {
  token: string;
  userId: string;
  email: string;
  fullName: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  college: string;
  city: string;
  experienceLevel: string;
  skills: string[];
  domains: string[];
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  skillScore: number;
}

export interface RecommendationResponse {
  recommendedTeam: TeamMember[];
  compatibilityScore: number;
}

export interface Profile {
  id: string;
  fullName: string;
  email: string;
  college?: string;
  city?: string;
  experienceLevel?: string;
  skills?: string[];
  domains?: string[];
}

// ---- API calls ----
export const AuthAPI = {
  register: (data: RegisterPayload) =>
    api.post<AuthUser>("/api/auth/register", data).then((r) => r.data),
  login: (data: LoginPayload) =>
    api.post<AuthUser>("/api/auth/login", data).then((r) => r.data),
};

export const TeamAPI = {
  recommend: (requiredSkills: string[]) =>
    api
      .post<RecommendationResponse>("/api/team/recommend", { requiredSkills })
      .then((r) => r.data),
};

export const ProfileAPI = {
  all: () => api.get<Profile[]>("/api/profile/all").then((r) => r.data),
  get: (id: string) => api.get<Profile>(`/api/profile/${id}`).then((r) => r.data),
  create: (data: Partial<Profile>) =>
    api.post<Profile>("/api/profile/create", data).then((r) => r.data),
  update: (id: string, data: Partial<Profile>) =>
    api.put<Profile>(`/api/profile/update/${id}`, data).then((r) => r.data),
  delete: (id: string) => api.delete(`/api/profile/delete/${id}`).then((r) => r.data),
};
