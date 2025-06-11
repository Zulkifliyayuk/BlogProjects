import React, { useState } from 'react';
import { InputGroup } from '../InputGroup/InputGroup';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useController, useForm } from 'react-hook-form';
import type { BodyFormEditPassword } from '@/services/editPassword/editPassword';
import { useEditPassword } from '@/services/hooks/useEditPassword';
import { useLogIn } from '@/services/hooks/useLogIn';
import { useAppSelector } from '@/redux/hooks/hooks';
import { Button } from '../Button/Button';
import { adjustClamp } from '@/layout/function/function';
import { cn } from '@/lib/utils';

const schema = z.object({
  currentPassword: z
    .string()
    .min(5, 'Password required min. 5 characters')
    .refine((val) => val !== '', {
      message: 'Current Password cannot be empty',
    }),
  newPassword: z
    .string()
    .min(5, 'Password required min. 5 characters')
    .refine((val) => val !== '', {
      message: 'Current Password cannot be empty',
    }),
  confirmPassword: z
    .string()
    .min(5, 'Password required min. 5 characters')
    .refine((val) => val !== '', {
      message: 'Current Password cannot be empty',
    }),
});

type FormData = z.infer<typeof schema>;

const defaultValues: FormData = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

export const ContentMyPassword: React.FC<React.ComponentProps<'div'>> = ({
  className,
  ...props
}) => {
  const { mutate: mutateLogIn } = useLogIn();
  const { mutate: mutateEditPassword, isPending, isError } = useEditPassword();
  const emailUser = useAppSelector((state) => state.auth.email);
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = ({
    currentPassword,
    newPassword,
    confirmPassword,
  }: FormData) => {
    const postData: BodyFormEditPassword = {
      currentPassword,
      newPassword,
      confirmPassword,
    };
    mutateEditPassword(postData);
    mutateLogIn({
      email: emailUser,
      password: postData.newPassword,
    });
    reset(defaultValues);
  };

  const { field: currentPasswordField } = useController({
    name: 'currentPassword',
    control,
  });

  const { field: newPasswordField } = useController({
    name: 'newPassword',
    control,
  });

  const { field: confirmPasswordField } = useController({
    name: 'confirmPassword',
    control,
  });

  return (
    <div
      className={cn('mt-[20px]', className)}
      style={{ width: adjustClamp(361, 538, 1440) }}
      {...props}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-center justify-center gap-[20px]'
      >
        <InputGroup errorMessage={errors.currentPassword?.message}>
          <label
            htmlFor='currentPassword'
            className='text-sm leading-7 font-semibold text-neutral-950'
          >
            Current Password
          </label>
          <div className='mt-1 flex w-full items-center rounded-xl border border-neutral-300 px-4 py-2.5'>
            <input
              type={showPassword ? 'text' : 'password'}
              id='currentPassword'
              placeholder='Enter current password'
              {...currentPasswordField}
              className='font-regular w-full border-none text-sm leading-6 text-neutral-500 outline-none'
            />
            {showPassword ? (
              <img
                src='./src/assets/eye.png'
                alt='show password icon'
                className='h-5 w-5 cursor-pointer'
                onClick={handleTogglePassword}
              />
            ) : (
              <img
                src='./src/assets/eye-close.png'
                alt='show password icon'
                className='h-5 w-5 cursor-pointer'
                onClick={handleTogglePassword}
              />
            )}
          </div>
        </InputGroup>

        <InputGroup errorMessage={errors.newPassword?.message}>
          <label
            htmlFor='newPassword'
            className='text-sm leading-7 font-semibold text-neutral-950'
          >
            New Password
          </label>
          <div className='mt-1 flex w-full items-center rounded-xl border border-neutral-300 px-4 py-2.5'>
            <input
              type={showPassword ? 'text' : 'password'}
              id='newPassword'
              placeholder='Enter new password'
              {...newPasswordField}
              className='font-regular w-full border-none text-sm leading-6 text-neutral-500 outline-none'
            />
            {showPassword ? (
              <img
                src='./src/assets/eye.png'
                alt='show password icon'
                className='h-5 w-5 cursor-pointer'
                onClick={handleTogglePassword}
              />
            ) : (
              <img
                src='./src/assets/eye-close.png'
                alt='show password icon'
                className='h-5 w-5 cursor-pointer'
                onClick={handleTogglePassword}
              />
            )}
          </div>
        </InputGroup>

        <InputGroup errorMessage={errors.confirmPassword?.message}>
          <label
            htmlFor='confirmPassword'
            className='text-sm leading-7 font-semibold text-neutral-950'
          >
            Confirm New Password
          </label>
          <div className='mt-1 flex w-full items-center rounded-xl border border-neutral-300 px-4 py-2.5'>
            <input
              type={showPassword ? 'text' : 'password'}
              id='confirmPassword'
              placeholder='Enter confirm new password'
              {...confirmPasswordField}
              className='font-regular w-full border-none text-sm leading-6 text-neutral-500 outline-none'
            />
            {showPassword ? (
              <img
                src='./src/assets/eye.png'
                alt='show password icon'
                className='h-5 w-5 cursor-pointer'
                onClick={handleTogglePassword}
              />
            ) : (
              <img
                src='./src/assets/eye-close.png'
                alt='show password icon'
                className='h-5 w-5 cursor-pointer'
                onClick={handleTogglePassword}
              />
            )}
          </div>
        </InputGroup>

        <Button
          variant='primary'
          type='submit'
          className='w-full'
          disabled={isPending}
        >
          {isPending ? 'Updating...' : 'Update Password'}
        </Button>

        {isError && (
          <p className='text-sm text-red-600'>Something went wrong.</p>
        )}
      </form>
    </div>
  );
};
