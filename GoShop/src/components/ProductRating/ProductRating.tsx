const ProductRating = ({
  rating,
  activeClassname = "w-4 h-4 text-yellow-400",
  nonActiveClassname = "w-4 h-4 text-gray-300",
}: {
  rating: number;
  activeClassname?: string;
  nonActiveClassname?: string;
}) => {
  const handleRating = (order: number) => {
    if (order <= rating) {
      return "100%";
    }
    if (order > rating && order - rating < 1) {
      return (rating = Math.floor(rating)) * 100 + "%";
    }
    return "0%";
  };
  return (
    <div className="flex gap-1">
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div key={index} className="relative w-4 h-4">
            {/* star filled 50% */}
            <div
              className="absolute top-0 left-0 h-full overflow-hidden"
              style={{ width: handleRating(index + 1) }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className={activeClassname}
              >
                <path d="M12 .587l3.668 7.431L24 9.753l-6 5.847 1.416 8.268L12 19.771l-7.416 4.097L6 15.6 0 9.753l8.332-1.735z" />
              </svg>
            </div>

            {/* star outline */}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className={nonActiveClassname}
            >
              <path d="M12 .587l3.668 7.431L24 9.753l-6 5.847 1.416 8.268L12 19.771l-7.416 4.097L6 15.6 0 9.753l8.332-1.735z" />
            </svg>
          </div>
        ))}
    </div>
  );
};

export default ProductRating;
