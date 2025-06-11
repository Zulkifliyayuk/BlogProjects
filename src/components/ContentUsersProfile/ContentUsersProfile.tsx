import { useAppSelector } from '@/redux/hooks/hooks';
import { useUserByEmail } from '@/services/hooks/useGetUser';
import React, { useEffect } from 'react';
import { ContentUsersBlogs } from './ContentUsersBlogs';
import { useNavigate } from 'react-router-dom';

export const ContentUsersProfile: React.FC = () => {
  const navigate = useNavigate();
  const emailUser = useAppSelector((state) => state.user.email);
  const emailAuth = useAppSelector((state) => state.auth.email);

  useEffect(() => {
    if (emailUser === emailAuth) {
      navigate('/MyProfile');
    }
  }, [emailUser, emailAuth, navigate]);

  const { data: dataUser, isLoading } = useUserByEmail(emailUser);

  if (isLoading) {
    return <p>Loading Data User...</p>;
  }

  if (!dataUser) {
    return <p>No data user</p>;
  }

  return (
    <div className='mx-auto my-[24px] flex w-[800px] min-w-[361px] flex-col px-4'>
      {/* profile id */}
      <div className='flex flex-row gap-[8px] border-b border-neutral-300 pb-[16px] md:gap-[12px] md:pb-[24px]'>
        <div>
          <img
            src={
              dataUser?.avatarUrl
                ? `https://truthful-simplicity-production.up.railway.app${dataUser.avatarUrl}`
                : './src/assets/imageNull.png'
            }
            alt='avatar'
            className='min-size-[40px] size-[40px] rounded-full object-cover md:size-[80px]'
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = './src/assets/imageNull.png';
            }}
          />
        </div>
        <div className='flex flex-col items-start justify-center'>
          <p className='text-sm leading-7 font-bold text-neutral-900 md:text-lg md:leading-8'>
            {dataUser.name}
          </p>
          <p className='font-regular md:text-md text-xs leading-6 text-neutral-900 md:leading-7.5'>
            {dataUser.headline ? dataUser.headline : 'FrontEnd Developer'}
          </p>
        </div>
      </div>

      {/* UserBlogs Showcase */}
      <ContentUsersBlogs className='mt-4 flex-1 md:mt-6' />
      {/* end of UserBlogs ShowCase */}
    </div>
  );
};
