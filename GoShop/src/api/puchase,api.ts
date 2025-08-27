import type { Purchase, PurchaseListStatus } from "../Types/purchase.type";
import type { ResponseAPI } from "../Types/util.type";
import http from "../utils/http";

const URL = "purchases";
const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<ResponseAPI<Purchase>>(`${URL}/add-to-cart`, body);
  },
  getPurchases(params: { status: PurchaseListStatus }) {
    return http.get<ResponseAPI<Purchase>>(`${URL}`, {
      params,
    });
  },
};

export default purchaseApi;
