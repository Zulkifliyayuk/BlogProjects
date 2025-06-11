import React from 'react';
import { Button } from '../Button/Button';

export const MenuSheet: React.FC = () => {
  return (
    <div className='mx-auto my-0 mt-[39px] flex flex-col items-center justify-center gap-y-[16px]'>
      <a
        href='/Login'
        className='text-primary-300 hover:text-primary-300/60 text-sm leading-7 font-semibold'
      >
        Login
      </a>
      <Button variant='primary' className='w-[182px] py-2'>
        <a href='/SignUp'>Register</a>
      </Button>
    </div>
  );
};
