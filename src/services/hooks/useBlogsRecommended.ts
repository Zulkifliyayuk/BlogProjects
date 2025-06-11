import { useQuery } from '@tanstack/react-query';
import {
  getBlogs,
  type BlogRecommendedResponse,
} from '../recommended/recommended';

export const useBlogsRecommended = (page: number, limit: number) => {
  return useQuery<BlogRecommendedResponse>({
    queryKey: ['recommended', page, limit],
    queryFn: () => getBlogs(page, limit),
  });
};
