// api/auth.api.ts
import type { AuthResponse, AuthPayload } from "../Types/auth.type";
import http from "../utils/http";

export const loginAccount = (body: { email: string; password: string }) =>
  http
    .post<AuthResponse>("/login", body)
    .then((res) => res.data.data as AuthPayload);

export const registerAccount = (body: { email: string; password: string }) =>
  http
    .post<AuthResponse>("/register", body)
    .then((res) => res.data.data as AuthPayload);

export const logout = () => http.post("/logout");
