import { schema } from 'nexus';

schema.objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.userName();
    t.model.email();
    t.model.fullName();
    t.model.battles({ pagination: false });
  },
});

schema.objectType({
  name: 'World',
  definition(t) {
    t.model.id();
    t.model.name();
    t.model.population();
  },
});

schema.objectType({
  name: 'Battle',
  definition(t) {
    t.model.id();
    t.model.description();
  },
});

schema.queryType({
  definition(t) {
    t.field('hello', {
      type: 'World',
      args: {
        world: schema.stringArg({ required: false }),
      },
      async resolve(_root, args, ctx) {
        const worldToFindByName = args.world ?? 'Earth';
        const world = await ctx.db.world.findOne({
          where: {
            name: worldToFindByName,
          },
        });

        if (!world) throw new Error(`No such world named "${args.world}"`);

        return world;
      },
    });

    t.list.field('worlds', {
      type: 'World',
      resolve(_root, _args, ctx) {
        return ctx.db.world.findMany();
      },
    });

    t.list.field('battles', {
      type: 'Battle',
      resolve(_root, _args, ctx) {
        return ctx.db.battle.findMany();
      },
    });

    t.list.field('users', {
      type: 'User',
      resolve(_root, _args, ctx) {
        return ctx.db.user.findMany();
      },
    });
  },
});
