import * as $ from 'app/data/types';

export default {
  profile: {
    id: $.ProfileId,
    name: $.NonEmptyString25,
  },
  shortcut: {
    id: $.ShortcutId,
    url: $.nullOr($.NonEmptyString1000),
    name: $.nullOr($.NonEmptyString25),
    icon: $.nullOr($.NonEmptyString25),
    color: $.nullOr($.NonEmptyString25),
  },
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
