import React from 'react';
import { Button } from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { adjustClamp } from '@/layout/function/function';

export const NotFoundBlogs: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className='flex-center h-full'>
      <div className='flex flex-col items-center justify-center'>
        <img
          src='./src/assets/blogNotFound.png'
          className='h-[135px] w-[118.12px]'
          alt='Blogs Not Found'
        />
        <h4 className='mt-6 text-sm leading-7 font-semibold text-neutral-950'>
          No results found
        </h4>
        <h4 className='font-regular mt-1 text-sm leading-7 text-neutral-950'>
          Try using different keywords
        </h4>
        <Button
          variant='primary'
          className='mt-6 w-[200px]'
          onClick={() => {
            navigate('/Home');
          }}
        >
          <a href='/'>Back to Home</a>
        </Button>
      </div>
    </div>
  );
};

export const NotFoundBlogsUser: React.FC = () => {
  return (
    <div className='flex-center'>
      <div className='flex flex-col items-center justify-center'>
        <img
          src='./src/assets/blogNotFound.png'
          className='h-[135px] w-[118.12px]'
          alt='Blogs Not Found'
        />
        <h4 className='mt-6 text-sm leading-7 font-semibold text-neutral-950'>
          No posts from this user yet
        </h4>
        <h4 className='font-regular mt-1 text-sm leading-7 text-neutral-950'>
          Stay tuned for future posts
        </h4>
      </div>
    </div>
  );
};

export const NotFoundMyBlogs: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className='flex-center'>
      <div
        className='flex flex-col items-center justify-center'
        style={{ width: adjustClamp(240, 372, 1440) }}
      >
        <img
          src='./src/assets/blogNotFound.png'
          className='h-[135px] w-[118.12px]'
          alt='Blogs Not Found'
        />
        <h4 className='mt-6 items-center justify-center text-center text-sm leading-7 font-semibold text-neutral-950'>
          Your writing journey starts here
        </h4>
        <h4 className='font-regular mt-1 flex items-center justify-center text-center text-sm leading-7 text-neutral-950'>
          No posts yet, but every great writer starts with the first one.
        </h4>
        <Button
          variant='primary'
          className='mt-6 w-[200px]'
          onClick={() => {
            navigate('/WritePost');
          }}
        >
          <div className='text-neutral-25 flex items-center gap-[8px] text-sm leading-7 font-semibold'>
            <img
              src='./src/assets/writeBlogButton.png'
              alt='write icon'
              className='size-5'
            />
            Write Post
          </div>
        </Button>
      </div>
    </div>
  );
};
