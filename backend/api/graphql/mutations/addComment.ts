import { schema } from 'nexus';

import { errorMessages } from '../../messages';
import { getUserId } from '../../utils';

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('addComment', {
      type: 'Comment',
      args: {
        argumentId: schema.idArg({ nullable: false }),
        text: schema.stringArg({ nullable: false }),
      },
      resolve: async (_parent, { argumentId, text }, ctx) => {
        const userId = getUserId(ctx.token);

        const createdComment = await ctx.db.comment.create({
          data: {
            text,
            Argument: {
              connect: {
                id: argumentId,
              },
            },
            User: {
              connect: {
                id: userId,
              },
            },
          },
        });

        if (!createdComment) {
          throw new Error(errorMessages.somethingHappened);
        }

        return createdComment;
      },
    });
  },
});
