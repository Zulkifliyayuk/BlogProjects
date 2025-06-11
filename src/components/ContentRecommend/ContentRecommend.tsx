import React, { useState } from 'react';
import { useBlogsRecommended } from '@/services/hooks/useBlogsRecommended';
import { BlogsListCardComplete } from '../BlogsListCardComplete/BlogsListCardComplete';

export const ContentRecommend: React.FC<React.ComponentProps<'div'>> = () => {
  const [page, setPage] = useState(1);

  const limit = 10;

  const { data, isLoading, isError, isFetching } = useBlogsRecommended(
    page,
    limit
  );
  const lastPage = data?.lastPage ?? 1;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;

  return (
    <div className='w-full items-center justify-center'>
      <h2 className='text-display-sm leading-9.5 font-bold text-neutral-900'>
        Recommend For You
      </h2>

      <div className='w-full'>
        {data?.data.map((blog) => (
          <div key={blog.id} className='border-b border-neutral-300 py-6'>
            <BlogsListCardComplete
              author={blog.author}
              comments={blog.comments}
              content={blog.content}
              createdAt={blog.createdAt}
              id={blog.id}
              imgUrl={blog.imageUrl}
              likes={blog.likes}
              tags={blog.tags}
              title={blog.title}
            />
          </div>
        ))}
      </div>
      <div className='mt-6 flex w-full items-center justify-center gap-2'>
        {page > 1 && (
          <div
            className='font-regular flex cursor-pointer items-center gap-1.5 text-sm leading-7 text-neutral-900 hover:text-neutral-900/70'
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          >
            <img
              src='./src/assets/previousIcon.png'
              alt='previous'
              className='h-6 w-6'
            />
            Previous
          </div>
        )}
        <div className='flex flex-row'>
          {page > 1 && (
            <span className='flex-center font-regular h-12 min-w-12 text-sm text-neutral-900'>
              {page - 1}
            </span>
          )}
          <span className='bg-primary-300 font-regular text-neutral-25 flex-center h-12 min-w-12 rounded-full text-sm'>
            {page}
          </span>
          {lastPage > page && (
            <span className='flex-center font-regular h-12 min-w-12 text-sm text-neutral-900'>
              {page + 1}
            </span>
          )}
          {lastPage > page + 2 && (
            <span
              className='flex-center font-regular h-12 min-w-12 cursor-pointer text-sm text-neutral-900'
              onClick={() => setPage((prev) => prev + 3)}
            >
              ...
            </span>
          )}
        </div>
        {lastPage > page && (
          <div
            className='font-regular flex cursor-pointer items-center gap-1.5 text-sm leading-7 text-neutral-900 hover:text-neutral-900/70'
            onClick={() => setPage((prev) => prev + 1)}
          >
            Next{' '}
            <img
              src='./src/assets/nextIcon.png'
              alt='previous'
              className='h-6 w-6'
            />
          </div>
        )}

        {isFetching && <span> Loading...</span>}
      </div>
    </div>
  );
};
