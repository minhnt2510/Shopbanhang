import { createSearchParams, useNavigate } from "react-router-dom";
import { QueryConfig } from "../../../../hooks/useQueryConfig";

interface Props {
  queryConfig: QueryConfig;
}

const RatingStars = ({ queryConfig }: Props) => {
  const navigate = useNavigate();

  const handleFilterStar = (rating: number) => {
    navigate({
      pathname: "/",
      search: createSearchParams({
        ...queryConfig,
        rating_filter: String(rating),
      }).toString(),
    });
  };

  return (
    <div>
      <ul className="my-3">
        {[5, 4, 3, 2, 1].map((star) => (
          <li className="flex py-1 pl-2 gap-1 pt-3" key={star}>
            <div
              className="flex items-center text-sm cursor-pointer"
              onClick={() => handleFilterStar(star)}
              role="button"
              tabIndex={0}
            >
              {Array(star)
                .fill(0)
                .map((_, index) => {
                  const gradientId = `ratingStarGradient-${star}-${index}`;
                  const polygonId = `ratingStar-${star}-${index}`;
                  return (
                    <svg
                      viewBox="0 0 20 10"
                      key={index}
                      className="w-8 h-8 mr-1"
                    >
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
              {star !== 5 && <span>Trở lên</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RatingStars;
