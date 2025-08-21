import type { Category } from "../Types/category.type";
import type { ResponseAPI } from "../Types/util.type";
import http from "../utils/http";

const URL = "categories";
const categoryApi = {
  getCategories() {
    return http.get<ResponseAPI<Category[]>>(URL);
  },
};
export default categoryApi;
