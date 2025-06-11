import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { useGetBlogDetails } from '@/services/hooks/useGetBlogDetails';
import { useUserByEmail } from '@/services/hooks/useGetUser';
import DOMPurify from 'dompurify';
import React, { useState } from 'react';
import { ActiveUser } from '../ActiveUser/ActiveUser';
import { GiveComments } from '../GiveComments/GiveComments';
import { ListComments } from '../GiveComments/ListComments';
import { useGetComments } from '@/services/hooks/useGetComments';
import { ShowAllComments } from '../GiveComments/ShowAllComments';
import { Likes } from '../Likes/Likes';
import { useGetLikes } from '@/services/hooks/UseGetLikes';
import { AnotherPostFromAuthor } from '../AnotherPostFromAuthor/AnotherPostFromAuthor';
import { setEmailUser } from '@/redux/slice/userSlice';

export const ContentBlogDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const [showAllComments, setShowAllComments] = useState(false);

  const idBlog = useAppSelector((state) => state.blogDetails.id);

  const token = useAppSelector((state) => state.auth.token);

  const { data: dataLikesCheckLenght } = useGetLikes(idBlog);

  const { data: blogData, isLoading, isError } = useGetBlogDetails(idBlog);
  const { data: dataCommentsCheckLenght } = useGetComments(blogData?.id ?? 0);
  const lengthLikes = dataLikesCheckLenght?.length ?? 0;

  const authorEmail = blogData?.author?.email ?? '';
  const { data: authorData } = useUserByEmail(authorEmail);

  dispatch(setEmailUser(authorEmail));

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;
  if (!blogData) return <p>No blog data found</p>;

  const sanitizedContent = DOMPurify.sanitize(blogData.content || '');

  const lengthComments = dataCommentsCheckLenght?.length ?? 0;

  const date = blogData?.createdAt ? new Date(blogData.createdAt) : new Date();

  const parts = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).formatToParts(date);

  const day = parts.find((p) => p.type === 'day')?.value;
  const month = parts.find((p) => p.type === 'month')?.value;
  const year = parts.find((p) => p.type === 'year')?.value;

  const formatted = `${day} ${month} ${year}`;

  const handleShowAllComments = () => {
    setShowAllComments((prev) => !prev);
  };

  return (
    <div className='mx-auto max-w-[800px] min-w-[393px] items-center justify-center px-4 py-4 md:py-[48px]'>
      <div className='w-full border-b border-neutral-300 pt-6'>
        {/* title */}
        <h2 className='text-display-lg leading-11 font-bold text-neutral-900'>
          {blogData.title}
        </h2>
        {/* tags */}
        <div className='mt-3 flex w-full flex-row flex-wrap items-center justify-items-start gap-2'>
          {blogData.tags.map((tag, index) => (
            <div
              key={index}
              className='font-regular rounded-[8px] border border-neutral-300 px-2 py-0.5 text-xs leading-6 text-neutral-900'
            >
              {tag}
            </div>
          ))}
        </div>

        {/* author & date */}
        <div className='mt-4 flex flex-row items-center justify-items-start gap-3 pb-4'>
          <div className='flex flex-row items-center gap-2'>
            {' '}
            <img
              src={
                authorData?.avatarUrl
                  ? `https://truthful-simplicity-production.up.railway.app${authorData?.avatarUrl}`
                  : './src/assets/imageNull.png'
              }
              alt='avatar'
              className='h-[40px] w-[40px] min-w-[40px] rounded-full object-cover'
              onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = './src/assets/imageNull.png';
              }}
            />
            {authorData?.name}
          </div>
          <div className='size-1 rounded-full bg-neutral-400' />
          <div className='font-regular text-sm leading-7 text-neutral-600'>
            {formatted}
          </div>
        </div>
      </div>

      {/* likes & comments */}
      <div className='w-full border-b border-neutral-300 py-4'>
        <div className='flex flex-row items-center gap-5'>
          {token ? (
            <Likes className='cursor-pointer' idBlog={idBlog} />
          ) : (
            <div className='font-regular flex flex-row items-center gap-1.5 text-sm leading-6 text-neutral-600'>
              <img
                src='./src/assets/like.png'
                alt='like icon'
                className='size-5'
              />
              <span>{lengthLikes}</span>
            </div>
          )}

          <div className='font-regular flex flex-row items-center gap-1.5 text-sm leading-6 text-neutral-600'>
            <img
              src='./src/assets/commentIcon.png'
              alt='comment icon'
              className='size-5'
            />
            {/* {blogData.comments} */}
            {lengthComments}
          </div>
        </div>
      </div>
      {/* end of likes & comments */}

      {/* image blog */}
      <img
        src={blogData.imageUrl}
        alt='blog img'
        className='h-auto w-full overflow-hidden rounded-[6px] object-cover py-4'
        onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = './src/assets/imageBlogLokal.png';
        }}
      />
      {/* end of image blog */}

      {/* blog text containt */}
      <div className='border-b border-neutral-300 pb-4'>
        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
      </div>
      {/* end of blog text containt */}

      {/* Give comments */}
      <div className='py-4'>
        <h3 className='text-display-xs leading-9 font-bold text-neutral-900'>
          Comments ({lengthComments})
        </h3>
        {token && (
          <>
            <ActiveUser className='mt-3' />
            <GiveComments idBlog={blogData.id} />
          </>
        )}
      </div>
      {/* end of Give comments */}

      {/* Show comments */}
      <div
        className={`border-t border-neutral-300 ${lengthComments > 0 && 'border-b pb-4'}`}
      >
        <ListComments idBlog={blogData.id} limit={3} className='mt-1' />

        {lengthComments > 3 && (
          <div
            className='text-primary-300 cursor-pointer text-sm leading-7 font-semibold'
            onClick={handleShowAllComments}
          >
            See All Comments
          </div>
        )}

        {showAllComments && (
          <ShowAllComments
            idBlog={blogData.id}
            onClose={() => setShowAllComments(false)}
            lengthComment={lengthComments}
          />
        )}
      </div>
      {/* End of Show comments */}

      <AnotherPostFromAuthor />
    </div>
  );
};
