import React from 'react';
import ReactDOM from 'react-dom';
import { GiveComments } from './GiveComments';
import { ListComments } from './ListComments';
import { useAppSelector } from '@/redux/hooks/hooks';
import { adjustClamp } from '@/layout/function/function';

type ShowAllCommentsProps = {
  idBlog: number;
  onClose: () => void;
  lengthComment: number;
};

export const ShowAllComments: React.FC<ShowAllCommentsProps> = ({
  idBlog,
  onClose,
  lengthComment,
}) => {
  const token = useAppSelector((state) => state.auth.token);
  return ReactDOM.createPortal(
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-[#0A0D12]/60'>
      <div
        className='flex flex-col overflow-hidden rounded-2xl bg-[#FFFFFF] p-6'
        style={{
          height: adjustClamp(658, 902, 1440),
          width: adjustClamp(345, 613, 1440),
        }}
      >
        <div className='flex-between'>
          <p className='text-md leading-[30px] font-bold text-neutral-950 md:text-xl md:leading-[34px]'>
            Comments({lengthComment})
          </p>
          <img
            src='./src/assets/closeButton.png'
            alt='close'
            className='size-[24px] cursor-pointer'
            onClick={onClose}
          />
        </div>
        {token && (
          <>
            <div className='border-b border-neutral-300 pb-4 md:pb-5'>
              <GiveComments idBlog={idBlog} />
            </div>
          </>
        )}
        <ListComments
          idBlog={idBlog}
          limit={'all'}
          className='mt-4 flex-1 overflow-y-auto md:mt-5'
        />
      </div>
    </div>,
    document.body
  );
};
