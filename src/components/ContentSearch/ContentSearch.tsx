import React, { useState } from 'react';
import { useSearchBlogs } from '@/services/hooks/useSearchBlogs';
import { useAppSelector } from '@/redux/hooks/hooks';
import { BlogsListCardComplete } from '../BlogsListCardComplete/BlogsListCardComplete';

export const ContentSearch: React.FC = () => {
  // const dispatch = useAppDispatch();
  const query = useAppSelector((state) => state.searchBlogs.query);

  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError, isFetching } = useSearchBlogs(
    query,
    page,
    limit
  );
  const lastPage = data?.lastPage ?? 1;

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;

  return (
    <div className='custom-container p-0.54 h-full w-full flex-col items-center justify-center px-4 md:py-12'>
      {data?.data && data.data.length > 0 && (
        <>
          {query.length > 0 && (
            <h2 className='text-display-sm hidden pb-6 leading-9.5 font-bold text-neutral-900 md:block'>
              Result for “{query}”
            </h2>
          )}
        </>
      )}

      <div className='flex h-full w-full flex-col'>
        {query.length > 0 &&
          data?.data &&
          data.data.length > 0 &&
          data.data.map((blog, index) => (
            <div
              key={blog.id}
              className={`pb-4 md:pb-6 ${index === 0 ? 'pt-0 md:pt-0' : 'pt-4 md:pt-6'} ${index !== data.data.length - 1 ? 'border-b border-neutral-300' : ''}`}
            >
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

      {query.length > 0 && data?.data && data.data.length > 0 && (
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
            {lastPage > 1 && (
              <span className='bg-primary-300 font-regular text-neutral-25 flex-center h-12 min-w-12 rounded-full text-sm'>
                {page}
              </span>
            )}
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
      )}
    </div>
  );
};
