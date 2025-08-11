import * as $ from '@evolu/common';
export * from '@evolu/common';

export type ProfileId = typeof ProfileId.Type;
export const ProfileId = $.id('Profile');

export type ShortcutId = typeof ShortcutId.Type;
export const ShortcutId = $.id('Shortcut');

export type ListId = typeof ListId.Type;
export const ListId = $.id('List');

export type ListItemId = typeof ListItemId.Type;
export const ListItemId = $.id('ListItem');

export type NonEmptyString25 = typeof NonEmptyString25.Type;
export const NonEmptyString25 = $.maxLength(25)($.String);

export type NonEmptyString50 = typeof NonEmptyString50.Type;
export const NonEmptyString50 = $.maxLength(50)($.String);
