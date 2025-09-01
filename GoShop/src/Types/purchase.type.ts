import type { Product } from "./product.type";

export type PurcheseStatus = -1 | 1 | 2 | 3 | 4 | 5;

export type PurchaseListStatus = PurcheseStatus | 0;

export interface Purchase {
  price: number;
  price_before_discount: number;
  buy_count: number;
  status: PurcheseStatus;
  product: Product;
  _id: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}
