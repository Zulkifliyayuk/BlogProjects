import { api } from '@/services/api/api';

export type BodyFormEditPassword = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const editPassword = async (
  formData: BodyFormEditPassword
): Promise<void> => {
  await api.patch(
    `https://truthful-simplicity-production.up.railway.app/users/password`,
    formData
  );
};
