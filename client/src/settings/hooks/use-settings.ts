import {use} from 'react';
import {alert} from 'react-exo/toast';
import {useLingui} from '@lingui/react/macro';
import {useCallback} from 'react';
import {useEvolu, useQuery} from 'app/data';
import {getProfile} from 'app/data/queries';
import cfg from 'config';
import * as $ from 'app/data/types';

export function useSettings() {
  const {t} = useLingui();
  const evolu = useEvolu();
  const owner = use(evolu.appOwner);
  const profiles = useQuery(getProfile);

  const updateName = useCallback((text: string) => {
    try {
      const name = $.getOrThrow($.NonEmptyString25.from(text));
      if (profiles.length === 0) {
        evolu.insert('app_profile', {name});
      } else {
        evolu.update('app_profile', {name, id: profiles[0].id});
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
    globalThis.__EVOLU_RESETTING_APP_OWNER__ = true;
    evolu.resetAppOwner();
  }, [evolu, t]);

  const changeOwner = useCallback((key: string) => {
    if (!key || key === owner?.mnemonic)
      return;
    if (typeof window !== 'undefined' && !window.confirm(t`Are you sure you want to change the owner key? This will reset the local database. This action cannot be undone.`))
      return;
    try {
      const parsed = $.getOrThrow($.Mnemonic.from(key));
      globalThis.__EVOLU_RESETTING_APP_OWNER__ = true;
      evolu.restoreAppOwner(parsed, {reload: true});
    } catch (error) {
      alert({
        title: t`Error`,
        preset: 'error',
        message: t`Invalid owner key.`,
      });
    }
  }, [owner, evolu, t]);

  const downloadDatabase = useCallback(async () => {
    const database = await evolu.exportDatabase();
    const blob = new Blob([database], {type: 'application/x-sqlite3'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.download = `${cfg.APP_NAME}.sqlite3`;
    a.href = url;
    a.click();
  }, [evolu]);

  return {
    name: profiles[0]?.name ?? '',
    owner,
    updateName,
    resetOwner,
    changeOwner,
    downloadDatabase,
  };
}
