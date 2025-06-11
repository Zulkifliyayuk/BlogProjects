import { cn } from '@/lib/utils';
import { useDeleteBlog } from '@/services/hooks/useDeleteBlog';
import { Button } from '../Button/Button';
import { adjustClamp } from '@/layout/function/function';

type DeleteBlogDialogProps = {
  idBlog: number;
  handleClickDelete: () => void;
} & React.ComponentProps<'div'>;

export const DeleteBlogDialog: React.FC<DeleteBlogDialogProps> = ({
  idBlog,
  handleClickDelete,
  className,
  ...props
}) => {
  const mutationDelete = useDeleteBlog();

  const handleConfirmDelete = () => {
    mutationDelete.mutate(idBlog);
    handleClickDelete();
  };

  return (
    <div
      className={cn(
        'fixed top-0 left-0 flex h-[100vh] w-[100vw] items-center justify-center bg-[#0A0D12]/60',
        className
      )}
      {...props}
    >
      <div
        className='bg-neutral-25 flex flex-col gap-[24px] rounded-4xl p-[32px]'
        style={{ width: adjustClamp(345, 537, 1440) }}
      >
        <div className='flex-between'>
          <span className='text-xl leading-8.5 font-bold text-neutral-950'>
            Delete
          </span>
          <img
            src='./src/assets/Xicon.png'
            alt='Xicon'
            className='size-[24px] cursor-pointer'
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
              handleClickDelete();
            }}
          />
        </div>
        <p className='text-md font-regular leading-7.5'>
          Are you sure to delete?
        </p>
        <div className='flex items-center justify-end'>
          <div
            className='cursor-pointer px-[37.5px] py-[10px] text-sm leading-7 font-semibold text-neutral-950'
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.stopPropagation();
              handleClickDelete();
            }}
          >
            Cancel
          </div>
          <Button
            className='w-[171px]'
            variant='secondary'
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              handleConfirmDelete();
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
