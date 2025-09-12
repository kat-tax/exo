import _ from 'app/lib/evolu.db';
import * as $ from 'app/data/types';

/**
 * Query the latest profile.
 */
export const getProfile = _.createQuery(db => db
  .selectFrom('profile')
  .orderBy('createdAt', 'desc')
  .selectAll()
  .limit(1)
);

/**
 * Query all shortcuts, ordered by earliest created.
 */
export const getShortcuts = _.createQuery(db => db
  .selectFrom('shortcut')
  .orderBy('createdAt', 'asc')
  .where('isDeleted', 'is not', 1)
  .selectAll()
);

/**
 * Query a shortcut by id.
 */
export const getShortcut = (
  id: $.ShortcutId | null,
) => _.createQuery(db => db
  .selectFrom('shortcut')
  .where('id', '=', id)
  .where('isDeleted', 'is not', 1)
  .selectAll()
  .limit(1)
);

/**
 * Query all lists, ordered by earliest created.
 */
export const getLists = _.createQuery(db => db
  .selectFrom('list')
  .orderBy('createdAt', 'asc')
  .where('isDeleted', 'is not', 1)
  .selectAll()
);

/**
 * Query a list by id.
 */
export const getList = (
  id: $.ListId | null,
) => _.createQuery(db => db
  .selectFrom('list')
  .where('id', '=', id)
  .where('isDeleted', 'is not', 1)
  .selectAll()
  .limit(1)
);

/**
 * Query all items for a list, optionally filtered by category.
 */
export const getListItems = (
  listId: $.ListId | null,
  categoryId: $.ListCategoryId | null = null,
) => _.createQuery(db => db
  .selectFrom('listItem')
  .where('listId', '=', listId)
  .where('categoryId', categoryId ? '=' : 'is', categoryId)
  .where('isDeleted', 'is not', 1)
  .orderBy('createdAt', 'asc')
  .selectAll()
);

/**
 * Query the total and completed counts for a list.
 */
export const getListCounts = (
  id: $.ListId | null,
) => _.createQuery(db => db
  .selectFrom('listItem')
  .where('listId', '=', id)
  .where('isDeleted', 'is not', 1)
  .select((eb) => [
    eb.fn.countAll<number>()
      .as('total'),
    eb.fn.count<number>(eb.case().when('isCompleted', '=', 1).then(1).end())
      .as('completed')
  ])
);

/**
 * Query all categories for a list.
 */
export const getListCategories = (
  id: $.ListId | null,
) => _.createQuery(db => db
  .selectFrom('listCategory')
  .where('listId', '=', id)
  .where('isDeleted', 'is not', 1)
  .orderBy('createdAt', 'asc')
  .selectAll()
);
