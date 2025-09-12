import {alert} from 'react-exo/toast';
import {useLingui} from '@lingui/react/macro';
import {useEvolu} from 'app/data';
import * as $ from 'app/data/types';

export function useShortcuts() {
  const {t} = useLingui();
  const evolu = useEvolu();

  const fail = (message: string) => {
    alert({
      title: t`Shortcut Error`,
      preset: 'error',
      message,
    });
  };

  const getId = (id?: string) => {
    if (!id) {
      fail(t`Missing shortcut id.`);
      return null;
    }
    const shortcutId = $.ShortcutId.from(id);
    if (!shortcutId.ok) {
      fail(shortcutId.error.value as string ?? t`Invalid shortcut id.`);
      return null;
    }
    return shortcutId.value;
  };

  const create = () => {
    const result = evolu.insert('shortcut', {});
    if (!result.ok) {
      fail(result.error.value as string ?? t`Failed to create new shortcut.`);
      return null;
    }
    return result.value.id;
  };

  const update = (id: $.ShortcutId | null, field: 'url' | 'name' | 'icon' | 'color', value: string) => {
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

    const result = evolu.update('shortcut', {id, [field]: value});
    if (!result.ok) {
      fail(result.error.value as string ?? t`Failed to update shortcut.`);
    }
  };

  const remove = (id: $.ShortcutId | null) => {
    if (!id) return;

    const result = evolu.update('shortcut', {id, isDeleted: true});
    if (!result.ok) {
      fail(result.error.value as string ?? t`Failed to delete shortcut.`);
    }
  };

  return {
    getId,
    create,
    update,
    remove,
  };
}
