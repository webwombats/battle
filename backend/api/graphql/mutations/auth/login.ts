import { schema } from 'nexus';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

export const APP_SECRET = 'appsecret321';

schema.extendType({
  type: 'Mutation',
  definition(t) {
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
