import * as _ from '@evolu/common';
export * from '@evolu/common';

// Custom Types

export type String50 = typeof String50.Type;
export const String50 = _.maxLength(50)(_.String);

// Primary Ids

export type ProfileId = typeof ProfileId.Type;
export const ProfileId = _.id('Profile');

// DB Schema

export default {
  profiles: {
    id: ProfileId,
    name: String50,
  },
};
