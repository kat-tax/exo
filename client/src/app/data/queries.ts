import _ from './provider/evolu';

export const shortcutsAll = _.createQuery(db => db
  .selectFrom('shortcut')
  .orderBy('createdAt', 'desc')
  .where('isDeleted', 'is', 0)
  .selectAll()
);
