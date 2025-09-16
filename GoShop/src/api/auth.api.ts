import type { AuthResponse } from "../Types/auth.type";
import http from "../utils/http";

export const registerAccount = (body: { email: string; password: string }) =>
  http.post<AuthResponse>("/register", body).then((res) => res.data);

export const loginAccount = (body: { email: string; password: string }) =>
  http.post<AuthResponse>("/login", body).then((res) => res.data);

export const logout = () => http.post("/logout");
