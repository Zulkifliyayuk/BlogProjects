import React, { useContext, useEffect } from 'react';
import { Button } from '../Button/Button';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { MenuContext } from '../context/ToggleMenu/MenuContext';
import { setQuerySearch } from '@/redux/slice/searchBlogsSlice';
import { useNavigate } from 'react-router-dom';
import { InputSearch } from '../InputSearch/InputSearch';
import { ActiveUserNavbar } from '../ActiveUser/ActiveUserNavbar';
import { useMedia } from 'react-use';

import logo from '@/assets/logo.png';
import xIcon from '@/assets/Xicon.png';
import searchIcon from '@/assets/logoo.png';
import menuIcon from '@/assets/menuIcon.png';
import writeIcon from '@/assets/writeIcon.png';

export const Navbar: React.FC = () => {
  const isLargeIsh = useMedia('(min-width:768px)', false);
  const navigate = useNavigate();
  const context = useContext(MenuContext);
  const dispatch = useAppDispatch();

  if (!context) {
    throw new Error('MenuContext must be use within a provider');
  }

  const { showSheet, handleToggleSheet, setShowSheet } = context;
  const token = useAppSelector((state) => state.auth.token);

  useEffect(() => {
    if (isLargeIsh) {
      setShowSheet(false);
    }
  }, [isLargeIsh]);

  return (
    <div className='w-full border-b border-b-neutral-300'>
      <div className='flex-between custom-container items-center px-4 py-5 md:py-4'>
        <img
          src={logo}
          alt='Logo'
          className='h-[24px] w-[105.75px] cursor-pointer md:min-h-[36px] md:min-w-[158.62px]'
          onClick={() => {
            navigate('/Home');
            dispatch(setQuerySearch(''));
          }}
        />

        <div className='mt-1 hidden w-[373px] md:flex'>
          <InputSearch />
        </div>

        {showSheet ? (
          <img
            src={xIcon}
            alt='menuIcon'
            className='size-6'
            onClick={handleToggleSheet}
          />
        ) : token ? (
          <ActiveUserNavbar className='flex md:hidden' />
        ) : (
          <div className='flex items-center justify-between gap-[24px] md:hidden'>
            <img
              src={searchIcon}
              alt='searchIcon'
              className='size-6'
              onClick={() => {
                navigate('/Search');
              }}
            />
            <img
              src={menuIcon}
              alt='menuIcon'
              className='size-6'
              onClick={handleToggleSheet}
            />
          </div>
        )}

        <div className='relative ml-4 hidden items-center justify-between gap-[24px] md:flex'>
          <div>
            {token ? (
              <div
                className='text-primary-300 hover:text-primary-300/70 flex min-w-[99px] cursor-pointer gap-[8px] text-sm leading-7 font-semibold'
                onClick={() => {
                  navigate('/WritePost');
                }}
              >
                <img src={writeIcon} alt='write icon' className='h-6 w-6' />
                Write Post
              </div>
            ) : (
              <a
                href='/Login'
                className='text-primary-300 hover:text-primary-300/60 text-sm leading-7 font-semibold'
              >
                Login
              </a>
            )}
          </div>
          <div className='h-[23px] w-0.25 bg-neutral-300'></div>

          {token ? (
            <ActiveUserNavbar />
          ) : (
            <Button variant='primary' className='w-[182px] py-2'>
              <a href='/SignUp'>Register</a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
