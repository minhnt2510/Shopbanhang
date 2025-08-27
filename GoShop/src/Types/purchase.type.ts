import type { Product } from "./product.type";

export type PurcheseStatus = -1 | 1 | 2 | 3 | 4 | 5;

export type PurchaseListStatus = PurcheseStatus | 0;

export interface Purchase {
  buy_count: number;
  price: number;
  price_before_discount: number;
  status: PurcheseStatus;
  product: Product;
  _id: string;
  user: string;
  createdAt: string;
  updatedAt: string;
}
