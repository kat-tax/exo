import {useSelector, useDispatch} from 'react-redux';
import tasks from 'tasks/store';
import type {State} from 'app/store';

export function useTasks(list?: string) {
  if (!list) throw new Error('List is required');

  const dispatch = useDispatch();

  return {
    active: useSelector((state: State) =>
      tasks.selectors.getActive(state, list)),

    complete: useSelector((state: State) =>
      tasks.selectors.getComplete(state, list)),

    addActive: (item: string) =>
      dispatch(tasks.actions.add({list, item})),

    addComplete: (item: string) =>
      dispatch(tasks.actions.complete({list, item})),
  };
}
