import classNames from "classnames";
import { useNavigate, Link } from "react-router-dom";
import { createSearchParams } from "react-router-dom";
import { sortBy, order as orderConstant } from "../../../constants/product";
import type { ProductListConfig } from "../../../Types/product.type";
import omit from "lodash/omit";
import type { QueryConfig } from "../../../hooks/useQueryConfig";

interface Props {
  pageSize: number;
  queryConfig: QueryConfig;
}

const SortProductList = ({ pageSize, queryConfig }: Props) => {
  const { sort_by = sortBy.createdAt, order } = queryConfig;
  const navigate = useNavigate();
  const isActiveSortBy = (
    sortByValue: Exclude<ProductListConfig["sort_by"], undefined>
  ) => {
    return sort_by === sortByValue;
  };

  const handleSort = (
    sortByValue: Exclude<ProductListConfig["sort_by"], undefined>
  ) => {
    navigate({
      pathname: "/",
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue,
          },
          ["order"]
        )
      ).toString(),
    });
  };

  const handlePriceOrder = (
    orderValue: Exclude<ProductListConfig["order"], undefined>
  ) => {
    navigate({
      pathname: "/",
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: orderValue,
      }).toString(),
    });
  };

  return (
    <div className="bg-gray-300/40 py-4 px-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <div>Sắp xếp theo</div>
          <button
            className={classNames("h-8 px-4 text-center text-sm capitalize", {
              "bg-orange text-white hover:bg-orange/80": isActiveSortBy(
                sortBy.view
              ),
              "bg-white text-black hover:bg-slate-100": !isActiveSortBy(
                sortBy.view
              ),
            })}
            onClick={() => handleSort(sortBy.view)}
          >
            Phổ biến
          </button>
          <button
            className={classNames("h-8 px-4 text-center text-sm capitalize", {
              "bg-orange text-white hover:bg-orange/80": isActiveSortBy(
                sortBy.createdAt
              ),
              "bg-white text-black hover:bg-slate-100": !isActiveSortBy(
                sortBy.createdAt
              ),
            })}
            onClick={() => handleSort(sortBy.createdAt)}
          >
            Mới nhất
          </button>
          <button
            className={classNames("h-8 px-4 text-center text-sm capitalize", {
              "bg-orange text-white hover:bg-orange/80": isActiveSortBy(
                sortBy.sold
              ),
              "bg-white text-black hover:bg-slate-100": !isActiveSortBy(
                sortBy.sold
              ),
            })}
            onClick={() => handleSort(sortBy.sold)}
          >
            Bán chạy
          </button>
          <select
            className={classNames(
              "h-8 px-4 text-left text-sm capitalize outline-none",
              {
                "bg-orange text-white hover:bg-orange/80": isActiveSortBy(
                  sortBy.price
                ),
                "bg-white text-black hover:bg-slate-100": !isActiveSortBy(
                  sortBy.price
                ),
              }
            )}
            value={order || ""}
            onChange={(event) =>
              handlePriceOrder(
                event.target.value as Exclude<
                  ProductListConfig["order"],
                  undefined
                >
              )
            }
          >
            <option value="" disabled className="bg-white text-black">
              Giá
            </option>
            <option value={orderConstant.asc} className="bg-white text-black">
              Giá: Thấp đến cao
            </option>
            <option value={orderConstant.desc} className="bg-white text-black">
              Giá: Cao đến thấp
            </option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SortProductList;
