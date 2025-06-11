import { cn } from '@/lib/utils';
import { useGetUserBlogs } from '@/services/hooks/useGetUserBlogs';

import React, { useMemo } from 'react';
import { BlogsListCardComplete } from '../BlogsListCardComplete/BlogsListCardComplete';

export const AnotherPostFromAuthor: React.FC<React.ComponentProps<'div'>> = ({
  className,
  ...props
}) => {
  const page = 1;
  const limit = 1;
  const { data, isLoading, isError, isFetching } = useGetUserBlogs();

  const totalBlogs = useMemo(() => data?.data ?? [], [data]);

  const currentData = useMemo(() => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return totalBlogs.slice(start, end);
  }, [page, totalBlogs]);

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;

  return (
    <div
      className={cn('flex flex-col items-start justify-center py-4', className)}
      {...props}
    >
      <h3 className='text-display-xs leading-9 font-bold text-neutral-900'>
        Another Post
      </h3>
      <div className='w-full'>
        {currentData.length > 0 &&
          currentData.map((blog, index) => (
            <div
              key={blog.id}
              className={`py-6 ${currentData.length - 1 !== index && 'border-b border-neutral-300'}`}
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
        {isFetching && <span> Loading...</span>}
      </div>
    </div>
  );
};
