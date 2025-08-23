import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import productApi from "../../api/product.api";

const ProductDetail = () => {
  const { id } = useParams();
  const { data: ProductDetailData } = useQuery({
    queryKey: ["product", id],
    queryFn: () => productApi.getProductDetail(id as string),
  });
  const product = ProductDetailData?.data.data;
  console.log(product);
  return <div className=""></div>;
};

export default ProductDetail;
