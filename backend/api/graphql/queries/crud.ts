import { schema } from 'nexus';

schema.extendType({
  type: 'Query',
  definition(t) {
    t.crud.battles({
      pagination: true,
    });

    t.crud.users({
      pagination: true,
    });
  },
});
