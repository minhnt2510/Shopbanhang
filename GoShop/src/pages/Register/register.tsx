import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { schema, type Schema } from "../../utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { registerAccount } from "../../api/auth.api";
import { omit } from "lodash";

const Register = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Schema>({
    resolver: yupResolver(schema),
  });
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ["confirmPassword"]);
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data);
      },
    });
  });
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<Schema, "confirmPassword">) =>
      registerAccount(body),
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
                htmlFor="password"
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
                  validate: (value) => {
                    return (
                      value === getValues("password") || "Mật khẩu không khớp"
                    );
                  },
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
