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

export default function ProductList() {
  // lấy query từ url
  const [page, setPage] = useState(1);

  // config query để truyền vào API
  const queryConfig = useQueryConfig();

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
    <div className="bg-gray-200 py-6">
      <div className="container">
        <div className="grid grid-cols-12 gap-6">
          {/* AsideFilter */}
          <div className="col-span-3 ">
            <AsideFilter
              categories={categoriesData?.data.data || []}
              queryConfig={queryConfig}
            />
          </div>

          {/* Main content */}
          <div className="col-span-9">
            <SortProductList pageSize={pageSize} queryConfig={queryConfig} />

            {/* Danh sách sản phẩm */}
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {products.map((product) => (
                <div className="col-span-1" key={product._id}>
                  <Product product={product} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <Paginate
              page={page}
              setPage={setPage}
              pageSize={7}
              queryConfig={queryConfig}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
