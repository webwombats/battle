import { schema } from 'nexus';

schema.objectType({
  name: 'Comment',
  definition(t) {
    t.model.id();
    t.model.text();
  },
});
