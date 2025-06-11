import {
  getSearchBlogs,
  type BlogSearchResponse,
} from './../searchBlogs/searchBlogs';
import { useQuery } from '@tanstack/react-query';

export const useSearchBlogs = (query: string, page: number, limit: number) => {
  return useQuery<BlogSearchResponse>({
    queryKey: ['search', query, page, limit],
    queryFn: () => getSearchBlogs(query, page, limit),
  });
};
