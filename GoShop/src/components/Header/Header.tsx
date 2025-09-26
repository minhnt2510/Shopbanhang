import { Search, ShoppingCart, Menu, X } from "lucide-react";
import { createSearchParams, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../api/auth.api";
import Input from "../Input";
import useQueryConfig from "../../hooks/useQueryConfig";
import { useForm } from "react-hook-form";
import { schema, type Schema } from "../../utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import omit from "lodash/omit";
import purchaseApi from "../../api/puchase.api";
import { formatCurrency } from "../../utils/util";
import Popover from "../Popover/Popover";
import { purchasesStatus } from "../../constants/purchase";
import path from "../../constants/path";
import Button from "../Button";
import { useTranslation } from "react-i18next";
import { AppContext } from "../../Context/app.context";
import i18nInstance from "../../i18n/i18n"; // ✅ import đúng instance i18n đã init

type FormData = Pick<Schema, "name">;
const nameSchema = schema.pick(["name"]);
const MAX_PURCHASE = 5;

const Header = () => {
  // chỉ lấy t() nếu bạn cần dịch key; việc đổi ngôn ngữ dùng instance
  useTranslation();

  // giữ ngôn ngữ hiện tại trong state, và update khi i18n đổi
  const [currentLang, setCurrentLang] = useState<string>(
    i18nInstance.language || "vi"
  );
  useEffect(() => {
    const handler = (lng: string) => setCurrentLang(lng);
    i18nInstance.on("languageChanged", handler);
    return () => {
      i18nInstance.off("languageChanged", handler);
    };
  }, []);

  const isVi = currentLang.startsWith("vi");
  const changeLanguage = (lng: "vi" | "en") => {
    if (!currentLang.startsWith(lng)) {
      i18nInstance.changeLanguage(lng).catch(console.error);
    }
  };

  const { profile, isAuthenticated, setIsAuthenticated } =
    useContext(AppContext);

  const queryClient = useQueryClient();
  const queryConfig = useQueryConfig();

  // form search
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: { name: "" },
    resolver: yupResolver(nameSchema),
  });

  // logout
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setIsAuthenticated(false);
      queryClient.removeQueries({
        queryKey: ["purchases", { status: purchasesStatus.inCart }],
      });
    },
  });
  const handleLogout = () => logoutMutation.mutate();

  // search submit
  const navigate = useNavigate();
  const onSubmitSearch = handleSubmit((data) => {
    navigate({
      pathname: "/",
      search: createSearchParams(
        omit({ ...queryConfig, name: data.name }).toString() as any
      ).toString(),
    });
  });

  // giỏ hàng
  const { data: purchasesInCartData } = useQuery({
    queryKey: ["purchases", { status: purchasesStatus.inCart }],
    queryFn: () => purchaseApi.getPurchases({ status: purchasesStatus.inCart }),
    enabled: isAuthenticated,
  });
  const purchasesInCart = purchasesInCartData?.data.data;

  // menu mobile
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="relative bg-white shadow-md border-b border-gray-200">
      {/* top bar */}
      <div className="bg-gray-50 py-2 text-sm text-gray-600">
        <div className="container mx-auto flex justify-between items-center px-4 sm:px-6">
          <span>
            {isVi
              ? "Miễn phí vận chuyển cho đơn hàng trên 500k"
              : "Free shipping for orders over 500k"}
          </span>
          <div className="flex items-center space-x-4 sm:space-x-6">
            <span className="hidden sm:block">Hotline: 1900-1234</span>

            {/* language switch */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => changeLanguage("vi")}
                className={`px-2 py-1 rounded-md text-xs font-semibold transition ${
                  isVi
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                VI
              </button>

              <button
                onClick={() => changeLanguage("en")}
                className={`px-2 py-1 rounded-md text-xs font-semibold transition ${
                  !isVi
                    ? "bg-black text-white"
                    : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
              >
                EN
              </button>
            </div>

            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="text-gray-800 hover:text-blue-600 font-medium transition"
                >
                  {isVi ? "Đăng nhập" : "Login"}
                </Link>
                <Link
                  to="/register"
                  className="text-gray-800 hover:text-blue-600 font-medium transition"
                >
                  {isVi ? "Đăng ký" : "Register"}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* main header */}
      <div className="py-4 sm:py-6">
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 gap-4 sm:gap-8">
          {/* logo */}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
            <h1 className="text-2xl sm:text-3xl font-bold text-black tracking-tight">
              Go<span className="text-black">Shop</span>
            </h1>
          </Link>

          {/* search */}
          <form
            onSubmit={onSubmitSearch}
            className="flex-1 w-full max-w-md sm:max-w-2xl mx-4 relative"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder={isVi ? "Tìm kiếm sản phẩm, thương hiệu..." : "Search products, brands..."}
              className="pl-12 pr-20 py-3 w-full border border-gray-300 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-black"
              {...register("name")}
            />
            <Button className="absolute right-2 top-1/2 -translate-y-1/2 bg-black hover:bg-gray-800 text-white rounded-lg px-4 py-2 font-semibold transition">
              {isVi ? "Tìm" : "Search"}
            </Button>
          </form>

          {/* actions desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* giỏ hàng */}
            <Popover
              renderPopover={
                <div className="w-80 bg-white rounded-lg shadow-lg border border-gray-300 p-4">
                  {purchasesInCart && purchasesInCart.length > 0 ? (
                    <>
                      <h3 className="font-bold mb-3 text-gray-900">
                        {isVi ? "Giỏ hàng" : "Cart"}
                      </h3>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {purchasesInCart.slice(0, MAX_PURCHASE).map((item: any) => (
                          <div
                            key={item._id}
                            className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-50 transition"
                          >
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 truncate">
                                {item.product.name}
                              </p>
                              <p className="text-xs text-gray-600">
                                {item.buy_count} ×{" "}
                                <span className="text-black font-semibold">
                                  {formatCurrency(item.price)}đ
                                </span>
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Link
                        to={path.cart}
                        className="block mt-4 text-center bg-black hover:bg-gray-800 text-white font-semibold rounded-lg py-2 transition"
                      >
                        {isVi ? "Xem giỏ hàng" : "View cart"}
                      </Link>
                    </>
                  ) : (
                    <p className="text-gray-500 text-center py-6">
                      {isVi ? "Giỏ hàng trống" : "Your cart is empty"}
                    </p>
                  )}
                </div>
              }
            >
              <button className="relative p-3 border border-gray-300 rounded-lg hover:bg-gray-100 transition">
                <ShoppingCart className="w-5 h-5 text-gray-800" />
                {purchasesInCart && purchasesInCart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {purchasesInCart.length}
                  </span>
                )}
              </button>
            </Popover>

            {/* user */}
            {isAuthenticated && (
              <Popover
                renderPopover={
                  <div className="bg-white rounded-lg shadow-lg border border-gray-300 overflow-hidden">
                    <Link to={path.profile}>
                      <button className="block w-full text-left px-6 py-4 hover:bg-gray-50 transition text-gray-900">
                        {isVi ? "Tài khoản của tôi" : "My account"}
                      </button>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-6 py-4 hover:bg-gray-50 transition text-red-600 font-semibold"
                    >
                      {isVi ? "Đăng xuất" : "Log out"}
                    </button>
                  </div>
                }
              >
                <div className="flex items-center cursor-pointer">
                  <img
                    src={profile?.avatar}
                    alt="avatar"
                    className="h-8 w-8 rounded-full object-cover border border-gray-200"
                  />
                  <span className="ml-2 text-sm text-gray-900 hover:text-gray-600">
                    {profile?.email}
                  </span>
                </div>
              </Popover>
            )}
          </div>

          {/* mobile toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-800 hover:bg-gray-100 rounded-lg transition"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-200 md:hidden z-50">
          <nav className="flex flex-col p-4 space-y-3">
            <Link
              to="/"
              className="text-gray-800 font-medium hover:text-blue-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              {isVi ? "Trang chủ" : "Home"}
            </Link>
            <Link
              to={path.cart}
              className="text-gray-800 font-medium hover:text-blue-600 transition"
              onClick={() => setIsMenuOpen(false)}
            >
              {isVi ? "Giỏ hàng" : "Cart"}
            </Link>

            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="text-gray-800 font-medium hover:text-blue-600 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {isVi ? "Đăng nhập" : "Login"}
                </Link>
                <Link
                  to="/register"
                  className="text-gray-800 font-medium hover:text-blue-600 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {isVi ? "Đăng ký" : "Register"}
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={path.profile}
                  className="text-gray-800 font-medium hover:text-blue-600 transition"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {isVi ? "Tài khoản của tôi" : "My account"}
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="text-red-600 font-medium hover:text-red-700 transition text-left"
                >
                  {isVi ? "Đăng xuất" : "Log out"}
                </button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
