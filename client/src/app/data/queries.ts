import _ from 'app/lib/evolu.db';

export const getProfile = _.createQuery(db => db
  .selectFrom('profile')
  .selectAll()
  .limit(1)
);

export const getLinks = _.createQuery(db => db
  .selectFrom('link')
  .orderBy('createdAt', 'desc')
  .where('isDeleted', 'is', 0)
  .selectAll()
);
