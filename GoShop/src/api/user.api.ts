import { User } from "../Types/user.type";
import { ResponseAPI } from "../Types/util.type";
import http from "../utils/http";

export interface BodyUpdateProfile
  extends Omit<User, "_id" | "roles" | "createdAt" | "updatedAt" | "email"> {
  password?: string;
  new_password: string;
}

const userApi = {
  getProfile() {
    return http.get<ResponseAPI<User>>("me");
  },
  updateProfile(body: BodyUpdateProfile) {
    return http.put<ResponseAPI<User>>("user", body);
  },
  uploadAvatar(body: FormData) {
    return http.post<ResponseAPI<string>>("user/upload-avatar", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};

export default userApi;
