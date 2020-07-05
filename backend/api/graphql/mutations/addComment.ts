import { schema } from 'nexus';
import { errorMessages } from '../messages';

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
        const userId = 'ckc918o7m000201mqh0ambcxl';

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
