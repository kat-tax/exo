import _ from './lib/evolu.db';
import * as $ from './types';

/**
 * Query the latest profile.
 */
export const getProfile = _.createQuery(db => db
  .selectFrom('app_profile')
  .orderBy('createdAt', 'desc')
  .selectAll()
  .limit(1)
);

/**
 * Query all shortcuts, ordered by earliest created.
 */
export const getShortcuts = _.createQuery(db => db
  .selectFrom('app_shortcut')
  .orderBy('createdAt', 'asc')
  .where('isDeleted', 'is not', 1)
  .selectAll()
);

/**
 * Query all files
 */
export const getFiles = _.createQuery(db => db
  .selectFrom('media_file')
  .select(['id', 'size', 'mime', 'thumb'])
  .where('isDeleted', 'is not', 1),
);

/**
 * Query all paths for a device
 */
export const getPathsForDevice = (deviceId: $.DeviceId) => _.createQuery(db => db
  .selectFrom('media_path')
  .select(['id', 'name', 'parentId', 'fileId'])
  .where('deviceId', '=', deviceId)
  .where('isDeleted', 'is not', 1),
);

/**
 * Query folder contents (subfolders and files)
 * Pass null for folderId to get top-level items
 */
export const folderContentsQuery = (folderId: $.PathId | null) =>
  _.createQuery(db => db
    .selectFrom('media_path')
    .leftJoin('media_file', 'media_path.fileId', 'media_file.id')
    .select([
      'media_path.id',
      'media_path.name',
      'media_path.parentId',
      'media_path.deviceId',
      'media_path.fileId',
      'media_file.size',
      'media_file.mime',
    ])
    .where('media_path.parentId', folderId ? '=' : 'is', folderId)
    .where('media_path.isDeleted', 'is not', 1)
    .orderBy('media_path.createdAt', 'desc')
  );

/**
 * Query transfers for a file.
 */
export const transfersForFileQuery = (fileId: $.FileId) =>
  _.createQuery(db => db
    .selectFrom('media_transfer')
    .selectAll()
    .where('fileId', '=', fileId)
    .where('isDeleted', 'is not', 1)
    .orderBy('createdAt', 'desc')
  );

/**
 * Query a shortcut by id.
 */
export const getShortcut = (
  id: $.ShortcutId | null,
) => _.createQuery(db => db
  .selectFrom('app_shortcut')
  .where('id', '=', id)
  .where('isDeleted', 'is not', 1)
  .selectAll()
  .limit(1)
);

/**
 * Query all lists, ordered by earliest created.
 */
export const getLists = _.createQuery(db => db
  .selectFrom('world_list')
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
  .selectFrom('world_list')
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
  .selectFrom('world_listItem')
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
  .selectFrom('world_listItem')
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
  .selectFrom('world_listCategory')
  .where('listId', '=', id)
  .where('isDeleted', 'is not', 1)
  .orderBy('createdAt', 'asc')
  .selectAll()
);
