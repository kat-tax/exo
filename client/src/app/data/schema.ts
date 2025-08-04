import * as $ from './types';

export default {
  profile: {
    id: $.ProfileId,
    name: $.NonEmptyString25,
  },
  shortcut: {
    id: $.ShortcutId,
    url: $.NonEmptyString1000,
    name: $.NonEmptyString50,
    image: $.nullOr($.Uint8Array),
  },
};
