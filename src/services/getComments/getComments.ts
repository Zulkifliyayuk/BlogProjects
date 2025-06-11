import { api } from '@/services/api/api';

export type GetBlogCommentProps = {
  id: number;
  content: string;
  createdAt: string;
  author: {
    id: number;
    name: string;
    email: string;
    password: string;
    headline: string | null;
    avatarUrl: string | null;
  };
};

export const getBlogComments = async (
  idBlog: number
): Promise<GetBlogCommentProps[]> => {
  const response = await api.get<GetBlogCommentProps[]>(
    'https://truthful-simplicity-production.up.railway.app/comments/' + idBlog
  );
  return response.data;
};
