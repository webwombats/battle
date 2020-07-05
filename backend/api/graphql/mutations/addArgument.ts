import { schema } from 'nexus';

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
        const userId = 'ckc918o7m000201mqh0ambcxl';

        const isArgumentAlreadyExists = await ctx.db.argument.count({
          where: { battleId, userId },
        });

        const isArgumentCreatedBySameUser = await ctx.db.battle.count({
          where: { id: battleId, userId },
        });

        if (isArgumentAlreadyExists) {
          throw new Error(`You already have you argument in that battle`);
        }

        if (isArgumentCreatedBySameUser) {
          throw new Error(`You cannot leave an argument to your battle`);
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
