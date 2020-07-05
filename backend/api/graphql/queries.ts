import { schema } from 'nexus';

schema.queryType({
  definition(t) {
    t.crud.battles({
      pagination: true,
    });

    t.crud.users({
      pagination: true,
    });

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
