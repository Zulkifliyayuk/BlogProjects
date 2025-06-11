import { useQuery } from '@tanstack/react-query';
import {
  getBlogsMostLiked,
  type BlogsMostLikedResponse,
} from '../mostLiked/mostLiked';

export const useBlogsMostLiked = (page: number, limit: number) => {
  return useQuery<BlogsMostLikedResponse>({
    queryKey: ['recommended', page, limit],
    queryFn: () => getBlogsMostLiked(page, limit),
  });
};
