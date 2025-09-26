import classNames from "classnames";
import { Link, createSearchParams } from "react-router-dom";
import { QueryConfig } from "../../hooks/useQueryConfig";

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
  queryConfig: QueryConfig;
}

const RANGE = 2;

const Paginate = ({ page, setPage, pageSize, queryConfig }: Props) => {
  const renderPagination = () => {
    let dotAfter = false;
    let dotBefore = false;

    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true;
        return (
          <span
            key={`dot-before-${index}`}
            className="mx-2 rounded border bg-white px-3 py-2 shadow-sm"
          >
            ...
          </span>
        );
      }
      return null;
    };

    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true;
        return (
          <span
            key={`dot-after-${index}`}
            className="mx-2 rounded bg-white px-3 py-2 shadow-sm"
          >
            ...
          </span>
        );
      }
      return null;
    };

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1;

        // Render dots logic
        if (
          page <= RANGE &&
          pageNumber > page + RANGE &&
          pageNumber < pageSize - RANGE + 1
        ) {
          return renderDotAfter(index);
        } else if (
          page > RANGE &&
          page < pageSize - RANGE &&
          pageNumber < page - RANGE &&
          pageNumber > RANGE
        ) {
          return renderDotBefore(index);
        } else if (
          pageNumber > page + RANGE &&
          pageNumber < pageSize - RANGE + 1
        ) {
          return renderDotAfter(index);
        } else if (
          page >= pageSize - RANGE &&
          pageNumber > RANGE &&
          pageNumber < page - RANGE
        ) {
          return renderDotBefore(index);
        }

        // Render page number
        return (
          <Link
            key={pageNumber}
            to={{
              pathname: "/",
              search: createSearchParams({
                ...queryConfig,
                page: pageNumber.toString(),
              }).toString(),
            }}
            className={classNames(
              "mx-2 rounded border bg-white px-3 py-2 shadow-sm",
              {
                "border-gray-500": pageNumber === page,
                "border-transparent": pageNumber !== page,
              }
            )}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </Link>
        );
      });
  };

  return (
    <div className="flex flex-wrap my-6 justify-center items-center">
      {page === 1 ? (
        <span className="mx-2 cursor-not-allowed rounded  bg-white/60 px-3 py-2 shadow-sm">
          Prev
        </span>
      ) : (
        <Link
          to={{
            pathname: "/",
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString(),
            }).toString(),
          }}
          className="mx-2 cursor-pointer rounded  bg-white px-3 py-2 shadow-sm"
          onClick={() => setPage(page - 1)}
        >
          Prev
        </Link>
      )}

      {renderPagination()}

      {page === pageSize ? (
        <span className="mx-2 cursor-not-allowed rounded  bg-white/60 px-3 py-2 shadow-sm">
          Next
        </span>
      ) : (
        <Link
          to={{
            pathname: "/",
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString(),
            }).toString(),
          }}
          className="mx-2 cursor-pointer rounded  bg-white px-3 py-2 shadow-sm"
          onClick={() => setPage(page + 1)}
        >
          Next
        </Link>
      )}
    </div>
  );
};

export default Paginate;
