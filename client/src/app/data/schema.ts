import * as $ from './types';

export default {
  shortcut: {
    id: $.ShortcutId,
    url: $.NonEmptyString1000,
    name: $.NonEmptyString50,
    image: $.nullOr($.Uint8Array),
  },
};
