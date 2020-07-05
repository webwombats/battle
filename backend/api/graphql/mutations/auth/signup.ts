import { schema } from 'nexus';
import { hash } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import { APP_SECRET } from '../../config';

schema.extendType({
  type: 'Mutation',
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
  },
});
