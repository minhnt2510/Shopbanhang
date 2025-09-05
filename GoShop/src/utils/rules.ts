import * as yup from "yup";

function testPriceMinMax(this: yup.TestContext) {
  const { price_max, price_min } = this.parent as {
    price_min: string;
    price_max: string;
  };
  if (price_min !== "" && price_max !== "") {
    return Number(price_max) >= Number(price_min);
  }
  return price_min !== "" || price_max !== "";
}

export const schema = yup.object({
  email: yup
    .string()
    .required("Email là bắt buộc")
    .email("Email không đúng định dạng")
    .min(5, "Email phải có ít nhất 5 ký tự")
    .max(160, "Email không được vượt quá 160 ký tự"),

  password: yup
    .string()
    .required("Password là bắt buộc")
    .min(6, "Password phải có ít nhất 6 ký tự")
    .max(160, "Password không được vượt quá 160 ký tự"),

  confirmPassword: yup
    .string()
    .required("Nhập lại password là bắt buộc")
    .oneOf([yup.ref("password")], "Mật khẩu không khớp"),

  price_min: yup.string().test({
    name: "price-not-allowed",
    message: "Giá không phù hợp",
    test: testPriceMinMax,
  }),

  price_max: yup.string().test({
    name: "price-not-allowed",
    message: "Giá không phù hợp",
    test: testPriceMinMax,
  }),
  name: yup.string().trim().required("Tên sản phẩm là bắt buộc"),
});
export const userSchema = yup.object({
  name: yup.string().max(160, "Độ dài tối đa là 160 ký tự"),
  phone: yup.string().max(20, "Độ dài tối đa là 20 ký tự"),
  address: yup.string().max(160, "Độ dài tối đa là 160 ký tự"),
  avatar: yup.string().max(1000, "Độ dài tối đa là 1000 ký tự"),
  date_of_birth: yup.date().max(new Date(), "Hãy chọn một ngày trong quá khứ"),
  password: schema.fields["password"],
  new_password: schema.fields["password"],
  confirmPassword: schema.fields["confirmPassword"],
});

export type UserSchema = yup.InferType<typeof userSchema>;

export type Schema = yup.InferType<typeof schema>;
