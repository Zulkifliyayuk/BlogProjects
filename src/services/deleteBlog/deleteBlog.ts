import { api } from '@/services/api/api';

export const deleteBlog = async (idBlog: number): Promise<void> => {
  await api.delete(
    `https://truthful-simplicity-production.up.railway.app/posts/` + idBlog
  );
};
