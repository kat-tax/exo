import * as $ from '@evolu/common';
export * from '@evolu/common';

/** Identifiers */

export type ProfileId = typeof ProfileId.Type;
export const ProfileId = $.id('Profile');

export type DeviceId = typeof DeviceId.Type;
export const DeviceId = $.id('Device');

export type LocationId = typeof LocationId.Type;
export const LocationId = $.id('Location');

export type ShortcutId = typeof ShortcutId.Type;
export const ShortcutId = $.id('Shortcut')

export type PathId = typeof PathId.Type;
export const PathId = $.id('Path');

export type FileId = typeof FileId.Type;
export const FileId = $.id('File');

export type TransferId = typeof TransferId.Type;
export const TransferId = $.id('Transfer');

export type ListId = typeof ListId.Type;
export const ListId = $.id('List');

export type ListItemId = typeof ListItemId.Type;
export const ListItemId = $.id('ListItem');

export type ListCategoryId = typeof ListCategoryId.Type;
export const ListCategoryId = $.id('ListCategory');

/** Strings */

export type NonEmptyString25 = typeof NonEmptyString25.Type;
export const NonEmptyString25 = $.maxLength(25)($.String);

export type NonEmptyString50 = typeof NonEmptyString50.Type;
export const NonEmptyString50 = $.maxLength(50)($.String);

export type NonEmptyString255 = typeof NonEmptyString255.Type;
export const NonEmptyString255 = $.maxLength(255)($.String);
