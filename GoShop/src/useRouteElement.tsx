import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { useContext, lazy, Suspense } from "react";
import { AppContext } from "./Context/app.context";
// import Login from "./pages/Login";
// import ProductList from "./pages/ProductList";
// import Register from "./pages/Register";
// import RegisterLayout from "./layouts/RegisterLayout";
// import MainLayout from "./layouts/MainLayout";
// import ProductDetail from "./pages/ProductDetail";
import path from "./constants/path";
// import Cart from "./pages/Cart";
// import UserLayout from "./pages/User/Layout/UserLayout";
// import HistoryPurchase from "./pages/User/Pages/HistoryPurchase";
// import ChangePassword from "./pages/User/Pages/ChangePassword";
// import Profile from "./pages/User/Pages/Profile";
// import NotFound from "./pages/NotFound";

const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ProductList = lazy(() => import("./pages/ProductList"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const HistoryPurchase = lazy(
  () => import("./pages/User/Pages/HistoryPurchase")
);
const ChangePassword = lazy(() => import("./pages/Login"));
const UserLayout = lazy(() => import("./pages/User/Layout/UserLayout"));
const Profile = lazy(() => import("./pages/User/Pages/Profile"));
const RegisterLayout = lazy(() => import("./layouts/RegisterLayout"));
const NotFound = lazy(() => import("./pages/NotFound"));
const MainLayout = lazy(() => import("./layouts/MainLayout"));

// Route yêu cầu đăng nhập
const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext);
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

// Route chỉ cho user chưa đăng nhập
const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext);
  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};

const useRouteElement = () => {
  const routeElements = useRoutes([
    {
      path: "/",
      element: (
        <MainLayout>
          <Suspense>
            <ProductList />
          </Suspense>
        </MainLayout>
      ),
      index: true,
    },
    {
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <MainLayout>
              <Suspense>
                <Cart />
              </Suspense>
            </MainLayout>
          ),
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <Suspense>
                <UserLayout />
              </Suspense>
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: (
                <Suspense>
                  <Profile />
                </Suspense>
              ),
            },
            {
              path: path.changePassword,
              element: (
                <Suspense>
                  <ChangePassword />
                </Suspense>
              ),
            },
            {
              path: path.historyPurchase,
              element: (
                <Suspense>
                  <HistoryPurchase />
                </Suspense>
              ),
            },
          ],
        },
      ],
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <Suspense>
            <ProductDetail />
          </Suspense>
        </MainLayout>
      ),
    },
    {
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Suspense>
                <Login />
              </Suspense>
            </RegisterLayout>
          ),
        },

        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense>
                <Register />
              </Suspense>
            </RegisterLayout>
          ),
        },
      ],
    },
    {
      path: "*",
      element: (
        <MainLayout>
          <Suspense>
            <NotFound />
          </Suspense>
        </MainLayout>
      ),
    },
  ]);

  return routeElements;
};

export default useRouteElement;
