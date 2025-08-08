import _ from 'app/data/provider/evolu';

export const getProfile = _.createQuery(db => db
  .selectFrom('profile')
  .selectAll()
  .limit(1)
);

export const getShortcuts = _.createQuery(db => db
  .selectFrom('shortcut')
  .orderBy('createdAt', 'desc')
  .where('isDeleted', 'is', 0)
  .selectAll()
);
