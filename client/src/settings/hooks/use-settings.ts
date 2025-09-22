import {alert} from 'react-exo/toast';
import {useLingui} from '@lingui/react/macro';
import {useCallback} from 'react';
import {useEvolu, useAppOwner, useQuery} from 'app/data';
import {getProfile} from 'app/data/queries';
import * as $ from 'app/data/types';

export function useSettings() {
  const {t} = useLingui();
  const evolu = useEvolu();
  const owner = useAppOwner();
  const profiles = useQuery(getProfile);

  const updateName = useCallback((text: string) => {
    try {
      const name = $.getOrThrow($.NonEmptyString25.from(text));
      if (profiles.length === 0) {
        evolu.insert('profile', {name});
      } else {
        evolu.update('profile', {name, id: profiles[0].id});
      }
    } catch (error) {
      alert({
        title: t`Error`,
        preset: 'error',
        message: t`Invalid name (max 25 characters).`,
      });
    }
  }, [evolu, profiles, t]);

  const resetOwner = useCallback(() => {
    evolu.resetAppOwner();
  }, [evolu, t]);

  const changeOwner = useCallback((key: string) => {
    if (!key || key === owner?.mnemonic)
      return;
    if (typeof window !== 'undefined' && !window.confirm(t`Are you sure you want to change the owner key? This will reset the local database. This action cannot be undone.`))
      return;
    try {
      const parsed = $.getOrThrow($.Mnemonic.from(key));
      evolu.restoreAppOwner(parsed, {reload: true});
    } catch (error) {
      alert({
        title: t`Error`,
        preset: 'error',
        message: t`Invalid owner key.`,
      });
    }
  }, [owner, evolu, t]);

  return {
    name: profiles[0]?.name ?? '',
    owner,
    resetOwner,
    changeOwner,
    updateName,
  };
}
