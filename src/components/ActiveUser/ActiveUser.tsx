import { useAppSelector } from '@/redux/hooks/hooks';
import { useUserByEmail } from '@/services/hooks/useGetUser';
import React from 'react';

import { cn } from '@/lib/utils';

export const ActiveUser: React.FC<React.ComponentProps<'div'>> = ({
  className,
  ...props
}) => {
  const emailUser = useAppSelector((state) => state.auth.email);
  const { data, isLoading } = useUserByEmail(emailUser);

  if (isLoading) {
    return <p>Loading Data User...</p>;
  }

  if (!data) {
    return <p>No data user</p>;
  }

  return (
    <div
      className={cn(
        'relative flex cursor-pointer flex-row items-center gap-3',
        className
      )}
      {...props}
    >
      <div>
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
