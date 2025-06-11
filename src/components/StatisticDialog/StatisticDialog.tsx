import { cn } from '@/lib/utils';
import { useState } from 'react';
import { ContentMyLikes } from '../ContentMyLikes/ContentMyLikes';
import { ContentMyComment } from '../ContentMyComment/ContentMyComment';
import { adjustClamp } from '@/layout/function/function';

type StatisticDialogProps = {
  idBlog: number;
  handleClickStatistic: () => void;
} & React.ComponentProps<'div'>;

type TabStatisticProps = {
  variant: 'Like' | 'Comment';
};

export const StatisticDialog: React.FC<StatisticDialogProps> = ({
  idBlog,
  handleClickStatistic,
  className,
  ...props
}) => {
  const [tabStatisticActive, setTabStatisticActive] =
    useState<TabStatisticProps['variant']>('Like');
  return (
    <div
      className={cn(
        'fixed top-0 left-0 flex h-[100vh] w-[100vw] items-center justify-center bg-[#0A0D12]/60',
        className
      )}
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        handleClickStatistic();
      }}
      {...props}
    >
      <div
        className='bg-neutral-25 flex flex-col gap-[24px] overflow-hidden rounded-4xl p-[32px]'
        style={{
          width: adjustClamp(345, 613, 1440),
          height: adjustClamp(508, 576, 1440),
        }}
      >
        {/* title dialog & Close button */}
        <div className='flex-between'>
          <span className='text-xl leading-8.5 font-bold text-neutral-950'>
            Statistic
          </span>
          <img
            src='./src/assets/Xicon.png'
            alt='Xicon'
            className='size-[24px] cursor-pointer'
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
              handleClickStatistic();
            }}
          />
        </div>
        {/* end of title dialog & Close button */}
        {/* tab like & comment */}
        <div className='flex w-full flex-row'>
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
              setTabStatisticActive('Like');
            }}
            className={cn(
              'font-regular flex flex-1 cursor-pointer items-start justify-center gap-[8px] border-b-[1px] border-neutral-300 text-sm text-neutral-900',
              tabStatisticActive === 'Like' &&
                'text-primary-300 border-primary-300 border-b-[3px] font-semibold'
            )}
          >
            <img
              src='./src/assets/likeDefault.svg'
              alt='likedefault'
              className={cn(tabStatisticActive === 'Like' ? 'hidden' : 'flex')}
            />
            <img
              src='./src/assets/likeClicked.svg'
              alt='likeclicked'
              className={cn(
                tabStatisticActive === 'Comment' ? 'hidden' : 'flex'
              )}
            />
            Like
          </div>
          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
              setTabStatisticActive('Comment');
            }}
            className={cn(
              'font-regular flex flex-1 cursor-pointer items-start justify-center gap-[8px] border-b-[1px] border-neutral-300 text-sm text-neutral-900',
              tabStatisticActive === 'Comment' &&
                'text-primary-300 border-primary-300 border-b-[3px] font-semibold'
            )}
          >
            <img
              src='./src/assets/commentDefault.svg'
              alt='likedefault'
              className={cn(tabStatisticActive === 'Like' ? 'flex' : 'hidden')}
            />
            <img
              src='./src/assets/commentClicked.svg'
              alt='likeclicked'
              className={cn(
                tabStatisticActive === 'Comment' ? 'flex' : 'hidden'
              )}
            />
            Comment
          </div>
        </div>
        {/* end of tab like & comment */}

        <div className='flex-1 overflow-y-auto'>
          {/* Likes Showcase */}
          {tabStatisticActive === 'Like' && (
            <ContentMyLikes idBlog={idBlog} className='h-full' />
          )}
          {/* end of Likes ShowCase */}

          {/* comment Showcase */}
          {tabStatisticActive === 'Comment' && (
            <ContentMyComment idBlog={idBlog} className='h-full' />
          )}
          {/* end of comment ShowCase */}
        </div>
      </div>
    </div>
  );
};
