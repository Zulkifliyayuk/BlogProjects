import { useMutation } from '@tanstack/react-query';
import { editProfile } from '../editProfile/editProfile';

export const useEditProfile = () => {
  return useMutation({
    mutationFn: (formData: FormData) => editProfile(formData),
  });
};
