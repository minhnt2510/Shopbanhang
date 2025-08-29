import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./Context/app.context";

import ProductList from "./pages/ProductList";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";

import RegisterLayout from "./layouts/RegisterLayout";
import MainLayout from "./layouts/MainLayout";
import ProductDetail from "./pages/ProductDetail";
import path from "./constants/path";
import Cart from "./pages/Cart";

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
          path: "profile",
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          ),
        },
        {
          path: path.cart,
          element: (
            <MainLayout>
              <Cart />
            </MainLayout>
          ),
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
          path: "login",
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          ),
        },

        {
          path: "register",
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
