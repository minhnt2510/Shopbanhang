import { Search, ShoppingCart, User, Menu, Heart, Bell } from "lucide-react";
import Dropdown from "../DropDown";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../Context/app.context";
import { useMutation, useQuery } from "@tanstack/react-query";
import { logout } from "../../api/auth.api";
import Input from "../Input";
import Button from "../Button/Button";
import useQueryConfig from "../../hooks/useQueryConfig";
import { useForm } from "react-hook-form";
import { schema, type Schema } from "../../utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import { omit } from "lodash";
import { purchasStatus } from "../../constants/purchase";
import purchaseApi from "../../api/puchase.api";
import { formatCurrency } from "../../utils/util";

type FormData = Pick<Schema, "name">;

const nameSchema = schema.pick(["name"]);
const Header = () => {
  const queryConfig = useQueryConfig();
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: "",
    },
    resolver: yupResolver(nameSchema),
  });
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
  const navigate = useNavigate();

  const onSubmitSearch = handleSubmit((data) => {
    navigate({
      pathname: "/",
      search: createSearchParams(
        omit({
          ...queryConfig,
          name: data.name,
        })
      ).toString(),
    });
  });
  // khi chuyen trang thi header chi bi re-render chu kh bi unmount
  const { data: purchasesInCartData } = useQuery({
    queryKey: ["purchases", { status: purchasStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasStatus.inCart }),
  });
  console.log("header");

  const purchasesInCart = purchasesInCartData?.data.data;

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-xl border-b border-slate-700">
      {/* top bar */}
      <div className="bg-slate-950/50 py-2 text-sm text-slate-300 backdrop-blur-sm">
        <div className="container mx-auto flex justify-between items-center px-6">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
            Miễn phí vận chuyển cho đơn hàng trên 500k
          </span>
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-blue-400 rounded-full"></span>
              Hotline: 1900-1234
            </span>
            <Link
              to="/login"
              className="hover:text-blue-300 transition-all duration-300 hover:scale-105 font-medium"
            >
              Đăng nhập
            </Link>
            <Link
              to="/register"
              className="hover:text-blue-300 transition-all duration-300 hover:scale-105 font-medium"
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </div>

      {/* main header */}
      <div className="py-6">
        <div className="container mx-auto flex items-center justify-between px-6 gap-8">
          {/* logo */}
          <Link to="/">
            <div className="flex items-center space-x-4 group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-3 shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-105">
                <h1 className="text-2xl font-bold text-white">Go</h1>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  Shop
                </h1>
                <p className="text-sm text-slate-300 font-medium">
                  Mua sắm thông minh
                </p>
              </div>
            </div>
          </Link>

          {/* search */}
          <form
            onSubmit={onSubmitSearch}
            className="flex-1 max-w-3xl mx-8 relative group"
          >
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5 group-focus-within:text-blue-500 transition-colors duration-200" />
            <Input
              placeholder="Tìm kiếm sản phẩm, thương hiệu..."
              className="pl-14 pr-24 py-4 w-full border-0 bg-white/95 backdrop-blur-sm shadow-lg rounded-2xl text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/50 focus:shadow-xl transition-all duration-300"
              {...register("name")}
            />
            <Button className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl px-6 py-2.5 font-semibold shadow-lg hover:shadow-orange-500/25 transition-all duration-300 hover:scale-105">
              Tìm
            </Button>
          </form>

          {/* actions */}
          <div className="flex items-center space-x-3">
            <Button className="relative bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20 rounded-xl p-3 transition-all duration-300 hover:scale-110 hover:shadow-lg">
              <Heart className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg">
                2
              </span>
            </Button>

            <Button className="relative bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20 rounded-xl p-3 transition-all duration-300 hover:scale-110 hover:shadow-lg">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                5
              </span>
            </Button>

            {/* giỏ hàng */}
            <Dropdown
              trigger={
                <Button className="relative bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20 rounded-xl p-3 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                  <ShoppingCart className="w-5 h-5" />
                  {purchasesInCart && purchasesInCart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg">
                      {purchasesInCart.length}
                    </span>
                  )}
                </Button>
              }
            >
              <div className="w-96 p-6 bg-white rounded-2xl shadow-2xl border border-slate-200">
                {purchasesInCart && purchasesInCart.length > 0 ? (
                  <>
                    <h3 className="font-bold mb-4 text-xl text-slate-800 border-b border-slate-100 pb-3">
                      Giỏ hàng của bạn
                    </h3>

                    <div className="space-y-4 max-h-80 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-300">
                      {purchasesInCart.slice(0, 5).map((purchase) => (
                        <div
                          key={purchase._id}
                          className="flex items-center space-x-4 p-3 rounded-xl hover:bg-slate-50 transition-colors duration-200"
                        >
                          {/* Ảnh sản phẩm */}
                          <div className="w-16 h-16 flex-shrink-0">
                            <img
                              src={purchase.product.image || "/placeholder.svg"}
                              alt={purchase.product.name}
                              className="w-full h-full object-cover rounded-xl shadow-md"
                            />
                          </div>

                          {/* Thông tin */}
                          <div className="flex-1 overflow-hidden">
                            <p className="text-sm font-semibold text-slate-800 truncate mb-1">
                              {purchase.product.name}
                            </p>
                            <p className="text-sm text-slate-500 font-medium">
                              {purchase.buy_count} x{" "}
                              <span className="text-blue-600 font-bold">
                                {formatCurrency(purchase.price)}đ
                              </span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Nút hành động */}
                    <div className="flex gap-3 mt-6 pt-4 border-t border-slate-100">
                      <Button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl py-3 font-semibold transition-all duration-300 hover:scale-105">
                        Xem giỏ hàng
                      </Button>
                      <Button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl py-3 font-semibold shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105">
                        Thanh toán
                      </Button>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-slate-500 py-12">
                    <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-slate-300" />
                    <p className="text-lg font-medium">Giỏ hàng trống</p>
                  </div>
                )}
              </div>
            </Dropdown>

            {/* user menu */}
            {isAuthenticated && (
              <Dropdown
                trigger={
                  <Button className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20 rounded-xl p-3 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                    <User className="w-5 h-5" />
                  </Button>
                }
              >
                <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
                  <button className="block w-full text-left px-6 py-4 hover:bg-slate-50 transition-colors duration-200 font-medium text-slate-700 border-b border-slate-100">
                    Tài khoản của tôi
                  </button>
                  <button className="block w-full text-left px-6 py-4 hover:bg-slate-50 transition-colors duration-200 font-medium text-slate-700 border-b border-slate-100">
                    Đơn hàng
                  </button>
                  <button className="block w-full text-left px-6 py-4 hover:bg-slate-50 transition-colors duration-200 font-medium text-slate-700 border-b border-slate-100">
                    Yêu thích
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-6 py-4 hover:bg-red-50 transition-colors duration-200 font-medium text-red-600"
                  >
                    Đăng xuất
                  </button>
                </div>
              </Dropdown>
            )}
          </div>
        </div>
      </div>

      {/* nav */}
      <div className="bg-slate-900/80 backdrop-blur-sm py-3 border-t border-slate-700/50">
        <div className="container mx-auto flex items-center px-6 space-x-8">
          <Button className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20 rounded-xl px-4 py-2.5 flex items-center font-semibold transition-all duration-300 hover:scale-105">
            <Menu className="w-4 h-4 mr-2" />
            Danh mục
          </Button>
          <nav className="flex space-x-8 text-sm">
            {[
              "Điện thoại",
              "Laptop",
              "Thời trang",
              "Gia dụng",
              "Khuyến mãi",
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="text-slate-200 hover:text-white font-medium transition-all duration-300 hover:scale-105 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Header;
