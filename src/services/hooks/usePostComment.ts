import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postComment } from '../postComment/postComment';
import type { GetBlogCommentProps } from '../getComments/getComments';
import { useAppSelector } from '@/redux/hooks/hooks';
import { useUserByEmail } from './useGetUser';

type PostCommentParams = {
  idComment: number;
  body: {
    content: string;
  };
};

export const usePostComment = () => {
  const queryClient = useQueryClient();

  const emailUser = useAppSelector((state) => state.auth.email);
  const { data } = useUserByEmail(emailUser);

  if (!data) {
    throw new Error('User data is missing');
  }

  return useMutation({
    mutationFn: ({ idComment, body }: PostCommentParams) =>
      postComment(idComment, body),

    onMutate: async ({ idComment, body }: PostCommentParams) => {
      await queryClient.cancelQueries({ queryKey: ['comments', idComment] });

      const previousComments = queryClient.getQueryData<GetBlogCommentProps[]>([
        'comments',
        idComment,
      ]);

      const optimisticComment: GetBlogCommentProps = {
        id: Date.now(), // Temporary ID
        content: body.content,
        createdAt: new Date().toISOString(),
        author: {
          id: data.id,
          name: data.name,
          email: data.email,
          password: data.password,
          headline: data.headline,
          avatarUrl: data.avatarUrl,
        },
      };

      if (previousComments) {
        queryClient.setQueryData(
          ['comments', idComment],
          [...previousComments, optimisticComment]
        );
      }

      return { previousComments };
    },

    onError: (_err, _newComment, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          ['comments', _newComment.idComment],
          context.previousComments
        );
      }
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['comments', variables.idComment],
      });
    },

    onSuccess: () => {
      console.log('Comment posted successfully');
    },
  });
};
