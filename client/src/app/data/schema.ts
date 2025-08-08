import * as $ from 'app/data/types';

export type ProfileId = typeof ProfileId.Type;
export const ProfileId = $.id('Profile');

export type LinkId = typeof LinkId.Type;
export const LinkId = $.id('Shortcut');

export default {
  profile: {
    id: ProfileId,
    name: $.NonEmptyString25,
  },
  link: {
    id: LinkId,
    url: $.NonEmptyString1000,
    name: $.NonEmptyString25,
    icon: $.NonEmptyString25,
    color: $.NonEmptyString25,
  },
};
