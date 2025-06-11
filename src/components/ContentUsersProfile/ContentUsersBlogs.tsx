import React, { useMemo, useState } from 'react';
import { BlogsListCardComplete } from '../BlogsListCardComplete/BlogsListCardComplete';
import { NotFoundBlogsUser } from '../NotFoundBlog/NotFoundBlog';
import { useGetUserBlogs } from '@/services/hooks/useGetUserBlogs';
import { cn } from '@/lib/utils';

export const ContentUsersBlogs: React.FC<React.ComponentProps<'div'>> = ({
  className,
  ...props
}) => {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError, isFetching } = useGetUserBlogs();

  const totalBlogs = useMemo(() => data?.data ?? [], [data]);
  const total = totalBlogs.length;
  const lastPage = Math.ceil(total / limit);

  const currentData = useMemo(() => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return totalBlogs.slice(start, end);
  }, [page, totalBlogs]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;
  return (
    <div
      className={cn(
        'flex h-full w-full flex-col items-start justify-start',
        className,
        currentData.length < 1 && 'items-center justify-center'
      )}
      {...props}
    >
      {data?.data && data.data.length > 0 && (
        <h2 className='md:text-display-sm text-lg leading-8 font-bold text-neutral-900 md:leading-9.5'>
          {data.data.length} Post
        </h2>
      )}

      <div className='mt-4 w-full md:mt-6'>
        {currentData.length > 0 ? (
          currentData.map((blog, index) => (
            <div
              key={blog.id}
              className={`${currentData.length - 1 !== index && 'border-b border-neutral-300 py-6'}`}
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
          ))
        ) : (
          <NotFoundBlogsUser />
        )}
      </div>

      {data?.data && data.data.length > 0 && (
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
