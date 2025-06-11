import { ContentMostLike } from '@/components/ContentMostLike/ContentMostLike';
import { ContentRecommend } from '@/components/ContentRecommend/ContentRecommend';
import { MenuContext } from '@/components/context/ToggleMenu/MenuContext';
import { Footer } from '@/components/Footer/Footer';
import { MenuSheet } from '@/components/MenuSheet/MenuSheet';
import { Navbar } from '@/components/Navbar/Navbar';
// import { adjustFlexLeft, adjustFlexRight } from '@/layout/function/function';

import React, { useContext } from 'react';

export const Home: React.FC = () => {
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
          <div className='custom-container mt-12 mb-6 flex flex-1 flex-wrap items-start justify-center gap-y-6 md:mb-39'>
            {/* left content */}
            <div className='flex-[7.52] pr-4 pl-4 md:pr-0'>
              <div className='flex flex-row items-stretch'>
                <ContentRecommend className='flex-[8.93]' />
                <div className='hidden flex-[1.07] items-center justify-center md:flex'>
                  <div className='mx-[48px] h-full w-0.25 bg-neutral-300'></div>
                </div>
              </div>
            </div>
            {/* gap y */}
            <div className='flex w-full md:hidden'>
              <div className='mx-auto h-2.5 w-full bg-neutral-300'></div>
            </div>

            {/* Right Content */}
            <div className='flex-[2.48] pr-4 pl-4 md:pl-0'>
              <ContentMostLike />
            </div>
          </div>

          <Footer />
        </>
      ) : (
        <MenuSheet />
      )}
    </div>
  );
};
