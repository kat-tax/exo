import _ from 'app/lib/evolu.db';
import * as $ from 'app/data/types';

export const getProfile = _.createQuery(db => db
  .selectFrom('profile')
  .selectAll()
  .limit(1)
);

export const getLinks = _.createQuery(db => db
  .selectFrom('link')
  .orderBy('createdAt', 'asc')
  .where('isDeleted', 'is not', 1)
  .selectAll()
);

export const getLink = (id: $.LinkId) => _.createQuery(db => db
  .selectFrom('link')
  .where('id', '=', id)
  .where('isDeleted', 'is not', 1)
  .selectAll()
  .limit(1)
);
