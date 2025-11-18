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

/** Query hierachy of paths (recurse up parentIds) */
export const getPathHierarchy = (deviceId: $.DeviceId | null, pathId: $.PathId | null) => _.createQuery(db => db
  .withRecursive('path_hierarchy', (qb) =>
    qb.selectFrom('media_path')
      .where('id', pathId ? '=' : 'is', pathId)
      .where('deviceId', '=', deviceId)
      .where('isDeleted', 'is not', 1)
      .select(['id', 'name', 'parentId'])
      .unionAll(
        qb.selectFrom('media_path')
          .innerJoin('path_hierarchy', 'media_path.id', 'path_hierarchy.parentId')
          .where('media_path.deviceId', '=', deviceId)
          .where('media_path.isDeleted', 'is not', 1)
          .select(['media_path.id', 'media_path.name', 'media_path.parentId'])
      )
  )
  .selectFrom('path_hierarchy')
  .select(['id', 'name'])
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
 * Query a path by id
 */
export const getPathById = (deviceId: $.DeviceId, pathId: $.PathId | null) => _.createQuery(db => db
  .selectFrom('media_path')
  .where('id', pathId ? '=' : 'is', pathId)
  .where('deviceId', '=', deviceId)
  .where('isDeleted', 'is not', 1)
  .selectAll()
  .limit(1)
);

/**
 * Query folder contents (subfolders and files)
 * Pass null for folderId to get top-level items
 */
export const getPathList = (deviceId: $.DeviceId, pathId: $.PathId | null) =>
  _.createQuery(db => db
    .selectFrom('media_path')
    .leftJoin('media_file', 'media_path.fileId', 'media_file.id')
    .select([
      'media_path.id',
      'media_path.name',
      'media_path.parentId',
      'media_path.deviceId',
      'media_path.fileId',
      'media_path.createdAt',
      'media_path.updatedAt',
      'media_file.thumb',
      'media_file.size',
      'media_file.mime',
    ])
    .where('media_path.deviceId', '=', deviceId)
    .where('media_path.parentId', pathId ? '=' : 'is', pathId)
    .where('media_path.isDeleted', 'is not', 1)
    .orderBy((eb) => eb.case()
      .when('media_path.fileId', 'is', null)
      .then(0).else(1).end(), 'asc')
    .orderBy('media_path.name', 'asc')
  );

/**
 * Query transfers for a file.
 */
export const getTransfersByFile = (fileId: $.FileId) =>
  _.createQuery(db => db
    .selectFrom('media_transfer')
    .selectAll()
    .where('fileId', '=', fileId)
    .where('isDeleted', 'is not', 1)
    .orderBy('createdAt', 'desc')
  );

/**
 * Query all devices
 */
export const getDevices = _.createQuery(db => db
  .selectFrom('app_device')
  .where('isDeleted', 'is not', 1)
  .selectAll()
  .orderBy('createdAt', 'asc')
);

/**
 * Query a device by id
 */
export const getDevice = (id: $.DeviceId | null) => _.createQuery(db => db
  .selectFrom('app_device')
  .where('id', '=', id)
  .where('isDeleted', 'is not', 1)
  .selectAll()
  .limit(1)
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
