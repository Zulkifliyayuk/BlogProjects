import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { useUserByEmail } from '@/services/hooks/useGetUser';
import React, { useState } from 'react';

import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { clearToken } from '@/redux/slice/authSlice';

export const ActiveUserNavbar: React.FC<React.ComponentProps<'div'>> = ({
  className,
  ...props
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const emailUser = useAppSelector((state) => state.auth.email);
  const { data, isLoading } = useUserByEmail(emailUser);

  const [showDropdown, setShowDropdown] = useState(false);

  const handlesDropdown = () => {
    setShowDropdown((prev) => !prev);
  };
  const handleLogout = () => {
    dispatch(clearToken()); // 1. hapus token dari Redux
    localStorage.removeItem('token'); // 2. jika kamu menyimpan token di localStorage
    navigate('/Home'); // 3. redirect ke halaman login (opsional)
  };

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
      onClick={handlesDropdown}
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
        {showDropdown && (
          <div className='absolute top-0 right-0 z-50 w-[182px] min-w-[182px] translate-y-[56px] rounded-[12px] border border-neutral-300 bg-[#FFFFFF] md:left-0 md:-translate-x-[24px]'>
            <div className='flex flex-col items-start justify-center'>
              <div
                className='font-regular hover:text-primary-300 flex flex-row items-center justify-start gap-[8px] px-4 py-2 text-sm leading-7 text-neutral-950'
                onClick={() => {
                  navigate('/MyProfile');
                }}
              >
                <img
                  src='./src/assets/profileIcon.png'
                  alt='profileIcon'
                  className='size-[20px]'
                />
                Profile
              </div>
              <div
                className='font-regular hover:text-primary-300 flex flex-row items-center justify-start gap-[8px] px-4 py-2 text-sm leading-7 text-neutral-950'
                onClick={handleLogout}
              >
                <img
                  src='./src/assets/logoutIcon.png'
                  alt='profileIcon'
                  className='size-[20px]'
                />
                Logout
              </div>
            </div>
          </div>
        )}
      </div>
      <div className='hidden md:flex'>{data.name}</div>
    </div>
  );
};
