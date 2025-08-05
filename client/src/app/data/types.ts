import * as $ from '@evolu/common';
export * from '@evolu/common';

export type NonEmptyString25 = typeof NonEmptyString25.Type;
export const NonEmptyString25 = $.maxLength(25)($.String);

export type NonEmptyString50 = typeof NonEmptyString50.Type;
export const NonEmptyString50 = $.maxLength(50)($.String);
