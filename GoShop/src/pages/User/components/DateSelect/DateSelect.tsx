import { useEffect, useState } from "react";
import  range  from "lodash/range";
import Button from "../../../../components/Button";

interface Props {
  value?: Date;
  onChange?: (value: Date) => void;
  errorMessage: string | undefined;
}

const DateSelect = ({ value, onChange, errorMessage }: Props) => {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990,
  });

  useEffect(() => {
    if (value) {
      setDate({
        date: value?.getDate(),
        month: value?.getMonth(),
        year: value?.getFullYear(),
      });
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueFromSelect, name } = event.target;
    const newDate = {
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueFromSelect),
    };
    setDate(newDate);
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date));
  };

  return (
    <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
      <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
        Ngày sinh
      </div>
      <div className="sm:w-[80%] sm:pl-5">
        <div className="flex justify-between">
          <select
            onChange={handleChange}
            name="date"
            value={value?.getDate() || date.date}
            className="h-10 w-[32%] rounded-sm border border-black/10 px-3 cursor-pointer hover:border-orange-500"
          >
            <option disabled>Ngày</option>
            {range(1, 32).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            name="month"
            value={value?.getMonth() || date.month}
            className="h-10 w-[32%] rounded-sm border border-black/10 px-3 cursor-pointer hover:border-orange-500"
          >
            <option disabled>Tháng</option>
            {range(0, 12).map((item) => (
              <option key={item} value={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            name="year"
            value={value?.getFullYear() || date.year}
            className="h-10 w-[32%] rounded-sm border border-black/10 px-3 cursor-pointer hover:border-orange-500"
          >
            <option disabled>Năm</option>
            {range(1990, 2030).map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-1 text-red-600 min-h-[1.5rem] text-sm">
          {errorMessage}
        </div>
        <Button
          className="flex items-center text-center bg-orange-500 mt-3 text-white px-4 font-normal cursor-pointer"
          type="submit"
        >
          Lưu
        </Button>
      </div>
    </div>
  );
};

export default DateSelect;
