import type {
  Product,
  ProductList,
  ProductListConfig,
} from "../Types/product.type";
import type { ResponseAPI } from "../Types/util.type";
import http from "../utils/http";

const URL = "products" as const;

const productApi = {
  getProducts(params: ProductListConfig) {
    return http.get<ResponseAPI<ProductList>>(URL, {
      params,
    });
  },
  getProductDetail(id: string) {
    return http.get<ResponseAPI<Product>>(`${URL}/${id.trim()}`);
  },
};

export default productApi;
