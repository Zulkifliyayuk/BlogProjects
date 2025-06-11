import { useGetComments } from '@/services/hooks/useGetComments';
import React from 'react';
import { cn } from '@/lib/utils';

type ContentMyCommentProps = {
  idBlog: number;
} & React.ComponentProps<'div'>;

export const ContentMyComment: React.FC<ContentMyCommentProps> = ({
  idBlog,
  className,
  ...props
}) => {
  const { data: dataComment } = useGetComments(idBlog);

  return (
    <div className={cn('w-full', className)} {...props}>
      <div className='text-sm leading-7 font-bold text-neutral-950 md:text-lg md:leading-8'>
        Comment ({dataComment?.length})
      </div>
      <div className='mt-[20px] flex flex-col gap-[12px]'>
        {dataComment?.map((dataCom, index) => {
          const date = new Date(dataCom.createdAt);
          const parts = new Intl.DateTimeFormat('en-US', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }).formatToParts(date);

          const day = parts.find((p) => p.type === 'day')?.value;
          const month = parts.find((p) => p.type === 'month')?.value;
          const year = parts.find((p) => p.type === 'year')?.value;

          const formatted = `${day} ${month} ${year}`;

          return (
            <div
              key={dataCom.id}
              className={`flex flex-col gap-[8px] ${dataComment?.length - 1 !== index && 'border-b border-neutral-300'} pb-[12px]`}
            >
              <div className='flex flex-row gap-[12px]'>
                <div>
                  <img
                    src={
                      dataCom.author.avatarUrl
                        ? `https://truthful-simplicity-production.up.railway.app${dataCom.author.avatarUrl}`
                        : './src/assets/imageNull.png'
                    }
                    alt='avatar'
                    className='h-[48px] w-[48px] min-w-[48px] rounded-full object-cover'
                    onError={(
                      e: React.SyntheticEvent<HTMLImageElement, Event>
                    ) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = './src/assets/imageNull.png';
                    }}
                  />
                </div>
                <div className='-gap-[4px] flex flex-col'>
                  <div className='text-xs leading-6 font-semibold text-neutral-900 md:text-sm md:leading-7'>
                    {dataCom.author.name}
                  </div>
                  <div className='font-regular text-xs leading-6 text-neutral-600 md:text-sm md:leading-7'>
                    {formatted}
                  </div>
                </div>
              </div>
              <div className='font-regular text-xs leading-6 text-neutral-900 md:text-sm md:leading-7'>
                {dataCom.content}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
