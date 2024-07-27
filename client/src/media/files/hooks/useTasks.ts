import {useSelector, useDispatch} from 'react-redux';
import files from 'media/files/store';
import type {State} from 'app/store';

export function useTasks(list?: string) {
  if (!list) throw new Error('List is required');

  const dispatch = useDispatch();

  return {
    active: useSelector((state: State) =>
      files.selectors.getActive(state, list)),

    complete: useSelector((state: State) =>
      files.selectors.getComplete(state, list)),

    addActive: (item: string) =>
      dispatch(files.actions.add({list, item})),

    addComplete: (item: string) =>
      dispatch(files.actions.complete({list, item})),
  };
}
