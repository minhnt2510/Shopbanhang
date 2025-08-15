// src/utils/rules.ts
import * as yup from "yup";

export const schema = yup.object({
  email: yup
    .string()
    .required("Email là bắt buộc")
    .email("Email không đúng định dạng")
    .min(5, "Email phải có ít nhất 5 ký tự")
    .max(160, "Email không được vượt quá 160 ký tự"),
  password: yup
    .string()
    .required("Password là bắt buộc")
    .min(6, "Password phải có ít nhất 6 ký tự")
    .max(160, "Password không được vượt quá 160 ký tự"),
  confirmPassword: yup
    .string()
    .required("Nhập lại password là bắt buộc")
    .oneOf([yup.ref("password")], "Mật khẩu không khớp"),
});

export type Schema = yup.InferType<typeof schema>;
