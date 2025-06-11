import { useUserByEmail } from '@/services/hooks/useGetUser';
import React from 'react';

import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { setEmailUser } from '@/redux/slice/userSlice';

type UsersProps = {
  emailUser: string;
} & React.ComponentProps<'div'>;

export const Users: React.FC<UsersProps> = ({
  emailUser,
  className,
  ...props
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data, isLoading } = useUserByEmail(emailUser);

  const emailAuth = useAppSelector((state) => state.auth.email);

  if (isLoading) {
    return <p>Loading Data User...</p>;
  }

  if (!data) {
    return <p>No data user</p>;
  }

  const handleClickUsers = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (emailAuth === emailUser) {
      navigate('/MyProfile');
    } else {
      dispatch(setEmailUser(emailUser));
      navigate('/UsersProfile');
    }
  };

  return (
    <div
      className={cn(
        'relative flex cursor-pointer flex-row items-center gap-3',
        className
      )}
      {...props}
      onClick={handleClickUsers}
    >
      <div className='font-regular text-xs leading-6 text-neutral-900 md:text-sm md:leading-7'>
        <img
          src={
            data?.avatarUrl
              ? `https://truthful-simplicity-production.up.railway.app${data.avatarUrl}`
              : './src/assets/imageNull.png'
          }
          alt='avatar'
          className='h-[40px] w-[40px] min-w-[40px] rounded-full object-cover'
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = './src/assets/imageNull.png';
          }}
        />
      </div>
      {data.name}
    </div>
  );
};
