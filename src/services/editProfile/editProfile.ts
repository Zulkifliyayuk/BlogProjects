import { api } from '@/services/api/api';

export const editProfile = async (body: FormData): Promise<void> => {
  await api.patch(
    `https://truthful-simplicity-production.up.railway.app/users/profile`,
    body,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }
  );
};
