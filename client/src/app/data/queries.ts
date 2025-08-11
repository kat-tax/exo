import _ from 'app/lib/evolu.db';
import * as $ from 'app/data/types';

export const getProfile = _.createQuery(db => db
  .selectFrom('profile')
  .selectAll()
  .limit(1)
);

export const getShortcuts = _.createQuery(db => db
  .selectFrom('shortcut')
  .orderBy('createdAt', 'asc')
  .where('isDeleted', 'is not', 1)
  .selectAll()
);

export const getShortcut = (id: $.ShortcutId | null) => _.createQuery(db => db
  .selectFrom('shortcut')
  .where('id', '=', id)
  .where('isDeleted', 'is not', 1)
  .selectAll()
  .limit(1)
);

export const getLists = _.createQuery(db => db
  .selectFrom('list')
  .orderBy('createdAt', 'asc')
  .where('isDeleted', 'is not', 1)
  .selectAll()
);

export const getList = (id: $.ListId | null) => _.createQuery(db => db
  .selectFrom('list')
  .where('id', '=', id)
  .where('isDeleted', 'is not', 1)
  .selectAll()
  .limit(1)
);

export const getListItems = (id: $.ListId) => _.createQuery(db => db
  .selectFrom('listItem')
  .where('listId', '=', id)
  .where('isDeleted', 'is not', 1)
  .orderBy('createdAt', 'asc')
  .selectAll()
);
