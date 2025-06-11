import { api } from '@/services/api/api';

export const postBlog = async (formData: FormData): Promise<void> => {
  await api.post(
    `https://truthful-simplicity-production.up.railway.app/posts`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};
