import { schema } from 'nexus';

schema.objectType({
  name: 'Battle',
  definition(t) {
    t.model.id();
    t.model.description();
    t.model.userId();
  },
});
