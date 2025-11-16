import * as $ from './types';

export default {
  // General
  profile: {
    id: $.ProfileId,
    name: $.NonEmptyString25,
  },
  device: {
    id: $.DeviceId,
    name: $.NonEmptyString255,
    ownerId: $.ProfileId,
  },
  location: {
    id: $.LocationId,
    deviceId: $.DeviceId,
    latitude: $.FiniteNumber,
    longitude: $.FiniteNumber,
  },
  // Dashboard
  shortcut: {
    id: $.ShortcutId,
    url: $.nullOr($.NonEmptyString1000),
    name: $.nullOr($.NonEmptyString25),
    icon: $.nullOr($.NonEmptyString25),
    color: $.nullOr($.NonEmptyString25),
  },
  // Media
  path: {
    id: $.PathId,
    name: $.NonEmptyString255,
    deviceId: $.DeviceId,
    parentId: $.PathId,
    fileId: $.nullOr($.FileId),
  },
  file: {
    id: $.FileId,
    size: $.PositiveNumber,
    mime: $.NonEmptyString255,
    thumb: $.nullOr($.Uint8Array),
  },
  transfer: {
    id: $.TransferId,
    fileId: $.FileId,
    status: $.union('active', 'completed', 'failed'),
    lastError: $.nullOr($.NonEmptyString1000),
    recipientId: $.DeviceId,
  },
  // World
  list: {
    id: $.ListId,
    name: $.nullOr($.NonEmptyString25),
    icon: $.nullOr($.NonEmptyString25),
    color: $.nullOr($.NonEmptyString25),
  },
  listItem: {
    id: $.ListItemId,
    listId: $.ListId,
    categoryId: $.nullOr($.ListCategoryId),
    textContent: $.String1000,
    isCompleted: $.SqliteBoolean,
  },
  listCategory: {
    id: $.ListCategoryId,
    name: $.NonEmptyString50,
    listId: $.ListId,
  },
};
