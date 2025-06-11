import { useQuery } from '@tanstack/react-query';
import { getAllMyBlogs } from '../getAllMyBlog/getAllMyBlog';
import type { MyBlogsResponse } from '../getMyBlogs/getMyBlogs';

export const useGetAllMyBlog = (page: number, limit: number) => {
  return useQuery<MyBlogsResponse>({
    queryKey: ['allmyblogs', page, limit],
    queryFn: () => getAllMyBlogs(page, limit),
  });
};
