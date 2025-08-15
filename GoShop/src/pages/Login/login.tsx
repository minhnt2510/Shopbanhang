import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="bg-gray-200 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">GoShop</h1>
            <p className="text-gray-600 mt-2">Đăng nhập</p>
          </div>

          <form className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập email"
              />
              <div className="mt-1 text-red-600 min-h-[1.5rem] text-sm"></div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Nhập mật khẩu"
              />
              <div className="mt-1 text-red-600 min-h-[1.5rem] text-sm"></div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Đăng nhập
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
