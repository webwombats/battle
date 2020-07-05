import { schema } from 'nexus';

import { errorMessages } from '../../messages';
import { getUserId } from '../../utils';

schema.extendType({
  type: 'Mutation',
  definition(t) {
    t.field('addArgument', {
      type: 'Argument',
      args: {
        battleId: schema.idArg({ nullable: false }),
        // side: schema.enumType({rootTyping: ''}),
        text: schema.stringArg({ nullable: false }),
      },
      resolve: async (_parent, { battleId, text }, ctx) => {
        const userId = getUserId(ctx.token);

        const isArgumentAlreadyExists = await ctx.db.argument.count({
          where: { battleId, userId },
        });

        const isArgumentCreatedBySameUser = await ctx.db.battle.count({
          where: { id: battleId, userId },
        });

        if (isArgumentAlreadyExists) {
          throw new Error(errorMessages.argumentAlreadyExists);
        }

        if (isArgumentCreatedBySameUser) {
          throw new Error(errorMessages.argumentCreatedBySameUser);
        }

        const createdArgument = await ctx.db.argument.create({
          data: {
            text,
            side: 'SIDE_A',
            Battle: {
              connect: {
                id: battleId,
              },
            },
            User: {
              connect: {
                id: userId,
              },
            },
          },
        });

        return createdArgument;
      },
    });
  },
});
