import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { setQuerySearch } from '@/redux/slice/searchBlogsSlice';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export const InputSearch: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);

  const inputSearchQuery = useAppSelector((state) => state.searchBlogs.query);

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputSearchQuery]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuerySearch(event.target.value));
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      navigate('/Search');
    }
  };
  return (
    <div className='flex w-full items-center gap-2 rounded-xl border border-neutral-300 px-4 py-3'>
      <img
        src='./src/assets/search.png'
        alt='Logo'
        className='size-6'
        onClick={() => {
          navigate('/Search');
        }}
      />

      <input
        ref={inputRef}
        type='text'
        id='search'
        placeholder='Search'
        className='font-regular w-full border-none text-sm leading-7 text-neutral-500 outline-none'
        value={inputSearchQuery}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        // onFocus={() => navigate('/Search')}
      />
    </div>
  );
};
