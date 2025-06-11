import { useQuery } from '@tanstack/react-query';
import {
  getBlogComments,
  type GetBlogCommentProps,
} from '../getComments/getComments';

export const useGetComments = (idBlog: number) => {
  return useQuery<GetBlogCommentProps[]>({
    queryKey: ['comments', idBlog],
    queryFn: () => getBlogComments(idBlog),
  });
};
