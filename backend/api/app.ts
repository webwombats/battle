import { use } from 'nexus';
import { prisma } from 'nexus-plugin-prisma';
import { auth } from 'nexus-plugin-jwt-auth';
import { shield } from 'nexus-plugin-shield';

import { rules } from './permissions';
import { APP_SECRET } from './config';

use(prisma({ features: { crud: true } }));

use(
  auth({
    appSecret: APP_SECRET,
  }),
);

use(
  shield({
    rules,
    options: {
      allowExternalErrors: true,
    },
  }),
);
