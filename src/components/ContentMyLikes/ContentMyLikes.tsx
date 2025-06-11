import { cn } from '@/lib/utils';
import { useGetLikes } from '@/services/hooks/UseGetLikes';
import React from 'react';

type ContentMyLikesProps = {
  idBlog: number;
} & React.ComponentProps<'div'>;

export const ContentMyLikes: React.FC<ContentMyLikesProps> = ({
  idBlog,
  className,
  ...props
}) => {
  const { data: dataLikes } = useGetLikes(idBlog);
  return (
    <div className={cn('w-full', className)} {...props}>
      <div className='text-sm leading-7 font-bold text-neutral-950 md:text-lg md:leading-8'>
        Likes ({dataLikes?.length})
      </div>
      <div className='mt-[20px] flex flex-col gap-[12px]'>
        {dataLikes?.map((datalike, index) => (
          <div
            className={`flex flex-row gap-[12px] ${dataLikes?.length - 1 !== index && 'border-b border-neutral-300'} pb-[12px]`}
            key={datalike.id}
          >
            <div>
              <img
                src={
                  datalike?.avatarUrl
                    ? `https://truthful-simplicity-production.up.railway.app${datalike.avatarUrl}`
                    : './src/assets/imageNull.png'
                }
                alt='avatar'
                className='h-[48px] w-[48px] min-w-[48px] rounded-full object-cover'
                onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = './src/assets/imageNull.png';
                }}
              />
            </div>
            <div className='-gap-[4px] flex flex-col'>
              <div className='text-xs leading-6 font-semibold text-neutral-900 md:text-sm md:leading-7'>
                {datalike.name}
              </div>
              <div className='font-regular text-xs leading-6 text-neutral-600 md:text-sm md:leading-7'>
                {datalike.headline}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
