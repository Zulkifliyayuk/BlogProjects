import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBlog } from '../deleteBlog/deleteBlog';
import type { MyBlogsResponse } from '../getAllMyBlog/getAllMyBlog';

export const useDeleteBlog = (page: number, limit: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (idBlog: number) => deleteBlog(idBlog),

    onMutate: async (idBlog: number) => {
      const queryKey = ['allmyblogs', page, limit];

      await queryClient.cancelQueries({ queryKey });

      const previousAllMyBlogs =
        queryClient.getQueryData<MyBlogsResponse>(queryKey);

      if (previousAllMyBlogs) {
        const updatedBlogs = previousAllMyBlogs.data.filter(
          (blog) => blog.id !== idBlog
        );

        const updatedData: MyBlogsResponse = {
          ...previousAllMyBlogs,
          data: updatedBlogs,
        };

        // ✅ Set kembali data hasil optimistic update
        queryClient.setQueryData(queryKey, updatedData);
      }

      return { previousAllMyBlogs };
    },

    onError: (_err, _idBlog, context) => {
      if (context?.previousAllMyBlogs) {
        queryClient.setQueryData(
          ['allmyblogs', page, limit],
          context.previousAllMyBlogs
        );
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['allmyblogs'] });
    },
  });
};
