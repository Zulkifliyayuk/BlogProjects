import React from 'react';
import DOMPurify from 'dompurify';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/hooks/hooks';
import { setIdBlog } from '@/redux/slice/blogDetailsSlice';
import { useGetComments } from '@/services/hooks/useGetComments';
import { Likes } from '../Likes/Likes';
import { useGetLikes } from '@/services/hooks/UseGetLikes';

type MostLikedCardProps = {
  author: { id: number; name: string; email: string };
  comments: number;
  content: string;
  createdAt: string;
  id: number;
  imgUrl: string;
  likes: number;
  tags: string[];
  title: string;
};

export const MostLikedCard: React.FC<MostLikedCardProps> = ({
  // comments,
  content,
  id,
  // likes,
  title,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { data: dataCommentsCheckLenght } = useGetComments(id);
  const token = useAppSelector((state) => state.auth.token);
  const { data: dataLikesCheckLenght } = useGetLikes(id);
  const lengthComments = dataCommentsCheckLenght?.length ?? 0;
  const lengthLikes = dataLikesCheckLenght?.length ?? 0;
  const sanitizedContent = DOMPurify.sanitize(content || '');
  return (
    <div
      className='w-full cursor-pointer'
      id={id.toString()}
      onClick={() => {
        dispatch(setIdBlog(id));
        navigate('/BlogDetails');
      }}
    >
      {/* title */}
      <h3 className='text-md line-clamp-2 leading-7.5 font-bold text-neutral-900'>
        {title}
      </h3>

      {/* content */}
      <div className='font-regular mt-1 line-clamp-2 text-sm leading-7 text-neutral-900'>
        <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />
      </div>

      {/* likes & comments */}
      <div className='mt-4 flex flex-row items-center gap-5'>
        {token ? (
          <Likes className='cursor-pointer' idBlog={id} />
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
          {lengthComments}
        </div>
      </div>
    </div>
  );
};
