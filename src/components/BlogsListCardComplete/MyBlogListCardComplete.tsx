import { useAppDispatch } from '@/redux/hooks/hooks';
import { setIdBlog } from '@/redux/slice/blogDetailsSlice';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { StatisticDialog } from '../StatisticDialog/StatisticDialog';
import { DeleteBlogDialog } from '../DeleteDialog/DeleteDialog';
import { setIdBlogEdit } from '@/redux/slice/editBlogSlice';

type MyBlogCardProps = {
  author: { id: number; name: string; email: string };
  comments: number;
  content: string;
  createdAt: string;
  id: number;
  imgUrl: string;
  likes: number;
  tags: string[];
  title: string;
  page: number;
  limit: number;
};

export const MyBlogsListCardComplete: React.FC<MyBlogCardProps> = ({
  // comments,
  content,
  createdAt,
  id,
  imgUrl,
  // likes,
  tags,
  title,
  page,
  limit,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showStatisticDialog, setShowStatisticDialog] = useState(false);

  const handleClickDelete = () => {
    setShowDeleteDialog((prev) => !prev);
  };
  const handleClickStatistic = () => {
    setShowStatisticDialog((prev) => !prev);
  };

  const sanitizedContent = DOMPurify.sanitize(content || '');

  const date = new Date(createdAt); // ISO string → Date object

  const parts = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // true for format AM/PM
  }).formatToParts(date);

  const day = parts.find((p) => p.type === 'day')?.value;
  const month = parts.find((p) => p.type === 'month')?.value;
  const year = parts.find((p) => p.type === 'year')?.value;
  const hour = parts.find((p) => p.type === 'hour')?.value;
  const minute = parts.find((p) => p.type === 'minute')?.value;

  const formatted = `${day} ${month} ${year}, ${hour}:${minute}`;

  return (
    <div
      id={id.toString()}
      className='flex w-full cursor-pointer flex-row items-start justify-start gap-6'
      onClick={() => {
        dispatch(setIdBlog(id));
        navigate('/BlogDetails');
      }}
    >
      <div className='hidden h-[258px] w-[340px] rounded-[6px] bg-neutral-400 lg:block'>
        <img
          src={imgUrl}
          alt='blog img'
          className='h-[258px] min-w-[340px] overflow-hidden rounded-[6px] object-cover'
          onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = './src/assets/imageBlogLokal.png';
          }}
        />
      </div>
      <div className='flex flex-col'>
        {/* title */}
        <h3 className='text-md line-clamp-2 leading-7.5 font-bold text-neutral-900 md:text-xl md:leading-8.5'>
          {title}
        </h3>
        {/* tags */}
        <div className='mt-3 flex w-full flex-row flex-wrap items-center justify-items-start gap-2'>
          {tags.map((tag, index) => (
            <div
              key={index}
              className='font-regular rounded-[8px] border border-neutral-300 px-2 py-0.5 text-xs leading-6 text-neutral-900'
            >
              {tag}
            </div>
          ))}
        </div>
        {/* content */}
        <div
          className='font-regular mt-3 line-clamp-2 text-xs leading-6 text-neutral-900 md:text-sm md:leading-7'
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
        {/* author & date */}

        <div className='mt-4 flex flex-row items-center justify-items-start gap-3'>
          <div className='font-regular flex items-center gap-[12px] text-xs leading-6 text-neutral-600 md:text-sm md:leading-7'>
            <span>Created {formatted}</span>
            <div className='h-[16px] w-0.25 bg-neutral-300'></div>
            <span>Last updated {formatted}</span>
          </div>
        </div>

        {/* form statistic edit delete  */}
        <div className='mt-4 flex flex-row items-center gap-3'>
          <div
            className='text-primary-300 hover:text-primary-300/70 flex-center cursor-pointer text-sm leading-7 font-semibold underline'
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
              handleClickStatistic();
            }}
          >
            Statistic
          </div>
          <div className='h-[23px] w-0.25 bg-neutral-300'></div>
          <div
            className='text-primary-300 hover:text-primary-300/70 flex-center cursor-pointer text-sm leading-7 font-semibold underline'
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
              dispatch(setIdBlogEdit(id));
              navigate('/EditPost');
            }}
          >
            Edit
          </div>
          <div className='h-[23px] w-0.25 bg-neutral-300'></div>
          <div
            className='flex-center cursor-pointer text-sm leading-7 font-semibold text-[#EE1D52] underline hover:text-[#EE1D52]/70'
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
              handleClickDelete();
            }}
          >
            Delete
          </div>
        </div>
        {/* end of form statistic edit delete  */}
      </div>

      {/* DeleteBlok Dialog */}
      {showDeleteDialog && (
        <DeleteBlogDialog
          handleClickDelete={handleClickDelete}
          idBlog={id}
          page={page}
          limit={limit}
        />
      )}
      {/* End DeleteBlok Dialog  */}

      {/* Statistic Dialog */}
      {showStatisticDialog && (
        <StatisticDialog
          handleClickStatistic={handleClickStatistic}
          idBlog={id}
        />
      )}
      {/* End Statistic Dialog  */}
    </div>
  );
};
