import { ContentBlogDetails } from '@/components/ContentBlogDetails/ContentBlogDetails';
import { MenuContext } from '@/components/context/ToggleMenu/MenuContext';
import { Footer } from '@/components/Footer/Footer';
import { MenuSheet } from '@/components/MenuSheet/MenuSheet';
import { Navbar } from '@/components/Navbar/Navbar';

import React, { useContext } from 'react';

export const BlogDetails: React.FC = () => {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error('MenuContext must be use within a provider');
  }

  const { showSheet } = context;
  return (
    <div className='relative mx-auto my-0 flex min-h-screen max-w-[1440px] flex-col overflow-hidden'>
      <Navbar />
      {!showSheet ? (
        <>
          <div className='items-Start flex flex-1 justify-center'>
            <ContentBlogDetails />
          </div>
          <Footer />
        </>
      ) : (
        <MenuSheet />
      )}
    </div>
  );
};
