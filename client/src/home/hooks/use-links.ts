import {alert} from 'react-exo/toast';
import {useLingui} from '@lingui/react/macro';
import {useEvolu} from 'app/data';
import * as $ from 'app/data/types';

export function useLinks() {
  const {t} = useLingui();
  const evolu = useEvolu();

  const fail = (message: string) => {
    alert({
      title: t`Link Error`,
      preset: 'error',
      message,
    });
  };

  const getId = (id?: string) => {
    if (!id) {
      fail(t`Link ID is required.`);
      return null;
    }
    const linkId = $.LinkId.from(id);
    if (!linkId.ok) {
      fail(linkId.error.value as string ?? t`Invalid link ID.`);
      return null;
    }
    return linkId.value;
  };

  const create = () => {
    const result = evolu.insert('link', {});
    if (!result.ok) {
      fail(result.error.value as string ?? t`Failed to create new link.`);
      return null;
    }
    return result.value.id;
  };

  const update = (id: $.LinkId | null, field: 'url' | 'name' | 'icon' | 'color', value: string) => {
    if (!id) return;

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
      fail(error);
      return;
    }

    const result = evolu.update('link', {id, [field]: value});
    if (!result.ok) {
      fail(result.error.value as string ?? t`Failed to update link.`);
    }
  };

  const remove = (id: $.LinkId | null) => {
    if (!id) return;

    const result = evolu.update('link', {id, isDeleted: true});
    if (!result.ok) {
      fail(result.error.value as string ?? t`Failed to delete link.`);
    }
  };

  return {
    getId,
    create,
    update,
    remove,
  };
}
