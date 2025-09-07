import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./Context/app.context";

import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Register from "./pages/Register";

import RegisterLayout from "./layouts/RegisterLayout";
import MainLayout from "./layouts/MainLayout";
import ProductDetail from "./pages/ProductDetail";
import path from "./constants/path";
import Cart from "./pages/Cart";
import UserLayout from "./pages/User/Layout/UserLayout";
import HistoryPurchase from "./pages/User/Pages/HistoryPurchase";
import ChangePassword from "./pages/User/Pages/ChangePassword";
import Profile from "./pages/User/Pages/Profile";

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
          <ProductList />
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
              <Cart />
            </MainLayout>
          ),
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: <Profile />,
            },
            {
              path: path.changePassword,
              element: <ChangePassword />,
            },
            {
              path: path.historyPurchase,
              element: <HistoryPurchase />,
            },
          ],
        },
      ],
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
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
              <Login />
            </RegisterLayout>
          ),
        },

        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          ),
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" />,
    },
  ]);

  return routeElements;
};

export default useRouteElement;
