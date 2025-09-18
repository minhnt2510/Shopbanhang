export default function Button({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`px-3 sm:px-4 py-2 text-sm sm:text-base 
    cursor-pointer font-medium hover:opacity-90 
    flex items-center justify-center whitespace-nowrap leading-none
    rounded-full
    ${className || ""}`}
    >
      {children}
    </button>
  );
}
