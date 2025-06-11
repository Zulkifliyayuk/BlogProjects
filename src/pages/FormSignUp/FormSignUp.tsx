import { useController, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputGroup } from '@/components/InputGroup/InputGroup';
import { Button } from '@/components/Button/Button';
import { useEffect, useState } from 'react';
import { useSignUp } from '@/services/hooks/useSignUp';
import type { PostSignUp } from '@/services/signUp/signUp';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { useNavigate } from 'react-router-dom';
import { setToken } from '@/redux/slice/authSlice';

const schema = z
  .object({
    username: z.string().trim().min(1, 'Username is required'),

    password: z
      .string()
      .min(5, 'Password required min. 5 characters')
      .refine((val) => val !== '', { message: 'Password cannot be empty' }),

    confirmPassword: z
      .string()
      .min(5, 'Password required min. 5 characters')
      .refine((val) => val !== '', { message: 'Password cannot be empty' }),

    email: z
      .string()
      .email('Invalid Email Format')
      .refine((val) => val !== '', { message: 'Email cannot be empty' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });

type FormData = z.infer<typeof schema>;

const defaultValues: FormData = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const FormSignUp = () => {
  const { mutate } = useSignUp();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const token = useAppSelector((state) => state.auth.token);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = ({ username, email, password }: FormData) => {
    const postData: PostSignUp = {
      name: username,
      email,
      password,
    };
    mutate(postData);
  };

  useEffect(() => {
    if (token) {
      reset(defaultValues);
      dispatch(setToken(token));
      navigate('/');
    }
  }, [token, navigate, reset, dispatch]);

  const { field: usernameField } = useController({
    name: 'username',
    control,
  });
  const { field: emailField } = useController({
    name: 'email',
    control,
  });
  const { field: passwordField } = useController({
    name: 'password',
    control,
  });
  const { field: confirmPasswordField } = useController({
    name: 'confirmPassword',
    control,
  });

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div
        className='flex min-w-86.25 flex-col gap-5 rounded-[12px] border border-neutral-200 p-6 md:w-100'
        style={{ boxShadow: '0px 0px 24px 0px #CDCCCC29' }}
      >
        <h1 className='text-xl leading-[1.75rem] font-bold text-neutral-900'>
          Sign Up
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col items-center justify-center gap-5'
        >
          <InputGroup errorMessage={errors.username?.message}>
            <label
              htmlFor='username'
              className='items-center text-sm leading-7 font-semibold text-neutral-950'
            >
              Name
            </label>
            <div className='mt-1 w-full rounded-xl border border-neutral-300 px-4 py-2.5'>
              <input
                type='text'
                id='username'
                placeholder='Enter your name'
                {...usernameField}
                className='font-regular w-full border-none text-sm leading-6 text-neutral-500 outline-none'
              />
            </div>
          </InputGroup>

          <InputGroup errorMessage={errors.email?.message}>
            <label
              htmlFor='email'
              className='text-sm leading-7 font-semibold text-neutral-950'
            >
              Email
            </label>
            <div className='mt-1 w-full rounded-xl border border-neutral-300 px-4 py-2.5'>
              <input
                type='email'
                id='email'
                placeholder='Enter your email'
                {...emailField}
                className='font-regular w-full border-none text-sm leading-6 text-neutral-500 outline-none'
              />
            </div>
          </InputGroup>

          <InputGroup errorMessage={errors.password?.message}>
            <label
              htmlFor='password'
              className='text-sm leading-7 font-semibold text-neutral-950'
            >
              Password
            </label>
            <div className='mt-1 flex w-full items-center rounded-xl border border-neutral-300 px-4 py-2.5'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                placeholder='Enter your password'
                {...passwordField}
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
              Confirm Password
            </label>
            <div className='mt-1 flex w-full items-center rounded-xl border border-neutral-300 px-4 py-2.5'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='confirmPassword'
                placeholder='Enter your confirm password'
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
          <Button type='submit' className='w-full' variant='primary'>
            Register
          </Button>
          <h3 className='font-regular text-sm leading-7'>
            Already have an account?{' '}
            <span>
              <a
                href='/Login'
                className='text-primary-300 hover:text-primary-300/75 text-sm font-bold no-underline'
              >
                Log in
              </a>
            </span>
          </h3>
        </form>
      </div>
    </div>
  );
};
