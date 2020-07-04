import { schema } from 'nexus';
import { compare, hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export const APP_SECRET = 'appsecret321';

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
  name: 'AuthPayload',
  definition(t) {
    t.string('token');
    t.field('user', { type: 'User' });
  },
});

schema.objectType({
  name: 'Battle',
  definition(t) {
    t.model.id();
    t.model.description();
    t.model.userId();
  },
});

schema.queryType({
  definition(t) {
    t.list.field('battles', {
      type: 'Battle',
      resolve(_parent, _args, ctx) {
        return ctx.db.battle.findMany();
      },
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

    t.list.field('users', {
      type: 'User',
      resolve(_parent, _args, ctx) {
        return ctx.db.user.findMany();
      },
    });
  },
});

schema.mutationType({
  definition(t) {
    t.field('signup', {
      type: 'AuthPayload',
      args: {
        fullName: schema.stringArg({ nullable: false }),
        userName: schema.stringArg({ nullable: false }),
        email: schema.stringArg({ nullable: false }),
        password: schema.stringArg({ nullable: false }),
      },
      resolve: async (
        _parent,
        { fullName, userName, email, password },
        ctx,
      ) => {
        const hashedPassword = await hash(password, 10);
        const user = await ctx.db.user.create({
          data: {
            fullName,
            userName,
            email,
            password: hashedPassword,
          },
        });

        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        };
      },
    });

    t.field('login', {
      type: 'AuthPayload',
      args: {
        email: schema.stringArg({ nullable: false }),
        password: schema.stringArg({ nullable: false }),
      },
      resolve: async (_parent, { email, password }, ctx) => {
        const user = await ctx.db.user.findOne({
          where: {
            email,
          },
        });

        if (!user) {
          throw new Error(`No user found for email: ${email}`);
        }
        const passwordValid = await compare(password, user.password);

        if (!passwordValid) {
          throw new Error('Invalid password');
        }

        return {
          token: sign({ userId: user.id }, APP_SECRET),
          user,
        };
      },
    });
  },
});
