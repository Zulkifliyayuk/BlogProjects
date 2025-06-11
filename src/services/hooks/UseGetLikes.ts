import { useQuery } from '@tanstack/react-query';

import { getBlogLikes, type GetBlogLikesProps } from '../getLikes/getLikes';

export const useGetLikes = (idBlog: number) => {
  return useQuery<GetBlogLikesProps[]>({
    queryKey: ['likes', idBlog],
    queryFn: () => getBlogLikes(idBlog),
  });
};
