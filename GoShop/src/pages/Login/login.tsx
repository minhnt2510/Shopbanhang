import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { schema, type Schema } from "../../utils/rules";
import { useMutation } from "@tanstack/react-query";
import { loginAccount } from "../../api/auth.api";
import { isAxiosUnprocessableEntityError } from "../../utils/util";
import type { ResponseAPI } from "../../Types/util.type";
import { useContext } from "react";
import { AppContext } from "../../Context/app.context";

type FormData = {
  email: string;
  password: string;
};

const loginSchema = schema.omit(["confirmPassword"]);

const Login = () => {
  const { setIsAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
  });

  // --- Mutation đăng nhập ---
  const loginAccountMutation = useMutation({
    mutationFn: (body: FormData) => loginAccount(body),
    onSuccess: (data) => {
      console.log("Đăng nhập thành công:", data);
      // Có thể redirect hoặc lưu token vào localStorage/context
      setIsAuthenticated(true);
      navigate("/");
    },
    onError: (error: unknown) => {
      if (isAxiosUnprocessableEntityError<ResponseAPI<FormData>>(error)) {
        const formError = error.response?.data?.data;
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: "Server",
            });
          });
        }
      } else {
        console.error("Lỗi khác:", error);
      }
    },
  });

  const onSubmit = handleSubmit((data) => {
    const body = {
      email: data.email,
      password: data.password,
    };
    loginAccountMutation.mutate(body);
  });

  return (
    <div className="bg-gray-200 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">GoShop</h1>
            <p className="text-gray-600 mt-2">Đăng nhập</p>
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

            <button
              type="submit"
              disabled={loginAccountMutation.isPending}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loginAccountMutation.isPending
                ? "Đang đăng nhập..."
                : "Đăng nhập"}
            </button>

            <div className="text-sm text-gray-500">
              Bạn chưa có tài khoản?
              <Link to="/register" className="text-red-500 px-1">
                Đăng ký
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
