import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppSelector } from '@/redux/hooks/hooks';
import { useUserByEmail } from './useGetUser';
import { postLike } from '../postLike/postLike';
import type { GetBlogLikesProps } from '../getLikes/getLikes';

type PostLikeParam = {
  idBlog: number;
};

export const usePostLike = () => {
  const queryClient = useQueryClient();
  const emailUser = useAppSelector((state) => state.auth.email);
  const { data, isLoading } = useUserByEmail(emailUser);

  const mutation = useMutation({
    mutationFn: ({ idBlog }: PostLikeParam) => postLike(idBlog),

    onMutate: async ({ idBlog }: PostLikeParam) => {
      await queryClient.cancelQueries({ queryKey: ['likes', idBlog] });

      const previousLikes = queryClient.getQueryData<GetBlogLikesProps[]>([
        'likes',
        idBlog,
      ]);

      const optimisticLike: GetBlogLikesProps = {
        id: data!.id,
        name: data!.name,
        headline: data!.headline,
        avatarUrl: data!.avatarUrl,
      };

      if (previousLikes && previousLikes.length > 0) {
        const isAlreadyLiked = previousLikes.some(
          (like) => like.id === optimisticLike.id
        );

        const updatedLikes = isAlreadyLiked
          ? previousLikes.filter((like) => like.id !== optimisticLike.id)
          : [...previousLikes, optimisticLike];

        queryClient.setQueryData(['likes', idBlog], updatedLikes);
      } else {
        queryClient.setQueryData(['likes', idBlog], [optimisticLike]);
      }

      return { previousLikes };
    },

    onError: (_err, _newLikes, context) => {
      if (context?.previousLikes) {
        queryClient.setQueryData(
          ['likes', _newLikes.idBlog],
          context.previousLikes
        );
      }
    },

    onSettled: (_data, _error, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['likes', variables.idBlog],
      });
    },

    onSuccess: () => {
      console.log('Like posted successfully');
    },
  });

  if (!data || isLoading) return null;

  return mutation;
};
