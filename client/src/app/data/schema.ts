import * as $ from './types';

export default {
  app_device: {
    id: $.DeviceId,
    name: $.nullOr($.NonEmptyString255),
    online: $.nullOr($.SqliteBoolean),
  },
  app_profile: {
    id: $.ProfileId,
    name: $.NonEmptyString25,
  },
  app_location: {
    id: $.LocationId,
    deviceId: $.DeviceId,
    latitude: $.FiniteNumber,
    longitude: $.FiniteNumber,
  },
  app_shortcut: {
    id: $.ShortcutId,
    url: $.nullOr($.NonEmptyString1000),
    name: $.nullOr($.NonEmptyString25),
    icon: $.nullOr($.NonEmptyString25),
    color: $.nullOr($.NonEmptyString25),
  },
  media_path: {
    id: $.PathId,
    name: $.NonEmptyString255,
    deviceId: $.DeviceId,
    parentId: $.nullOr($.PathId),
    fileId: $.nullOr($.FileId),
  },
  media_file: {
    id: $.FileId,
    size: $.PositiveNumber,
    mime: $.NonEmptyString255,
    thumb: $.nullOr($.Uint8Array),
  },
  media_transfer: {
    id: $.TransferId,
    fileId: $.FileId,
    status: $.union('active', 'completed', 'failed'),
    lastError: $.nullOr($.NonEmptyString1000),
    recipientId: $.DeviceId,
  },
  world_list: {
    id: $.ListId,
    name: $.nullOr($.NonEmptyString25),
    icon: $.nullOr($.NonEmptyString25),
    color: $.nullOr($.NonEmptyString25),
  },
  world_listItem: {
    id: $.ListItemId,
    listId: $.ListId,
    categoryId: $.nullOr($.ListCategoryId),
    textContent: $.String1000,
    isCompleted: $.SqliteBoolean,
  },
  world_listCategory: {
    id: $.ListCategoryId,
    name: $.NonEmptyString50,
    listId: $.ListId,
  },
};
