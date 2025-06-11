import { useMutation } from '@tanstack/react-query';

import {
  editPassword,
  type BodyFormEditPassword,
} from '../editPassword/editPassword';

export const useEditPassword = () => {
  return useMutation({
    mutationFn: (formData: BodyFormEditPassword) => editPassword(formData),
  });
};
