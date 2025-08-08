import {alert} from 'react-exo/toast';
import {useLingui} from '@lingui/react/macro';
import {useCallback} from 'react';
import {useEvolu} from 'app/data';
import * as $ from 'app/data/types';

export function useLinks() {
  const {t} = useLingui();
  const evolu = useEvolu();

  const createLink = useCallback((data: {
    url: string;
    name: string;
    icon: string;
    color: string;
  }) => {
    try {
      // TODO: do specific validation
      evolu.insert('link', {
        url: $.getOrThrow($.NonEmptyString1000.from(data.url)),
        name: $.getOrThrow($.NonEmptyString25.from(data.name)),
        icon: $.getOrThrow($.NonEmptyString25.from(data.icon)),
        color: $.getOrThrow($.NonEmptyString25.from(data.color)),
      });
      alert({
        title: t`Success`,
        preset: 'done',
        message: t`Link created successfully.`,
      });
      return true;
    } catch (error) {
      alert({
        title: t`Error`,
        preset: 'error',
        message: t`Invalid link data. Please check all fields.`,
      });
      return false;
    }
  }, [evolu, t]);

  const deleteLink = useCallback((id: string) => {
    try {
      evolu.update('link', {id, isDeleted: true});
    } catch (error) {
      alert({
        title: t`Error`,
        preset: 'error',
        message: t`Failed to delete link.`,
      });
    }
  }, [evolu, t]);

  return {
    createLink,
    deleteLink,
  };
}
