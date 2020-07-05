import { schema } from 'nexus';

schema.objectType({
  name: 'User',
  definition(t) {
    t.model.id();
    t.model.userName();
    t.model.email();
    t.model.fullName();
    t.model.battles({ pagination: true });
  },
});
