import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AsideFilter from "./Components/AsideFilter";
import Product from "./Components/Product/Product";
import type { ProductListConfig } from "../../Types/product.type";
import productApi from "../../api/product.api";
import SortProductList from "./SoftProductList";
import Paginate from "../../components/Paginate";
import categoryApi from "../../api/category.api";
import useQueryConfig from "../../hooks/useQueryConfig";
import { Menu, X } from "lucide-react";

export default function ProductList() {
  // lấy query từ url
  const queryConfig = useQueryConfig();
  const [page, setPage] = useState(1);

  // state cho mobile filter menu
  const [showFilter, setShowFilter] = useState(false);

  // gọi API với react-query
  const { data: productData } = useQuery({
    queryKey: ["products", queryConfig],
    queryFn: () => productApi.getProducts(queryConfig as ProductListConfig),
    placeholderData: keepPreviousData,
    staleTime: 3 * 60 * 1000,
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryApi.getCategories(),
  });

  // fallback dữ liệu khi API chưa trả về
  const products = productData?.data?.data?.products ?? [];
  const pageSize = productData?.data?.data?.paginate?.page_size ?? 0;

  return (
    <div className="bg-white py-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-12 gap-6">
          {/* AsideFilter cho desktop */}
          <div className="hidden md:block md:col-span-3">
            <AsideFilter
              categories={categoriesData?.data.data || []}
              queryConfig={queryConfig}
            />
          </div>

          {/* Main content */}
          <div className="col-span-12 md:col-span-9">
            {/* Nút mở filter cho mobile */}
            <div className="mb-4 flex items-center justify-between md:hidden">
              <button
                onClick={() => setShowFilter(true)}
                className="flex items-center gap-2 px-3 py-2 border rounded-md bg-black text-white"
              >
                <Menu className="w-5 h-5" />
                <span>Bộ lọc</span>
              </button>
            </div>

            <SortProductList pageSize={pageSize} queryConfig={queryConfig} />

            {/* Danh sách sản phẩm */}
            <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {products.map((product) => (
                <div className="col-span-1" key={product._id}>
                  <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition">
                    <Product product={product} />
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <Paginate
              page={page}
              setPage={setPage}
              pageSize={pageSize}
              queryConfig={queryConfig}
            />
          </div>
        </div>
      </div>

      {/* Overlay filter cho mobile */}
      {showFilter && (
        <div className="fixed inset-0 z-50 flex">
          {/* background mờ */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setShowFilter(false)}
          ></div>

          {/* content */}
          <div className="relative bg-white w-3/4 max-w-xs h-full p-4 shadow-lg z-50 overflow-y-auto">
            <button
              onClick={() => setShowFilter(false)}
              className="absolute top-3 right-3 text-black"
            >
              <X className="w-6 h-6" />
            </button>
            <AsideFilter
              categories={categoriesData?.data.data || []}
              queryConfig={queryConfig}
            />
          </div>
        </div>
      )}
    </div>
  );
}
