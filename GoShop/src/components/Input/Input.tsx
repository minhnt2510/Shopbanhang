export default function Input(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      {...props}
      className={`border px-3 py-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500 ${
        props.className || ""
      }`}
    />
  );
}
