import {t} from '@lingui/macro';
import {alert} from 'react-exo/toast';
import {useLingui} from '@lingui/react';
import {useEvolu, useOwner, useQuery, parseMnemonic, NonEmptyString1000} from '@evolu/react-native';
import {Effect, Either, Function} from 'effect';
import {profile} from 'app/data';
import * as S from '@effect/schema/Schema';

import {Database, NonEmptyString50} from 'app/data/schema';

export function useSettings() {
  const evolu = useEvolu<Database>();
  const owner = useOwner();
  const {row} = useQuery(profile);
  const {i18n} = useLingui();

  const updateName = (text: string) => {
    if (!row?.id) return;
    Either.match(S.decodeUnknownEither(NonEmptyString50)(text), {
      onLeft: Function.constVoid,
      onRight: (name) => evolu.update('profile', {name, id: row.id}),
    });
  };

  const updateGroqKey = (text: string) => {
    if (!row?.id) return;
    Either.match(S.decodeUnknownEither(NonEmptyString1000)(text), {
      onLeft: Function.constVoid,
      onRight: (groqKey) => evolu.update('profile', {groqKey, id: row.id}),
    });
  };

  const updateGroqModel = (text: string) => {
    if (!row?.id) return;
    Either.match(S.decodeUnknownEither(NonEmptyString50)(text), {
      onLeft: Function.constVoid,
      onRight: (groqModel) => evolu.update('profile', {groqModel, id: row.id}),
    });
  };

  const resetPrompts = () => {
    if (!window.confirm(t(i18n)`Are you sure you want to reset your prompt history?`)) return;
    // dispatch(home.actions.clearPrompts());
    alert({
      title: t(i18n)`Prompt History Reset`,
      message: t(i18n)`Your prompt history has been reset.`,
      preset: 'done',
    });
  };

  const resetOwner = () => {
    if (!window.confirm(t(i18n)`Are you sure you want to reset your local database? If data is not backed up on another device, it will be lost. This action cannot be undone.`)) return;
    evolu.resetOwner();
  };

  const changeOwner = (key: string) => {
    if (!key || key === owner?.mnemonic) return;
    if (!window.confirm(t(i18n)`Are you sure you want to change the owner key? This will reset the local database. This action cannot be undone.`)) return;
    Effect.runPromise(parseMnemonic(key))
      .then(parsed => evolu.restoreOwner(parsed, {reload: true}))
      .catch(error => alert(error));
  };

  return {
    owner,
    profile: row,
    updateName,
    updateGroqKey,
    updateGroqModel,
    resetPrompts,
    resetOwner,
    changeOwner,
  };
}
