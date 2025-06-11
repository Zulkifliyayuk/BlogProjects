import { api } from '@/services/api/api';

export type GetBlogLikesProps = {
  id: number;
  name: string;
  headline: string | null;
  avatarUrl: string | null;
};

export const getBlogLikes = async (
  idBlog: number
): Promise<GetBlogLikesProps[]> => {
  const response = await api.get<GetBlogLikesProps[]>(
    'https://truthful-simplicity-production.up.railway.app/posts/' +
      idBlog +
      '/likes'
  );
  return response.data;
};
