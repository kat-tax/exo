import * as $ from 'app/data/types';

export default {
  profile: {
    id: $.ProfileId,
    name: $.NonEmptyString25,
  },
  link: {
    id: $.LinkId,
    url: $.nullOr($.NonEmptyString1000),
    name: $.nullOr($.NonEmptyString25),
    icon: $.nullOr($.NonEmptyString25),
    color: $.nullOr($.NonEmptyString25),
  },
};
