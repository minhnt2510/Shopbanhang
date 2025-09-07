import { useRef } from "react";
import { Fragment } from "react/jsx-runtime";

interface Props {
  onChange?: (file?: File) => void;
}

const InputFile = ({ onChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileFromLocal = event.target.files?.[0];
    onChange?.(fileFromLocal);
  };

  const handleUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <Fragment>
      <input
        className="hidden"
        type="file"
        accept=".jpg,.jpeg,.png"
        ref={fileInputRef}
        onChange={onFileChange}
      />
      <button
        className="flex h-10 items-center justify-end rounded-sm border bg-white px-6 text-sm text-gray-600 shadow-sm"
        type="button"
        onClick={handleUpload}
      >
        Chọn ảnh
      </button>
    </Fragment>
  );
};

export default InputFile;
