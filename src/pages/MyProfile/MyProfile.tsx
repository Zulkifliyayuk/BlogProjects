import { ContentMyProfile } from '@/components/ContentMyProfile/ContentMyProfile';
import { Footer } from '@/components/Footer/Footer';
import { Navbar } from '@/components/Navbar/Navbar';
import React from 'react';

export const MyProfile: React.FC = () => {
  return (
    <div className='relative mx-auto my-0 flex min-h-screen max-w-[1440px] flex-col overflow-hidden'>
      <Navbar />
      <div className='items-Start flex flex-1 justify-center'>
        <ContentMyProfile />
      </div>
      <Footer />
    </div>
  );
};
