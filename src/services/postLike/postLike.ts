import { api } from '@/services/api/api';

export const postLike = async (idBlog: number): Promise<void> => {
  await api.post(
    'https://truthful-simplicity-production.up.railway.app/posts/' +
      idBlog +
      '/like'
  );
};
