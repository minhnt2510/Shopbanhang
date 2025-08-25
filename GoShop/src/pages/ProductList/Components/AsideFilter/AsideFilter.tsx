import { Link, createSearchParams, useNavigate } from "react-router-dom";
import Button from "../../../../components/Button";
import type { Category } from "../../../../Types/category.type";
import InputNumber from "../../../../components/InputNumber";
import { useForm, Controller, type Resolver } from "react-hook-form";
import { schema, type Schema } from "../../../../utils/rules";
import { yupResolver } from "@hookform/resolvers/yup";
import type { NoUndefinedField } from "../../../../Types/util.type";
import RatingStars from "../RatingStars";
import { omit } from "lodash";
import type { QueryConfig } from "../../../../hooks/useQueryConfig";

interface Props {
  queryConfig: QueryConfig;
  categories: Category[];
}

type FormData = NoUndefinedField<Pick<Schema, "price_max" | "price_min">>;

const priceSchema = schema.pick(["price_max", "price_min"]);

const AsideFilter = ({ categories, queryConfig }: Props) => {
  const { category } = queryConfig;

  const {
    control,
    handleSubmit,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      price_min: "",
      price_max: "",
    },
    resolver: yupResolver(priceSchema) as Resolver<FormData>,
  });
  console.log(errors);
  const zx = watch();
  console.log(zx);

  const handleRemoveAll = () => {
    navigate({
      pathname: "/",
      search: createSearchParams(
        omit(queryConfig, [
          "price_max",
          "price_min",
          "rating_filter",
          "category",
        ])
      ).toString(),
    });
  };

  const navigate = useNavigate();
  const onSubmit = handleSubmit((data) => {
    navigate({
      pathname: "/",
      search: createSearchParams({
        ...queryConfig,
        price_max: data.price_max,
        price_min: data.price_min,
      }).toString(),
    });
  });

  return (
    <div className="py-4 px-3">
      {/* Tất cả danh mục */}
      <Link
        to="/"
        className={`flex items-center font-bold gap-2 ${
          !category ? "text-orange-500" : ""
        }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Z"
          />
        </svg>
        Tất cả danh mục
      </Link>

      <div className="bg-gray-300 h-[1px] my-4" />

      {/* Danh sách category */}
      <ul>
        {categories.map((cat) => {
          const isActive = category === cat._id;
          return (
            <li className="py-2 pl-4 relative" key={cat._id}>
              <Link
                to={{
                  pathname: "/",
                  search: createSearchParams({
                    ...queryConfig,
                    category: cat._id,
                  }).toString(),
                }}
                className={`${isActive ? "text-orange-500 font-semibold" : ""}`}
              >
                {isActive && (
                  <span className="absolute left-0 top-1 text-orange-500">
                    ›
                  </span>
                )}
                {cat.name}
              </Link>
            </li>
          );
        })}
      </ul>

      {/* Bộ lọc tìm kiếm */}
      <Link to="/" className="flex items-center font-bold mt-4 uppercase gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
          />
        </svg>
        Bộ lọc tìm kiếm
      </Link>

      <div className="bg-gray-300 h-[1px] my-4" />

      {/* Khoảng giá */}
      <div className="my-5">
        <div>Khoảng giá</div>
        <form className="mt-2" onSubmit={onSubmit}>
          <div className="flex flex-col sm:flex-row gap-2">
            <Controller
              render={({ field }) => {
                return (
                  <InputNumber
                    placeholder="TỪ"
                    className="w-full sm:flex-1 rounded-xl border border-gray-500"
                    onChange={(event) => {
                      field.onChange(event);
                      trigger("price_max");
                    }}
                    value={field.value}
                  />
                );
              }}
              control={control}
              name="price_min"
            />

            <Controller
              render={({ field }) => {
                return (
                  <InputNumber
                    placeholder="Đến"
                    className="w-full sm:flex-1 rounded-xl border border-gray-500"
                    onChange={(event) => {
                      field.onChange(event);
                      trigger("price_min");
                    }}
                    value={field.value}
                    ref={field.ref}
                  />
                );
              }}
              control={control}
              name="price_max"
            />
          </div>
          <div className="mt-1 text-red-600 min-h-[1.5rem] text-sm text-center">
            {errors.price_min?.message}
          </div>
          <Button className="bg-orange-500 mt-3 w-full h-10 rounded-2xl text-white uppercase">
            áp dụng
          </Button>
        </form>
      </div>

      <div className="bg-gray-300 h-[1px] my-4" />

      {/* Đánh giá */}
      <div className="text-sm">Đánh giá</div>
      <RatingStars queryConfig={queryConfig} />

      <div className="bg-gray-300 h-[1px] my-4" />

      {/* Xóa tất cả */}
      <Button
        onClick={handleRemoveAll}
        className="bg-orange-500 mt-3 w-full h-10 rounded-2xl text-white uppercase"
      >
        xóa tất cả
      </Button>
    </div>
  );
};

export default AsideFilter;
