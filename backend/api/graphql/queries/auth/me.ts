import { schema } from 'nexus';

import { getUserId } from '../../../utils';
import { errorMessages } from '../../../messages';

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('me', {
      type: 'User',
      nullable: true,
      resolve: (_parent, _args, ctx) => {
        const userId = getUserId(ctx.token);

        if (!userId) {
          throw new Error(errorMessages.invalidUserId);
        }
        return ctx.db.user.findOne({
          where: {
            id: userId,
          },
        });
      },
    });
  },
});
