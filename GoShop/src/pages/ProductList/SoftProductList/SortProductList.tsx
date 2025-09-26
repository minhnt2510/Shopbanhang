import classNames from "classnames";
import { useNavigate } from "react-router-dom";
import { createSearchParams } from "react-router-dom";
import { sortBy, order as orderConstant } from "../../../constants/product";
import type { ProductListConfig } from "../../../Types/product.type";
import omit from "lodash/omit";
import type { QueryConfig } from "../../../hooks/useQueryConfig";

interface Props {
  pageSize: number;
  queryConfig: QueryConfig;
}

const SortProductList = ({ queryConfig }: Props) => {
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
  <div className="bg-gray-100 py-4 px-3">
    <div className="flex flex-wrap items-center justify-between gap-2">
      <div className="flex flex-wrap items-center gap-2">
        <div className="font-medium text-gray-800">Sắp xếp theo</div>

        <button
          className={classNames(
            "h-8 px-4 text-center text-sm capitalize rounded-md transition",
            {
              "bg-black text-white hover:bg-gray-700": isActiveSortBy(
                sortBy.view
              ),
              "bg-white text-gray-800 border border-gray-300 hover:bg-gray-200":
                !isActiveSortBy(sortBy.view),
            }
          )}
          onClick={() => handleSort(sortBy.view)}
        >
          Phổ biến
        </button>

        <button
          className={classNames(
            "h-8 px-4 text-center text-sm capitalize rounded-md transition",
            {
              "bg-black text-white hover:bg-gray-700": isActiveSortBy(
                sortBy.createdAt
              ),
              "bg-white text-gray-800 border border-gray-300 hover:bg-gray-200":
                !isActiveSortBy(sortBy.createdAt),
            }
          )}
          onClick={() => handleSort(sortBy.createdAt)}
        >
          Mới nhất
        </button>

        <button
          className={classNames(
            "h-8 px-4 text-center text-sm capitalize rounded-md transition",
            {
              "bg-black text-white hover:bg-gray-700": isActiveSortBy(
                sortBy.sold
              ),
              "bg-white text-gray-800 border border-gray-300 hover:bg-gray-200":
                !isActiveSortBy(sortBy.sold),
            }
          )}
          onClick={() => handleSort(sortBy.sold)}
        >
          Bán chạy
        </button>

        <select
          className={classNames(
            "h-8 px-4 text-sm capitalize rounded-md transition outline-none",
            {
              "bg-black text-white hover:bg-gray-700": isActiveSortBy(
                sortBy.price
              ),
              "bg-white text-gray-800 border border-gray-300 hover:bg-gray-200":
                !isActiveSortBy(sortBy.price),
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
          <option value="" disabled className="bg-white text-gray-800">
            Giá
          </option>
          <option value={orderConstant.asc} className="bg-white text-gray-800">
            Giá: Thấp đến cao
          </option>
          <option value={orderConstant.desc} className="bg-white text-gray-800">
            Giá: Cao đến thấp
          </option>
        </select>
      </div>
    </div>
  </div>
);

};

export default SortProductList;
