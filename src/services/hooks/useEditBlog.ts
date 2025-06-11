import { useMutation } from '@tanstack/react-query';
import { editBlog } from '../editBlog/editBlog';

type EditBlogArgs = {
  idBlog: number;
  formData: FormData;
};

export const useEditBlog = () => {
  return useMutation({
    mutationFn: ({ idBlog, formData }: EditBlogArgs) =>
      editBlog(idBlog, formData),
  });
};
