import { use, server } from 'nexus';
import { prisma } from 'nexus-plugin-prisma';
import { auth } from 'nexus-plugin-jwt-auth';
import { shield } from 'nexus-plugin-shield';
import * as cors from 'cors';

import { rules } from './permissions';
import { APP_SECRET } from './config';

server.express.use(cors());

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
