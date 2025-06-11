import { api } from '@/services/api/api';

export type BodySender = {
  content: string;
};

export const postComment = async (
  idComment: number,
  body: BodySender
): Promise<void> => {
  await api.post(
    `https://truthful-simplicity-production.up.railway.app/comments/${idComment}`,
    body
  );
};
