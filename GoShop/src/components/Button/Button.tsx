export default function Button({
  children,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded font-medium hover:opacity-90 ${
        className || ""
      }`}
    >
      {children}
    </button>
  );
}
