import { Link, createSearchParams, useNavigate } from "react-router-dom";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import type { QueryConfig } from "../ProductList";
import type { Category } from "../../../Types/category.type";

interface Props {
  queryConfig: QueryConfig;
  categories: Category[];
}

const AsideFilter = ({ categories, queryConfig }: Props) => {
  const { category } = queryConfig;
  const navigate = useNavigate();

  const handleRemoveAll = () => {
    navigate({
      pathname: "/",
      search: createSearchParams({}).toString(),
    });
  };

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
        <form className="mt-2">
          <div className="flex flex-col sm:flex-row gap-2">
            <Input
              placeholder="TỪ"
              className="w-full sm:flex-1 rounded-xl border border-gray-500"
            />
            <Input
              placeholder="ĐẾN"
              className="w-full sm:flex-1 rounded-xl border border-gray-500"
            />
          </div>
          <Button className="bg-orange-500 mt-3 w-full h-10 rounded-2xl text-white uppercase">
            áp dụng
          </Button>
        </form>
      </div>

      <div className="bg-gray-300 h-[1px] my-4" />

      {/* Đánh giá */}
      <div className="text-sm">Đánh giá</div>
      <ul className="my-3">
        {[5, 4, 3, 2, 1].map((star) => (
          <li className="flex py-1 pl-2 gap-1" key={star}>
            <Link to="/" className="flex items-center text-sm">
              {Array(star)
                .fill(0)
                .map((_, index) => {
                  const gradientId = `ratingStarGradient-${star}-${index}`;
                  const polygonId = `ratingStar-${star}-${index}`;
                  return (
                    <svg viewBox="0 0 19 8" key={index} className="w-4 h-4">
                      <defs>
                        <linearGradient
                          id={gradientId}
                          x1="50%"
                          x2="50%"
                          y1="0%"
                          y2="100%"
                        >
                          <stop offset={0} stopColor="#ffca11" />
                          <stop offset={1} stopColor="#ffad27" />
                        </linearGradient>
                        <polygon
                          id={polygonId}
                          points="14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 
                          10.8823529 2.92651626 13.6656353 2.52208166 
                          14.910357 0 16.1550787 2.52208166 
                          18.9383611 2.92651626 16.924359 4.88968305 
                          17.3998004 7.66171903"
                        />
                      </defs>
                      <g fill={`url(#${gradientId})`}>
                        <use
                          stroke="#ffa727"
                          strokeWidth=".5"
                          xlinkHref={`#${polygonId}`}
                        />
                      </g>
                    </svg>
                  );
                })}
            </Link>
            <span>Trở lên</span>
          </li>
        ))}
      </ul>

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
