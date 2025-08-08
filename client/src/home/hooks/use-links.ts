import {alert} from 'react-exo/toast';
import {useLingui} from '@lingui/react/macro';
import {useCallback} from 'react';
import {useEvolu} from 'app/data';
import * as $ from 'app/data/types';

export function useLinks() {
  const {t} = useLingui();
  const evolu = useEvolu();

  const sendError = useCallback((message: string) => {
    alert({
      title: t`Error`,
      preset: 'error',
      message,
    });
  }, [t]);

  const update = useCallback((id: string, field: 'url' | 'name' | 'icon' | 'color', value: string) => {
    const link = $.LinkId.from(id);

    // Validate link ID
    if (!link.ok) {
      sendError(link.error.value as string ?? t`Invalid link ID.`);
      return;
    }

    // Validate fields
    let valid = true;
    let error = '';
    switch (field) {
      case 'url': {
        const field = $.NonEmptyString1000.from(value);
        if (!field.ok) {
          valid = false;
          error = field.error.value as string ?? t`Invalid URL field.`;
        }
        break;
      }
      case 'name': {
        const field = $.NonEmptyString25.from(value);
        if (!field.ok) {
          valid = false;
          error = field.error.value as string ?? t`Invalid name field.`;
        }
        break;
      }
      case 'icon': {
        const field = $.NonEmptyString25.from(value);
        if (!field.ok) {
          valid = false;
          error = field.error.value as string ?? t`Invalid icon field.`;
        }
        break;
      }
      case 'color': {
        const field = $.NonEmptyString25.from(value);
        if (!field.ok) {
          valid = false;
          error = field.error.value as string ?? t`Invalid color field.`;
        }
        break;
      }
      default: field satisfies never;
    }
    if (!valid) {
      sendError(error);
      return;
    }

    // Update link
    const result = evolu.update('link', {id, [field]: value});
    if (!result.ok) {
      sendError(result.error.value as string ?? t`Failed to update link.`);
    }
  }, [evolu, t]);

  const create = useCallback(() => {
    const result = evolu.insert('link', {});
    if (!result.ok) {
      sendError(result.error.value as string ?? t`Failed to create new link.`);
      return null;
    }
    return result.value.id;
  }, [evolu, t]);

  const remove = useCallback((id: string) => {
    const result = evolu.update('link', {id, isDeleted: true});
    if (!result.ok) {
      sendError(result.error.value as string ?? t`Failed to delete link.`);
    }
  }, [evolu, t]);

  return {
    create,
    update,
    remove,
  };
}
