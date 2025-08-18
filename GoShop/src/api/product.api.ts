import type {
  Product,
  productList,
  ProductListConfig,
} from "../Types/product.type";
import type { ResponseAPI } from "../Types/util.type";
import http from "../utils/http";

const URL = "products";
const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<ResponseAPI<productList>>(URL, {
      params,
    });
  },
  getProductDetail(id: string) {
    return http.get<ResponseAPI<Product>>(`${URL}/${id}`);
  },
};
export default productApi;
