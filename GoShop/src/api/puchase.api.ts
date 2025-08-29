import type { Purchase, PurchaseListStatus } from "../Types/purchase.type";
import type { ResponseAPI } from "../Types/util.type";
import http from "../utils/http";

const URL = "purchases";
const purchaseApi = {
  addToCart(body: { product_id: string; buy_count: number }) {
    return http.post<ResponseAPI<Purchase>>(`${URL}/add-to-cart`, body);
  },
  getPurchases(params: { status: PurchaseListStatus }) {
    return http.get<ResponseAPI<Purchase[]>>(`${URL}`, {
      params,
    });
  },
  buyProducts(body: { product_id: string; buy_count: number }[]) {
    return http.post<ResponseAPI<Purchase>>(`${URL}/buy-products`, body);
  },
  updatePurchase(body: { product_id: string; buy_count: number }) {
    return http.put<ResponseAPI<Purchase>>(`${URL}/update-purchase`, body);
  },
  deletePurchase(purchaseIds: string[]) {
    return http.delete<ResponseAPI<{ deleted_count: number }>>(`${URL}`, {
      data: purchaseIds,
    });
  },
};

export default purchaseApi;
