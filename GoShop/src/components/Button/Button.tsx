export default function Button({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`px-4 sm:px-6 py-2 text-sm sm:text-base
      font-medium text-white bg-black hover:bg-gray-800
      inline-flex items-center justify-center 
      whitespace-nowrap text-center leading-none
      rounded-full transition-colors duration-200
      ${className || ""}`}
    >
      {children}
    </button>
  );
}
