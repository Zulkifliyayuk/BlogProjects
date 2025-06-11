import { api } from '@/services/api/api';

export const editBlog = async (
  idBlog: number,
  formData: FormData
): Promise<void> => {
  await api.patch(
    `https://truthful-simplicity-production.up.railway.app/posts/` + idBlog,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};
