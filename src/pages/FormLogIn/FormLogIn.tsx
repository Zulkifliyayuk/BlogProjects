import { useController, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { InputGroup } from '@/components/InputGroup/InputGroup';
import { Button } from '@/components/Button/Button';
import { useEffect, useState } from 'react';
import { useLogIn } from '@/services/hooks/useLogIn';
import type { PostSignIn } from '@/services/Login/login';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/redux/hooks/hooks';

const schema = z.object({
  email: z
    .string()
    .email('Invalid Email Format')
    .refine((val) => val !== '', { message: 'Email cannot be empty' }),
  password: z
    .string()
    .min(5, 'Password required min. 5 characters')
    .refine((val) => val !== '', { message: 'Password cannot be empty' }),
});

type FormData = z.infer<typeof schema>;

const defaultValues: FormData = {
  email: '',
  password: '',
};

export const FormLogin = () => {
  const { mutate } = useLogIn();
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const token = useAppSelector((state) => state.auth.token);

  // const token = useSelector(selectorTokenSignUp);

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

  const onSubmit = ({ email, password }: FormData) => {
    const postData: PostSignIn = {
      email,
      password,
    };
    mutate(postData);
  };

  useEffect(() => {
    if (token) {
      reset(defaultValues);
      navigate('/');
    }
  }, [token, navigate, reset]);

  const { field: emailField } = useController({
    name: 'email',
    control,
  });
  const { field: passwordField } = useController({
    name: 'password',
    control,
  });

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div
        className='flex min-w-86.25 flex-col gap-5 rounded-[12px] border border-neutral-200 p-6 md:w-100'
        style={{ boxShadow: '0px 0px 24px 0px #CDCCCC29' }}
      >
        <h1 className='text-xl leading-[1.75rem] font-bold text-neutral-900'>
          Sign In
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='flex flex-col items-center justify-center gap-5'
        >
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

          <Button type='submit' className='w-full' variant='primary'>
            Login
          </Button>
          <h3 className='font-regular text-sm leading-7'>
            Don`t have an account?{' '}
            <a
              href='/SignUp'
              className='text-primary-300 hover:text-primary-300/75 text-sm font-bold no-underline'
            >
              Register
            </a>
          </h3>
        </form>
      </div>
    </div>
  );
};
