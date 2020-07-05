import { schema } from 'nexus';

schema.extendType({
  type: 'Query',
  definition(t) {
    t.field('battle', {
      type: 'Battle',
      args: {
        id: schema.idArg({ nullable: false }),
      },
      resolve: async (_parent, { id }, ctx) => {
        return ctx.db.battle.findOne({ where: { id } });
      },
    });
  },
});
