import React from 'react';

import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { setQuerySearch } from '@/redux/slice/searchBlogsSlice';
import { useNavigate } from 'react-router-dom';

import { ActiveUserNavbar } from '../ActiveUser/ActiveUserNavbar';

export const NavbarWritePost: React.FC = () => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const token = useAppSelector((state) => state.auth.token);
  return (
    <div className='w-full border-b border-b-neutral-300'>
      <div className='flex-between custom-container items-center px-4 py-5 md:px-0 md:py-4'>
        <div
          className='text-display-xs flex cursor-pointer flex-row items-center gap-[18px]'
          onClick={() => {
            navigate('/Home');
            dispatch(setQuerySearch(''));
          }}
        >
          <img
            src='./src/assets/arrowLeft.png'
            alt='ArrowLeft'
            className='size-[24px] cursor-pointer'
          />
          Write Post
        </div>
        {token && <ActiveUserNavbar />}
      </div>
    </div>
  );
};
