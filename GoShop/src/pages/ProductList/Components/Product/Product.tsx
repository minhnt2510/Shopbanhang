import { Link } from "react-router-dom";
import type { Product as ProductType } from "../../../../Types/product.type";
import {
  formatCurrency,
  formatNumberToSocialStyle,
  generateNameId,
} from "../../../../utils/util";
import ProductRating from "../../../../components/ProductRating";
import path from "../../../../constants/path";

interface Props {
  product: ProductType;
}
const Product = ({ product }: Props) => {
  return (
    <Link
      to={`${path.home}${generateNameId({
        name: product.name,
        id: product._id,
      })}`}
    >
      <div className="bg-white rounded-sm shadow hover:translate-y-[-0.0625rem] hover:shadow-md duration-100 transition-transform overflow-hidden ">
        <div className="w-full pt-[100%] relative ">
          <img
            src={product.image}
            alt={product.name}
            className="absolute top-0 left-0 bg-white w-full h-full object-cover"
          />
        </div>
        <div className="p-2 overflow-hidden">
          <div className="min-h-[1.75rem] line-clamp-2 text-sm">
            {product.name}
          </div>
          <div className="flex items-center mt-3">
            <div className="line-through max-w-[50%] text-gray-500 truncate text-xs">
              {formatCurrency(product.price_before_discount)}
            </div>
            <div className="text-orange-600 truncate ml-1">
              <span className="text-xs">₫</span>
              <span className="">{formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className="mt-3 flex items-center justify-end">
            <div className="flex items-center">
              <ProductRating rating={product.rating} />
              <div className="pl-2 text-xs">
                <span className="ml-1 mr-1">Đã bán</span>
                <span className="">
                  {formatNumberToSocialStyle(product.sold)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Product;
