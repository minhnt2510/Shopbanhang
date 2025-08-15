import type { User } from "./user.type";
import type { ResponseAPI } from "./util.type";

export type AuthResponse = ResponseAPI<{
  access_token: string;
  expires: string;
  user: User;
}>;
