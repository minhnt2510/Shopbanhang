import axios, { AxiosError, HttpStatusCode, type AxiosInstance } from "axios";
import { toast } from "react-toastify";
import {
  clearLS,
  getAccessTokenFromLS,
  saveAccesTokenToLS,
  setProfileToLS,
} from "./auth";
import type { AuthResponse } from "../Types/auth.type";
import config from "../constants/Config";

class Http {
  instance: AxiosInstance;
  private accessToken: string;

  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.instance = axios.create({
      baseURL: config.baseURL,
      timeout: 10000,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor
    this.instance.interceptors.request.use(
      (config) => {
        if (this.accessToken && config.headers) {
          config.headers.Authorization = this.accessToken;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        if (url === "/login" || url === "/register") {
          const authResponse = response.data as AuthResponse;
          this.accessToken = authResponse?.data?.access_token || "";

          saveAccesTokenToLS(this.accessToken);

          if (authResponse?.data?.user) {
            setProfileToLS(authResponse.data.user); // ✅ lưu profile
          }
        } else if (url === "/logout") {
          this.accessToken = "";
          clearLS();
        }
        return response;
      },
      (error: AxiosError) => {
        if (
          error.response?.status !== axios.HttpStatusCode.UnprocessableEntity
        ) {
          const data: any | undefined = error.response?.data;
          const message = data?.message || error.message;
          toast.error(message);
        }
        if (error.response?.status === HttpStatusCode.Unauthorized) {
          clearLS();
        }
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;

export default http;
