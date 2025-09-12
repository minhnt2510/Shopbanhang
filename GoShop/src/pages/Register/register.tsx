import { Link, useNavigate } from "react-router-dom";
import { schema, type Schema } from "../../utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { omit } from "lodash";
import { isAxiosUnprocessableEntityError } from "../../utils/util";
import type { ResponseAPI } from "../../Types/util.type";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { registerAccount } from "../../api/auth.api";
import { AppContext } from "../../Context/app.context";

type FormData = Pick<Schema, "email" | "password" | "confirmPassword">;
const registerSchema = schema.pick(["email", "password", "confirmPassword"]);

const Register = () => {
  const { setIsAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema),
  });

  // --- Mutation đăng ký ---
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FormData, "confirmPassword">) =>
      registerAccount(body),
    onSuccess: (data) => {
      console.log("Đăng ký thành công:", data);
      setIsAuthenticated(true);
      navigate("/");
    },
    onError: (error: unknown) => {
      if (
        isAxiosUnprocessableEntityError<
          ResponseAPI<Omit<FormData, "confirmPassword">>
        >(error)
      ) {
        const formError = error.response?.data?.data;
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof Omit<FormData, "confirmPassword">, {
              message:
                formError[key as keyof Omit<FormData, "confirmPassword">],
              type: "Server",
            });
          });
        }
      } else {
        console.error("Lỗi khác:", error);
      }
    },
  });

  // Thêm hàm onSubmit
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ["confirmPassword"]);
    registerAccountMutation.mutate(body);
  });

  return (
    <div className="bg-gray-200 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">GoShop</h1>
            <p className="text-gray-600 mt-2">Đăng ký</p>
          </div>

          <form className="space-y-4" onSubmit={onSubmit} noValidate>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập email"
                {...register("email")}
              />
              <div className="mt-1 text-red-600 min-h-[1.5rem] text-sm">
                {errors.email?.message}
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập mật khẩu"
                autoComplete="on"
                {...register("password")}
              />
              <div className="mt-1 text-red-600 min-h-[1.5rem] text-sm">
                {errors.password?.message}
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập lại mật khẩu"
                autoComplete="on"
                {...register("confirmPassword", {
                  validate: (value) =>
                    value === getValues("password") || "Mật khẩu không khớp",
                })}
              />
              <div className="mt-1 text-red-600 min-h-[1.5rem] text-sm">
                {errors.confirmPassword?.message}
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Đăng ký
            </button>
            <div className="text-sm text-gray-500">
              Bạn đã có tài khoản?
              <Link to="/login" className="text-red-500 px-1">
                Đăng nhập
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
