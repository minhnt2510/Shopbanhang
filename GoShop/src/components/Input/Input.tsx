import React from "react";

export default React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input(props, ref) {
  return (
    <input
      ref={ref}
      {...props}
      className={`px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black ${props.className}`}
    />
  );
});
