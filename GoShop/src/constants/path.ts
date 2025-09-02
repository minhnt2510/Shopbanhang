const path = {
  productDetail: ":nameId",
  home: "/",
  login: "/login",
  register: "/register",
  logout: "/logout",
  profile: "/user/profile",
  changePassword: "/user/password",
  cart: "/cart",
  historyPurchase: "/user/historyPurchase",
  user: "/user",
} as const;

export default path;
