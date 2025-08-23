export interface Product {
  _id: string;
  images: string[];
  price: number;
  rating: number;
  price_before_discount: number;
  quantity: number;
  sold: number;
  view: number;
  name: string;
  category: {
    _id: string;
    name: string;
  };
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductList {
  products: Product[];
  paginate: {
    page: number;
    limit: number;
    page_size: number;
    total: number; // 👈 để ở đây thay vì trong queryConfig
  };
}

export interface ProductListConfig {
  page?: number | string;
  limit?: number | string;
  sort_by?: "createdAt" | "view" | "sold" | "price";
  exclude?: string | string;
  rating_filter?: number | string;
  price_min?: number | string;
  price_max?: number | string;
  name?: string;
  order?: "asc" | "desc";
  category?: string;
}
