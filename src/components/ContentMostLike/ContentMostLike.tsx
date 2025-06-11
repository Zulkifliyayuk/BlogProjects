import { useBlogsMostLiked } from '@/services/hooks/useMostLiked';
import React from 'react';
import { MostLikedCard } from '../MostLikeCard/MostLikeCard';

export const ContentMostLike: React.FC = () => {
  // const [page, setPage] = useState(1);
  const limit = 3;
  const page = 1;

  const { data, isLoading, isError, isFetching } = useBlogsMostLiked(
    page,
    limit
  );

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;
  return (
    <>
      <h2 className='text-display-xs leading-9 font-bold text-neutral-900'>
        Most Liked
      </h2>
      <div className='w-full'>
        {data?.data.map((blog, index) => (
          <div
            key={blog.id}
            className={`py-5 ${index !== data.data.length - 1 ? 'border-b border-neutral-300' : ''}`}
          >
            <MostLikedCard
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
    </>
  );
};
