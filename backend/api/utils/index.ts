import { errorMessages } from '../messages';

export const getUserId = (token: any | null | undefined) => {
  const userId: string = token.userId;

  if (!userId) {
    throw new Error(errorMessages.notAuthorized);
  }

  return userId;
};
