import { rule } from 'nexus-plugin-shield';

import { getUserId } from '../utils';

const isAuthenticated = rule({ cache: 'contextual' })(
  async (_parent, _args, ctx, _info) => {
    const userId = getUserId(ctx.token);

    return Boolean(userId);
  },
);

export const rules = {
  Query: {
    me: isAuthenticated,
  },
  Mutation: {
    addComment: isAuthenticated,
    addArgument: isAuthenticated,
  },
};
