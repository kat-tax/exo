import * as $ from 'app/data/types';

export type ProfileId = typeof ProfileId.Type;
export const ProfileId = $.id('Profile');

export type ShortcutId = typeof ShortcutId.Type;
export const ShortcutId = $.id('Shortcut');

export default {
  profile: {
    id: ProfileId,
    name: $.NonEmptyString25,
  },
  shortcut: {
    id: ShortcutId,
    url: $.NonEmptyString1000,
    name: $.NonEmptyString50,
  },
};
