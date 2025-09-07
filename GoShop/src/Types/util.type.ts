export interface ResponseAPI<Data> {
  message: string;
  data?: Data;
}

export interface ErrorResponse<Data> {
  message: string;
  data?: Data;
}

export type NoUndefinedField<T> = {
  [P in keyof T]-?: NonNullable<T[P]>;
};

// Type cho form data update password
export interface PasswordFormData {
  password: string;
  new_password: string;
  confirm_password: string;
}

// Type cho response error từ server
export type ErrorData<T> = {
  [key in keyof T]: string;
};
