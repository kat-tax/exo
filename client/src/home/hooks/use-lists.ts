import {alert} from 'react-exo/toast';
import {useLingui} from '@lingui/react/macro';
import {useEvolu} from 'app/data';
import * as $ from 'app/data/types';

export function useLists() {
  const {t} = useLingui();
  const evolu = useEvolu();

  const fail = (message: string) => {
    alert({
      title: t`List Error`,
      preset: 'error',
      message,
    });
  };

  const getId = (id?: string) => {
    if (!id) {
      fail(t`Missing list id.`);
      return null;
    }
    const listId = $.ListId.from(id);
    if (!listId.ok) {
      fail(listId.error.value as string ?? t`Invalid list id.`);
      return null;
    }
    return listId.value;
  };

  const create = () => {
    const result = evolu.insert('list', {});
    if (!result.ok) {
      fail(result.error.value as string ?? t`Failed to create new list.`);
      return null;
    }
    return result.value.id;
  };

  const update = (id: $.ListId | null, field: 'name' | 'icon' | 'color', value: string) => {
    if (!id) return;

    let valid = true;
    let error = '';
    switch (field) {
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

    const result = evolu.update('list', {id, [field]: value});
    if (!result.ok) {
      fail(result.error.value as string ?? t`Failed to update list.`);
    }
  };

  const remove = (id: $.ListId | null) => {
    if (!id) return;

    const result = evolu.update('list', {id, isDeleted: true});
    if (!result.ok) {
      fail(result.error.value as string ?? t`Failed to delete list.`);
    }
  };

  return {
    getId,
    create,
    update,
    remove,
  };
}
