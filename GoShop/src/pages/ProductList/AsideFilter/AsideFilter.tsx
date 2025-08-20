import { Link } from "react-router-dom";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import type { QueryConfig } from "../ProductList";
interface AsideFilterProps {
  queryConfig: QueryConfig;
  pageSize: number;
}
const AsideFilter = ({}: AsideFilterProps) => {
  return (
    <>
      <div className="py-4 px-3">
        <Link to="/" className="flex items-center font-bold gap-2">
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
              d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
            />
          </svg>
          Tất cả danh mục
        </Link>
        <div className="bg-gray-300 h-[1px] my-4" />
        <ul>
          <li className="py-2 pl-4 relative ">
            <Link to="/" className="">
              Danh mục 1
            </Link>
          </li>
          <li className="py-2 pl-4 relative">
            <Link to="/" className="">
              Danh mục 2
            </Link>
          </li>
        </ul>
        <Link
          to="/"
          className="flex items-center font-bold  mt-4 uppercase gap-2"
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
              d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
            />
          </svg>
          Bộ lọc tìm kiếm
        </Link>
        <div className="bg-gray-300 h-[1px] my-4" />

        <div className="">
          <div className="my-5">
            <div>Khoản giá</div>
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

              <Button className="bg-orange-500 mt-3 w-full h-10 rounded-2xl text-white cursor-pointer uppercase">
                áp dụng
              </Button>
            </form>
          </div>
        </div>
        <div className="bg-gray-300 h-[1px] my-4" />
        <div className="text-sm">Đánh giá</div>
        <ul className="my-3">
          <li className="flex py-1 pl-2 gap-1">
            <Link to="" className="flex items-center text-sm w-25">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <svg viewBox="0 0 9.5 8" key={index}>
                    <defs>
                      <linearGradient
                        id="ratingStarGradient"
                        x1="50%"
                        x2="50%"
                        y1="0%"
                        y2="100%"
                      >
                        <stop offset={0} stopColor="#ffca11" />
                        <stop offset={1} stopColor="#ffad27" />
                      </linearGradient>
                      <polygon
                        id="ratingStar"
                        points="14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903"
                      />
                    </defs>
                    <g
                      fill="url(#ratingStarGradient)"
                      fillRule="evenodd"
                      stroke="none"
                      strokeWidth={1}
                    >
                      <g transform="translate(-876 -1270)">
                        <g transform="translate(155 992)">
                          <g transform="translate(600 29)">
                            <g transform="translate(10 239)">
                              <g transform="translate(101 10)">
                                <use
                                  stroke="#ffa727"
                                  strokeWidth=".5"
                                  xlinkHref="#ratingStar"
                                />
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                ))}
            </Link>
            <span>Trở lên</span>
          </li>
          <li className=" flex py-1 pl-2 gap-1">
            <Link to="" className="flex items-center text-sm w-25">
              {Array(5)
                .fill(0)
                .map((_, index) => (
                  <svg viewBox="0 0 9.5 8" key={index}>
                    <defs>
                      <linearGradient
                        id="ratingStarGradient"
                        x1="50%"
                        x2="50%"
                        y1="0%"
                        y2="100%"
                      >
                        <stop offset={0} stopColor="#ffca11" />
                        <stop offset={1} stopColor="#ffad27" />
                      </linearGradient>
                      <polygon
                        id="ratingStar"
                        points="14.910357 6.35294118 12.4209136 7.66171903 12.896355 4.88968305 10.8823529 2.92651626 13.6656353 2.52208166 14.910357 0 16.1550787 2.52208166 18.9383611 2.92651626 16.924359 4.88968305 17.3998004 7.66171903"
                      />
                    </defs>
                    <g
                      fill="url(#ratingStarGradient)"
                      fillRule="evenodd"
                      stroke="none"
                      strokeWidth={1}
                    >
                      <g transform="translate(-876 -1270)">
                        <g transform="translate(155 992)">
                          <g transform="translate(600 29)">
                            <g transform="translate(10 239)">
                              <g transform="translate(101 10)">
                                <use
                                  stroke="#ffa727"
                                  strokeWidth=".5"
                                  xlinkHref="#ratingStar"
                                />
                              </g>
                            </g>
                          </g>
                        </g>
                      </g>
                    </g>
                  </svg>
                ))}
            </Link>
            <span>Trở lên</span>
          </li>
        </ul>
        <div className="bg-gray-300 h-[1px] my-4" />
        <Button className="bg-orange-500 mt-3 w-full h-10 rounded-2xl text-white cursor-pointer uppercase">
          xóa tất cả
        </Button>
      </div>
    </>
  );
};

export default AsideFilter;
