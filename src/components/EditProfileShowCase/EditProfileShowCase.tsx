import { cn } from '@/lib/utils';
import { useAppSelector } from '@/redux/hooks/hooks';
import { useUserByEmail } from '@/services/hooks/useGetUser';
import React, { useEffect, useRef, useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEditProfile } from '@/services/hooks/useEditProfile';
import { InputGroup } from '../InputGroup/InputGroup';
import { Button } from '../Button/Button';
import { adjustClamp } from '@/layout/function/function';

const schema = z.object({
  name: z.string().trim().min(1, 'Name is required'),
  headline: z.string().trim().min(1, 'Headline Profile is required'),
});

type FormData = z.infer<typeof schema>;

type EditProfileShowCaseProps = {
  handleEditProfile: () => void;
} & React.ComponentProps<'div'>;

export const EditProfileShowCase: React.FC<EditProfileShowCaseProps> = ({
  handleEditProfile,
  className,
  ...props
}) => {
  const emailUser = useAppSelector((state) => state.auth.email);
  const { data, isLoading } = useUserByEmail(emailUser);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      headline: '',
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        headline: data.headline || 'FrontEnd Developer',
      });
    }
  }, [data, reset]);

  const { mutate: updateProfile, isPending, isError } = useEditProfile();

  const onSubmit = (formData: FormData) => {
    const postData = new FormData();
    postData.append('name', formData.name);
    postData.append('headline', formData.headline);
    if (selectedImage) {
      postData.append('avatar', selectedImage);
    }
    updateProfile(postData);
    handleEditProfile();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const { field: nameField } = useController({
    name: 'name',
    control,
  });
  const { field: headlineField } = useController({
    name: 'headline',
    control,
  });

  if (isLoading) return <p>Loading Data User...</p>;
  if (!data) return <p>No data user</p>;

  return (
    <div
      className={cn(
        'fixed top-0 left-0 flex h-[100vh] w-[100vw] items-center justify-center bg-[#0A0D12]/60',
        className
      )}
      {...props}
    >
      <div
        className='rounded-2xl bg-[#FFFFFF] p-[24px]'
        style={{ width: adjustClamp(345, 451, 1440) }}
      >
        <div className='flex-between'>
          <span className='text-md leading-7.5 font-bold text-neutral-950 md:text-xl md:leading-8.5'>
            Edit Profile
          </span>
          <img
            src='./src/assets/Xicon.png'
            alt='Xicon'
            className='size-[24px] cursor-pointer'
            onClick={handleEditProfile}
          />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='mt-[20px] flex flex-col items-center justify-center gap-[20px]'
        >
          <div className='relative'>
            <img
              src={
                selectedImage
                  ? URL.createObjectURL(selectedImage)
                  : data?.avatarUrl
                    ? `https://truthful-simplicity-production.up.railway.app${data.avatarUrl}`
                    : './src/assets/imageNull.png'
              }
              alt='avatar'
              className='h-[80px] w-[80px] min-w-[80px] rounded-full object-cover'
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = './src/assets/imageNull.png';
              }}
            />
            <div
              className='absolute right-0 bottom-0 -translate-x-[1.5px] translate-y-[5px] cursor-pointer'
              onClick={() => fileInputRef.current?.click()}
            >
              <img
                src='./src/assets/IconCamera.png'
                alt='Upload'
                className='size-[24px]'
              />
            </div>
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleImageChange}
            />
          </div>

          <InputGroup errorMessage={errors.name?.message}>
            <label
              htmlFor='name'
              className='items-center text-sm leading-7 font-semibold text-neutral-950'
            >
              Name
            </label>
            <div className='mt-1 w-full rounded-xl border border-neutral-300 px-4 py-2.5'>
              <input
                type='text'
                id='name'
                placeholder='Enter your name'
                {...nameField}
                className='font-regular w-full border-none text-sm leading-6 text-neutral-500 outline-none'
              />
            </div>
          </InputGroup>

          <InputGroup errorMessage={errors.headline?.message}>
            <label
              htmlFor='headline'
              className='items-center text-sm leading-7 font-semibold text-neutral-950'
            >
              Headline
            </label>
            <div className='mt-1 w-full rounded-xl border border-neutral-300 px-4 py-2.5'>
              <input
                type='text'
                id='headline'
                placeholder='Enter your headline'
                {...headlineField}
                className='font-regular w-full border-none text-sm leading-6 text-neutral-500 outline-none'
              />
            </div>
          </InputGroup>

          <Button
            variant='primary'
            type='submit'
            className='w-full'
            disabled={isPending}
          >
            {isPending ? 'Updating...' : 'Update Profile'}
          </Button>

          {isError && (
            <p className='text-sm text-red-600'>Something went wrong.</p>
          )}
        </form>
      </div>
    </div>
  );
};
