import React, { useState } from 'react';
import { Button } from '../Button/Button';
import { usePostComment } from '@/services/hooks/usePostComment';
import { useAppSelector } from '@/redux/hooks/hooks';
import { useUserByEmail } from '@/services/hooks/useGetUser';
import { adjustClamp } from '@/layout/function/function';

type GiveCommentsProps = {
  idBlog: number;
};

export const GiveComments: React.FC<GiveCommentsProps> = ({ idBlog }) => {
  const [comment, setComment] = useState('');

  const emailUser = useAppSelector((state) => state.auth.email);
  const { data: userData, isLoading } = useUserByEmail(emailUser);
  const mutation = usePostComment();

  if (!userData)
    return (
      <p>
        Please,{' '}
        <a
          href='/Login'
          className='text-primary-300 hover:text-primary-300/60 cursor-pointer'
        >
          login
        </a>{' '}
        for comment
      </p>
    );

  const handleSend = () => {
    if (comment.trim() === '') {
      console.warn('Comment content is empty.');
      return;
    }

    mutation.mutate({
      idComment: idBlog,
      body: {
        content: comment,
      },
    });
    setComment('');
  };

  return (
    <div>
      <h4 className='mt-4 text-sm leading-7 font-semibold text-neutral-950 md:mt-5'>
        Give your Comments
      </h4>
      <textarea
        placeholder='Enter your comment'
        className='font-regular mt-1 h-[140px] w-full resize-none rounded-xl border border-neutral-300 px-4 py-2 text-sm leading-7 outline-none placeholder:text-neutral-500 focus:ring-[1px] focus:ring-neutral-800'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <div className='flex justify-end'>
        <Button
          variant='primary'
          className='mt-3 w-full md:w-[204px]'
          style={{
            height: adjustClamp(40, 48, 1440),
          }}
          onClick={handleSend}
          disabled={isLoading || !userData?.id || mutation.isPending}
        >
          {mutation.isPending ? 'Sending...' : 'Send'}
        </Button>
      </div>
    </div>
  );
};
