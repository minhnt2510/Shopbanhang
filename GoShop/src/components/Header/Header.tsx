import { Search, ShoppingCart, User, Menu, Heart, Bell } from "lucide-react";
import Dropdown from "../DropDown";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../Context/app.context";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../api/auth.api";
import Input from "../Input";
import Button from "../Button/Button";

const Header = () => {
  const { setIsAuthenticated, isAuthenticated } = useContext(AppContext);
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setIsAuthenticated(false);
    },
  });
  const handleLogout = () => {
    logoutMutation.mutate();
  };
  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-500 shadow-lg">
      {/* top bar */}
      <div className="bg-blue-700 py-1 text-xs text-blue-100">
        <div className="container mx-auto flex justify-between px-4">
          <span>Miễn phí vận chuyển cho đơn hàng trên 500k</span>
          <div className="flex space-x-4">
            <span>Hotline: 1900-1234</span>
            <Link
              to="/login"
              className="hover:text-gray-300 transition-colors duration-200"
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="hover:text-gray-300 transition-colors duration-200"
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </div>

      {/* main header */}
      <div className="py-4">
        <div className="container mx-auto flex items-center justify-between px-4 gap-6">
          {/* logo */}
          <div className="flex items-center space-x-3">
            <div className="bg-white rounded-lg p-2">
              <h1 className="text-2xl font-bold text-blue-600">Go</h1>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Shop</h1>
              <p className="text-xs text-blue-100">Mua sắm thông minh</p>
            </div>
          </div>

          {/* search */}
          <div className="flex-1 max-w-2xl mx-6 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Tìm kiếm sản phẩm, thương hiệu..."
              className="pl-12 pr-20 w-full border-white bg-white shadow-sm"
            />
            <Button className="absolute right-0 top-1/2 -translate-y-1/2 bg-orange-500 text-white rounded-full px-4 py-1 cursor-pointer">
              Tìm
            </Button>
          </div>

          {/* actions */}
          <div className="flex items-center space-x-2">
            <Button className="relative bg-transparent text-white hover:bg-blue-600">
              <Heart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </Button>

            <Button className="relative bg-transparent text-white hover:bg-blue-600">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                5
              </span>
            </Button>

            {/* giỏ hàng */}
            <Dropdown
              trigger={
                <Button className="relative bg-transparent text-white hover:bg-blue-600">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </Button>
              }
            >
              <h3 className="font-semibold mb-3">Giỏ hàng của bạn</h3>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">iPhone 15 Pro</p>
                  <p className="text-xs text-gray-500">1 x 25,000,000đ</p>
                </div>
              </div>
              <div className="border-t my-3" />
              <div className="flex justify-between items-center">
                <span className="font-semibold">Tổng: 75,000,000đ</span>
                <Button className="bg-blue-600 text-white rounded">
                  Thanh toán
                </Button>
              </div>
            </Dropdown>

            {/* user menu */}
            {isAuthenticated && (
              <Dropdown
                trigger={
                  <Button className="bg-transparent text-white hover:bg-blue-600">
                    <User className="w-5 h-5" />
                  </Button>
                }
              >
                <button className="block w-full text-left px-3 py-1 hover:bg-gray-100 rounded">
                  Tài khoản của tôi
                </button>
                <button className="block w-full text-left px-3 py-1 hover:bg-gray-100 rounded">
                  Đơn hàng
                </button>
                <button className="block w-full text-left px-3 py-1 hover:bg-gray-100 rounded">
                  Yêu thích
                </button>
                <div className="border-t my-1" />
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-1 hover:bg-gray-100 rounded"
                >
                  Đăng xuất
                </button>
              </Dropdown>
            )}
          </div>
        </div>
      </div>

      {/* nav */}
      <div className="bg-blue-800 py-2">
        <div className="container mx-auto flex items-center px-4 space-x-8">
          <Button className="bg-transparent text-white hover:bg-blue-700 flex items-center">
            <Menu className="w-4 h-4 mr-2" />
            Danh mục
          </Button>
          <nav className="flex space-x-6 text-sm">
            {[
              "Điện thoại",
              "Laptop",
              "Thời trang",
              "Gia dụng",
              "Khuyến mãi",
            ].map((item) => (
              <a key={item} href="#" className="text-white hover:text-blue-200">
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
