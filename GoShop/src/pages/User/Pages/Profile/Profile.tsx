import { useMutation, useQuery } from "@tanstack/react-query";
import Input from "../../../../components/Input";
import userApi, { type BodyUpdateProfile } from "../../../../api/user.api";
import { userSchema, type UserSchema } from "../../../../utils/rules";
import { Controller, useForm, type Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import InputNumber from "../../../../components/InputNumber";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import DateSelect from "../../components/DateSelect";
import { AppContext } from "../../../../Context/app.context";
import { setProfileToLS } from "../../../../utils/auth";
import InputFile from "../../../../components/InputFile";
type FormData = Pick<
  UserSchema,
  "name" | "address" | "phone" | "date_of_birth" | "avatar"
>;
const profileSchema = userSchema.pick([
  "name",
  "address",
  "phone",
  "date_of_birth",
  "avatar",
]);

const Profile = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { setProfile } = useContext(AppContext);
  const {
    register,
    control,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
    setError,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      phone: "",
      address: "",
      avatar: "",
      date_of_birth: new Date(1990, 0, 1),
    },
    resolver: yupResolver(profileSchema) as Resolver<FormData>,
  });

  const { data: profileData, refetch } = useQuery({
    queryKey: ["profile"],
    queryFn: userApi.getProfile,
  });
  const profile = profileData?.data.data;

  const updateProfileMutation = useMutation({
    mutationFn: (body: BodyUpdateProfile) => userApi.updateProfile(body),
  });
  const uploadAvatarMutation = useMutation({
    mutationFn: (body: globalThis.FormData) => userApi.uploadAvatar(body),
  });

  const [file, setFile] = useState<File>();
  const previewImage = useMemo(() => {
    return file ? URL.createObjectURL(file) : "";
  }, [file]);

  useEffect(() => {
    if (profile) {
      setValue("name", profile.name);
      setValue("address", profile.address);
      setValue("phone", profile.phone);
      setValue("avatar", profile.avatar);
      setValue(
        "date_of_birth",
        profile.date_of_birth ? new Date(profile.date_of_birth) : new Date()
      );
    }
  }, [profile, setValue]);

  const avatar = watch("avatar");

  const onSubmit = handleSubmit(async (data) => {
    try {
      let avatarName = avatar;
      if (file) {
        const form = new FormData();
        form.append("image", file);
        const uploadRes = await uploadAvatarMutation.mutateAsync(form);
        avatarName = uploadRes.data.data;
        setValue("avatar", avatarName);
      }
      const res = await updateProfileMutation.mutateAsync({
        ...data,
        date_of_birth: data.date_of_birth?.toISOString(),
        avatar: avatarName,
      } as BodyUpdateProfile);
      setProfile(res.data.data ?? null);
      if (res.data.data) {
        setProfileToLS(res.data.data);
      }
      refetch();
    } catch (error) {
      console.log(error);
    }
  });

  const handleChangeFile = (file?: File) => {
    setFile(file);
  };
  return (
    <div className="rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20">
      <div className="border-b border-b-gray-200 py-6">
        <h1 className="text-lg font-medium capitalize text-gray-900">
          Hồ Sơ Của Tôi
        </h1>
        <div className="mt-1 text-sm text-gray-700">
          Quản lý thông tin hồ sơ để bảo mật tài khoản
        </div>
      </div>
      <form
        className="mt-8 flex flex-col-reverse md:flex-row md:items-start"
        onSubmit={onSubmit}
      >
        <div className="mt-6 flex-grow md:mt-0 md:pr-12">
          <div className="flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
              Email
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <div className="pt-3 text-gray-700">{profile?.email}</div>
            </div>
          </div>
          <div className="mt-6 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
              Tên
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <Input
                className="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                {...register("name")}
                name="name"
                placeholder="Tên"
              />
              <div className="mt-1 text-red-600 min-h-[1.5rem] text-sm">
                {errors.name?.message}
              </div>
            </div>
          </div>
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
              Số điện thoại
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <Controller
                control={control}
                name="phone"
                render={({ field }) => (
                  <InputNumber
                    className="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                    placeholder="Số điện thoại"
                    type="number"
                    {...field}
                    onChange={field.onChange}
                  />
                )}
              />
              <div className="mt-1 text-red-600 min-h-[1.5rem] text-sm">
                {errors.phone?.message}
              </div>
            </div>
          </div>
          <div className="mt-2 flex flex-col flex-wrap sm:flex-row">
            <div className="truncate pt-3 capitalize sm:w-[20%] sm:text-right">
              Địa chỉ
            </div>
            <div className="sm:w-[80%] sm:pl-5">
              <Input
                className="w-full rounded-sm border border-gray-300 px-3 py-2 outline-none focus:border-gray-500 focus:shadow-sm"
                {...register("address")}
                name="address"
                placeholder="Địa chỉ"
              />
              <div className="mt-1 text-red-600 min-h-[1.5rem] text-sm">
                {errors.address?.message}
              </div>
            </div>
          </div>
          <Controller
            control={control}
            name="date_of_birth"
            render={({ field }) => (
              <DateSelect
                errorMessage={errors.date_of_birth?.message}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>
        <div className="flex justify-center md:w-72 md:border-l md:border-l-gray-200">
          <div className="flex flex-col items-center">
            <div className="my-5 h-24 w-24">
              <img
                src={previewImage || avatar}
                alt=""
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <InputFile onChange={handleChangeFile} />
            <div className="mt-3 text-gray-400">
              <div>Dụng lượng file tối đa 1 MB</div>
              <div>Định dạng:.JPEG, .PNG</div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Profile;
