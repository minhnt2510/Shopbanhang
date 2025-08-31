import InputNumber, { type InputNumberProps } from "../InputNumber";

interface Props extends InputNumberProps {
  max?: number;
  onIncrease?: (value: number) => void;
  onDecrease?: (value: number) => void;
  onType?: (value: number) => void;
  onFocusOut?: (value: number) => void;
  classNameWrapper?: string;
}

const QuantityController = ({
  max,
  onIncrease,
  onDecrease,
  onFocusOut,
  classNameWrapper = "ml-10",
  onType,
  value = 1,
  ...rest
}: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (/^\d*$/.test(value)) {
      let _value = Number(value);
      if (value === "") {
        _value = 1;
      } else {
        if (max !== undefined && _value > max) {
          _value = max;
        } else if (_value < 1) {
          _value = 1;
        }
      }
      onType && onType(_value);
    }
  };

  const increase = () => {
    let _value = Number(value) + 1;
    if (max !== undefined && _value > max) {
      _value = max;
    }
    onIncrease && onIncrease(_value);
  };

  const decrease = () => {
    let _value = Number(value) - 1;
    if (_value < 1) {
      _value = 1;
    }
    onDecrease && onDecrease(_value);
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    onFocusOut && onFocusOut(Number(event.target.value));
  };

  return (
    <div>
      <div className={"flex items-center " + classNameWrapper}>
        <button
          className="flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600 cursor-pointer"
          onClick={decrease}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
          </svg>
        </button>

        <InputNumber
          className="h-8 w-14 items-center justify-center border rounded-none border-gray-300 text-gray-600"
          onChange={handleChange}
          onBlur={handleBlur}
          value={value}
          {...rest}
        />

        <button
          className="flex h-8 w-8 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600 cursor-pointer"
          onClick={increase}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
export default QuantityController;
