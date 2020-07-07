import { schema } from 'nexus';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { TOKEN_SECRET } from '../../../config';

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
        console.log({ ctx });
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

        // await setLoginSession(context.res, session);

        return {
          token: sign({ userId: user.id }, TOKEN_SECRET),
          user,
        };
      },
    });
  },
});
