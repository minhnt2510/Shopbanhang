import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm, type Resolver } from "react-hook-form";
import { toast } from "react-toastify";
import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import { userSchema } from "../../../../utils/rules";
import { isAxiosUnprocessableEntityError } from "../../../../utils/util";
import userApi, { type BodyUpdateProfile } from "../../../../api/user.api";
import type { ErrorResponse } from "../../../../Types/util.type";

// Use consistent field names throughout
type FormData = {
  password: string;
  new_password: string;
  confirmPassword: string;
};

// Pick the correct fields from userSchema
const passwordSchema = userSchema.pick([
  "password",
  "new_password",
  "confirmPassword",
]);

export default function ChangePassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      password: "",
      confirmPassword: "",
      new_password: "",
    },
    resolver: yupResolver(passwordSchema) as Resolver<FormData>,
  });

  // Use updateProfile instead of updatePassword
  const updateProfileMutation = useMutation({
    mutationFn: (body: BodyUpdateProfile) => userApi.updateProfile(body),
    onSuccess: (data) => {
      toast.success(data.data.message || "Đổi mật khẩu thành công");
      reset();
    },
    onError: (error) => {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data;
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: "Server",
            });
          });
        }
      }
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      // Debug: Log data được gửi lên server
      console.log("Data gửi lên server:", {
        password: data.password,
        newPassword: data.new_password,
      });

      await updateProfileMutation.mutateAsync({
        password: data.password,
        new_password: data.new_password,
      } as BodyUpdateProfile);
    } catch (error) {
      console.error("Chi tiết lỗi:", error);

      // Log thêm thông tin từ response
      if (error instanceof Error && "response" in error) {
        console.error("Response data:", (error as any).response?.data);
        console.error("Response status:", (error as any).response?.status);
      }
    }
  });

  return (
    <div className="rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20">
      <div className="border-b border-b-gray-200 py-6">
        <h1 className="text-lg font-medium capitalize text-gray-900">
          Đổi mật khẩu
        </h1>
        <div className="mt-1 text-sm text-gray-700">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </div>
      </div>
      <form className="mt-8 mr-auto max-w-2xl" onSubmit={onSubmit}>
        <div className="mt-6 flex-grow md:mt-0 md:pr-12">
          {/* Mật khẩu cũ */}
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
              Mật khẩu cũ
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <Input
                className="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                {...register("password")}
                type="password"
                placeholder="Mật khẩu cũ"
              />
              <div className="mt-1 text-red-600 min-h-[1.5rem] text-sm">
                {errors.password?.message}
              </div>
            </div>
          </div>
          {/* Mật khẩu mới */}
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
              Mật khẩu mới
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <Input
                className="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                {...register("new_password")}
                type="password"
                placeholder="Mật khẩu mới"
              />
              <div className="mt-1 text-red-600 min-h-[1.5rem] text-sm">
                {errors.new_password?.message}
              </div>
            </div>
          </div>
          {/* Nhập lại mật khẩu */}
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
              Nhập lại mật khẩu
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <Input
                className="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                {...register("confirmPassword")}
                type="password"
                placeholder="Nhập lại mật khẩu"
              />
              <div className="mt-1 text-red-600 min-h-[1.5rem] text-sm">
                {errors.confirmPassword?.message}
              </div>
            </div>
          </div>
          {/* Button submit */}
          <div className="mt-4 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right" />
            <div className="sm:w-[80%] sm:pl-5">
              <Button
                className="flex h-9 items-center rounded-sm bg-orange-500 px-5 text-center text-sm text-white hover:bg-orange-600"
                type="submit"
                disabled={updateProfileMutation.isPending}
              >
                {updateProfileMutation.isPending ? "Đang xử lý..." : "Lưu"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
