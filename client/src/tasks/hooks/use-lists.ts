import {alert} from 'react-exo/toast';
import {useLingui} from '@lingui/react/macro';
import {useEvolu} from 'app/data';
import {getListItems} from 'app/data/queries';
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
      fail(t`Failed to create new list.`);
      return null;
    }
    return result.value.id;
  };

  const remove = (id: $.ListId | null) => {
    if (!id) return;

    const result = evolu.update('list', {id, isDeleted: true});
    if (!result.ok) {
      fail(t`Failed to delete list.`);
    }
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
          error = t`Invalid name field.`;
        }
        break;
      }
      case 'icon': {
        const field = $.NonEmptyString25.from(value);
        if (!field.ok) {
          valid = false;
          error = t`Invalid icon field.`;
        }
        break;
      }
      case 'color': {
        const field = $.NonEmptyString25.from(value);
        if (!field.ok) {
          valid = false;
          error = t`Invalid color field.`;
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
      fail(t`Failed to update list.`);
    }
  };

  const createItem = (listId: $.ListId | null, categoryId: $.ListCategoryId | null, value: string) => {
    if (!listId) return;

    const field = $.NonEmptyString1000.from(value);
    if (!field.ok) {
      fail(t`Invalid text content field.`);
      return;
    }

    const result = evolu.insert('listItem', {listId, categoryId, textContent: field.value, isCompleted: false});
    if (!result.ok) {
      fail(t`Failed to create list item.`);
    }
  };

  const removeItem = (id: $.ListItemId) => {
    const result = evolu.update('listItem', {id, isDeleted: true});
    if (!result.ok) {
      fail(t`Failed to delete list item.`);
    }
  };

  const updateItemText = (id: $.ListItemId, value: string) => {
    const field = $.String1000.from(value);
    if (!field.ok) {
      fail(t`Invalid text content field.`);
      return;
    }
    const result = evolu.update('listItem', {id, textContent: field.value});
    if (!result.ok) {
      fail(t`Failed to update list item text.`);
    }
  };

  const updateItemStatus = (id: $.ListItemId, value: boolean) => {
    const result = evolu.update('listItem', {id, isCompleted: value});
    if (!result.ok) {
      fail(t`Failed to update list item status.`);
    }
  };

  const createCategory = (listId: $.ListId | null, value: string) => {
    if (!listId) return null;

    const field = $.NonEmptyString50.from(value);
    if (!field.ok) {
      fail(t`Invalid category name.`);
      return null;
    }

    const result = evolu.insert('listCategory', {listId, name: field.value});
    if (!result.ok) {
      fail(t`Failed to create category.`);
      return null;
    }
    return result.value.id;
  };

  const removeCategory = (listId: $.ListId | null, categoryId: $.ListCategoryId) => {
    if (!listId) return;

    // Clear items from category.
    evolu.loadQuery(getListItems(listId, categoryId)).then(items => {
      items.forEach(item => {
        evolu.update('listItem', {id: item.id, categoryId: null});
      });
    });

    // Delete category.
    const result = evolu.update('listCategory', {id: categoryId, isDeleted: true});
    if (!result.ok) {
      fail(t`Failed to delete category.`);
    }
  };

  const updateCategory = (id: $.ListCategoryId, value: string) => {
    const field = $.NonEmptyString50.from(value);
    if (!field.ok) {
      fail(t`Invalid category name.`);
      return;
    }

    const result = evolu.update('listCategory', {id, name: field.value});
    if (!result.ok) {
      fail(t`Failed to update category.`);
    }
  };

  return {
    getId,
    create,
    remove,
    update,
    createItem,
    removeItem,
    updateItemText,
    updateItemStatus,
    createCategory,
    removeCategory,
    updateCategory,
  };
}
