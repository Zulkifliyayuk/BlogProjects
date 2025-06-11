import React, { useState } from 'react';
import { NotFoundMyBlogs } from '../NotFoundBlog/NotFoundBlog';
import { Button } from '../Button/Button';
import { useNavigate } from 'react-router-dom';
import { MyBlogsListCardComplete } from '../BlogsListCardComplete/MyBlogListCardComplete';
import { cn } from '@/lib/utils';
import { useGetAllMyBlog } from '@/services/hooks/useGetAllMyBlog';

export const ContentMyBlogs: React.FC<React.ComponentProps<'div'>> = ({
  className,
  ...props
}) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data: allMyBlogs, isLoading, isError } = useGetAllMyBlog(page, limit);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;
  if (!allMyBlogs) return <p>No Data Found</p>;
  return (
    <div
      className={cn(
        'flex h-full w-full flex-col py-5',
        className,
        allMyBlogs?.data.length > 0 ? 'justify-start' : 'justify-center'
      )}
      {...props}
    >
      {allMyBlogs?.data.length > 0 && (
        <>
          <div className='flex w-full items-center justify-center border-b border-neutral-300 pb-5 md:justify-between'>
            <h2 className='text-display-sm hidden leading-9.5 font-bold text-neutral-900 md:flex'>
              {allMyBlogs?.data.length} Post
            </h2>
            <Button
              variant='primary'
              className='w-full md:w-[182px]'
              onClick={() => {
                navigate('/WritePost');
              }}
            >
              <div className='flex items-center gap-[8px] text-sm leading-7 font-semibold'>
                <img
                  src='./src/assets/writeBlogButton.png'
                  alt='write icon'
                  className='size-5'
                />
                Write Post
              </div>
            </Button>
          </div>
          <h2 className='flex pt-4 text-lg leading-8 font-bold text-neutral-900 md:hidden'>
            {allMyBlogs?.data.length} Post
          </h2>
        </>
      )}

      <div className='w-full'>
        {allMyBlogs?.data.length > 0 ? (
          allMyBlogs.data.map((blog, index) => (
            <div
              key={blog.id}
              className={`${allMyBlogs?.data.length - 1 !== index && 'border-b border-neutral-300'} py-4 md:py-6`}
            >
              <MyBlogsListCardComplete
                author={blog.author}
                comments={blog.comments}
                content={blog.content}
                createdAt={blog.createdAt}
                id={blog.id}
                imgUrl={blog.imageUrl}
                likes={blog.likes}
                tags={blog.tags}
                title={blog.title}
                page={allMyBlogs?.page}
                limit={limit}
              />
            </div>
          ))
        ) : (
          <NotFoundMyBlogs />
        )}
      </div>

      {allMyBlogs?.data.length > 0 && (
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

            {allMyBlogs?.lastPage > 1 && (
              <span className='bg-primary-300 font-regular text-neutral-25 flex-center h-12 min-w-12 rounded-full text-sm'>
                {page}
              </span>
            )}
            {allMyBlogs?.lastPage > page && (
              <span className='flex-center font-regular h-12 min-w-12 text-sm text-neutral-900'>
                {page + 1}
              </span>
            )}
            {allMyBlogs?.lastPage > page + 2 && (
              <span
                className='flex-center font-regular h-12 min-w-12 cursor-pointer text-sm text-neutral-900'
                onClick={() => setPage((prev) => prev + 3)}
              >
                ...
              </span>
            )}
          </div>
          {allMyBlogs?.lastPage > page && (
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
        </div>
      )}
    </div>
  );
};
