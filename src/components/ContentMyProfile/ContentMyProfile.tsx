import { useAppSelector } from '@/redux/hooks/hooks';
import { useUserByEmail } from '@/services/hooks/useGetUser';
import React, { useState } from 'react';
import { ContentMyBlogs } from './ContentMyBlogs';
import { EditProfileShowCase } from '../EditProfileShowCase/EditProfileShowCase';
import { cn } from '@/lib/utils';
import { ContentMyPassword } from '../ContentMyPassword/ContentMyPassword';
import { adjustClamp } from '@/layout/function/function';

type TabActiveProps = {
  variant: 'Post' | 'Password';
};

export const ContentMyProfile: React.FC = () => {
  const [tabActive, setTabActive] = useState<TabActiveProps['variant']>('Post');
  const [showEditProfile, setShowEditProfile] = useState(false);
  const emailUser = useAppSelector((state) => state.auth.email);
  const { data: dataUser, isLoading } = useUserByEmail(emailUser);

  if (isLoading) {
    return <p>Loading Data User...</p>;
  }

  if (!dataUser) {
    return <p>No data user</p>;
  }
  const handleEditProfile = () => {
    setShowEditProfile((prev) => !prev);
  };
  return (
    <div
      className='mx-auto flex flex-col py-4'
      style={{ width: adjustClamp(361, 800, 1440) }}
    >
      {/* profile id */}
      <div className='flex-between flex rounded-[13px] border border-neutral-300 px-6 py-4'>
        <div className='flex flex-row gap-[8px] md:gap-[12px]'>
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
          <div className='flex flex-col items-start justify-center'>
            <p className='text-sm leading-7 font-bold text-neutral-900 md:text-lg md:leading-8'>
              {dataUser.name}
            </p>
            <p className='font-regular md:text-md text-xs leading-6 text-neutral-900 md:leading-7.5'>
              {dataUser.headline ? dataUser.headline : 'FrontEnd Developer'}
            </p>
          </div>
        </div>

        <div
          className='text-primary-300 cursor-pointer text-sm leading-7 font-semibold underline'
          onClick={handleEditProfile}
        >
          Edit Profile
        </div>
      </div>
      {/* tab Edit Profile */}

      <div className='mt-[20px] flex flex-row py-[8px]'>
        <div
          onClick={() => setTabActive('Post')}
          className={cn(
            'font-regular flex-center w-[177px] cursor-pointer border-b-[1px] border-neutral-300 text-sm text-neutral-900',
            tabActive === 'Post' &&
              'text-primary-300 border-primary-300 border-b-[3px] font-semibold'
          )}
        >
          Your Post
        </div>
        <div
          onClick={() => setTabActive('Password')}
          className={cn(
            'font-regular flex-center w-[177px] cursor-pointer border-b-[1px] border-neutral-300 text-sm text-neutral-900',
            tabActive === 'Password' &&
              'text-primary-300 border-primary-300 border-b-[3px] font-semibold'
          )}
        >
          Change Password
        </div>
      </div>

      {/*end of tab Edit Profile */}

      {/* myBlog Showcase */}
      {tabActive === 'Post' && <ContentMyBlogs className='flex-1' />}
      {/* end of myBlog ShowCase */}

      {/* myPassword Showcase */}
      {tabActive === 'Password' && <ContentMyPassword className='flex-1' />}
      {/* end of myPassword ShowCase */}

      {/* EditProfile ShowCase */}
      {showEditProfile && (
        <EditProfileShowCase handleEditProfile={handleEditProfile} />
      )}
      {/* End EditProfile ShowCase */}
    </div>
  );
};
