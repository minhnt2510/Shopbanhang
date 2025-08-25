import { omitBy, isUndefined } from "lodash";
import useQueryParam from "./useQueryParam";
import type { ProductListConfig } from "../Types/product.type";

export type QueryConfig = {
  [key in keyof ProductListConfig]?: string;
};

const useQueryConfig = () => {
  const queryParams: QueryConfig = useQueryParam();
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || "1",
      limit: queryParams.limit || "10",
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      category: queryParams.category,
    },
    isUndefined
  );
  return queryConfig;
};

export default useQueryConfig;
