import React, { forwardRef, type InputHTMLAttributes } from "react";

export interface InputNumberProps
  extends InputHTMLAttributes<HTMLInputElement> {}
const InputNumber = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function InputNumberInner(props, ref) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (/^\d*$/.test(value)) {
      props.onChange?.(event);
    }
  };

  return (
    <input
      ref={ref}
      type="text"
      onChange={handleChange}
      {...props}
      className={`border px-3 py-2 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 ${
        props.className || ""
      }`}
    />
  );
});

export default InputNumber;
