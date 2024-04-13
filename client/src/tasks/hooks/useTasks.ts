import {useSelector, useDispatch} from 'react-redux';
import tasks from 'tasks/store';
import type {State} from 'store';

export function useTasks(list?: string) {
  if (!list) throw new Error('List is required');

  const dispatch = useDispatch();
  const complete = useSelector(($: State) => tasks.selectors.getComplete($, list));
  const active = useSelector(($: State) => tasks.selectors.getActive($, list));

  const addActive = (item: string) => dispatch(tasks.actions.add({list, item}));
  const addComplete = (item: string) => dispatch(tasks.actions.complete({list, item}));

  return {
    active,
    complete,
    addActive,
    addComplete,
  };
}
