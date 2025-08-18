import { useQuery } from "@tanstack/react-query";
import AsideFilter from "./AsideFilter";
import Product from "./Product/Product";
import SoftProductList from "./SoftProductList";
import useQueryParam from "../../hooks/useQueryParam";
import productApi from "../../api/product.api";

const ProductList = () => {
  const queryParams = useQueryParam();
  const { data } = useQuery({
    queryKey: ["products", queryParams],
    queryFn: () => {
      return productApi.getProducts(queryParams);
    },
  });
  console.log(data);
  return (
    <div className="bg-gray-200 py-6">
      <div className="container">
        <div className="grid grid-cols-12 gap-6">
          {/* bên aside */}
          <div className="col-span-3">
            <AsideFilter />
          </div>
          <div className="col-span-9">
            <SoftProductList />
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {/* generate ra 30 product */}
              {data &&
                data.data.data?.products.map((product) => (
                  <div className="col-span-1 " key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
