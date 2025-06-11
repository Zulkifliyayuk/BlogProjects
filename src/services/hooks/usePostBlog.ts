import { useMutation } from '@tanstack/react-query';
import { postBlog } from '../postBlog/postBlog';

export const usePostBlog = () => {
  return useMutation({
    mutationFn: (formData: FormData) => postBlog(formData),
  });
};
