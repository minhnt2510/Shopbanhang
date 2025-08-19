import classNames from "classnames";

interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageSize: number;
}
const RANGE = 2;

const Paginate = ({ page, setPage, pageSize }: Props) => {
  const renderPagination = () => {
    let dotAfter = false;
    let dotBefore = false;

    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true;
        return (
          <button
            key={`dot-before-${index}`}
            className="bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer"
          >
            ...
          </button>
        );
      }
      return null;
    };

    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true;
        return (
          <button
            key={`dot-after-${index}`}
            className="bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer"
          >
            ...
          </button>
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
          page <= RANGE * 2 + 1 &&
          pageNumber > page + RANGE &&
          pageNumber < pageSize - RANGE + 1
        ) {
          return renderDotAfter(index);
        } else if (
          page > RANGE * 2 + 1 &&
          page < pageSize - RANGE * 2 &&
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
          page >= pageSize - RANGE * 2 &&
          pageNumber > RANGE &&
          pageNumber < page - RANGE
        ) {
          return renderDotBefore(index);
        }

        // Render normal page button
        return (
          <button
            key={pageNumber}
            className={classNames(
              "bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border",
              {
                "border-cyan-500": pageNumber === page,
                "border-transparent": pageNumber !== page,
              }
            )}
            onClick={() => setPage(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      });
  };

  return (
    <div className="flex flex-wrap my-6 justify-center items-center">
      <button
        className="bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer"
        onClick={() => setPage((prev) => Math.max(1, prev - 1))}
      >
        prev
      </button>
      {renderPagination()}
      <button
        className="bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer"
        onClick={() => setPage((prev) => Math.min(pageSize, prev + 1))}
      >
        next
      </button>
    </div>
  );
};

export default Paginate;
