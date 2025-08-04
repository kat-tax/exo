import * as $ from '@evolu/common';
export * from '@evolu/common';

// Primary Ids
export type ProfileId = typeof ProfileId.Type;
export const ProfileId = $.id('Profile');

export type ShortcutId = typeof ShortcutId.Type;
export const ShortcutId = $.id('Shortcut');

// Data Types
export type NonEmptyString25 = typeof NonEmptyString25.Type;
export const NonEmptyString25 = $.maxLength(25)($.String);

export type NonEmptyString50 = typeof NonEmptyString50.Type;
export const NonEmptyString50 = $.maxLength(50)($.String);
