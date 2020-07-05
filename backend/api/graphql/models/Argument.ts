import { schema } from 'nexus';

schema.objectType({
  name: 'Argument',
  definition(t) {
    t.model.id();
    t.model.text();
    t.model.comments({ pagination: true });
  },
});
