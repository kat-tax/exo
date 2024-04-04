import {useSelector, useDispatch} from 'react-redux';
import {getActive, getComplete} from 'tasks/store/selectors';
import tasks from 'tasks/store';

export function useTasks(list?: string) {
  if (!list) throw new Error('List is required');
  const active = useSelector(getActive(list));
  const complete = useSelector(getComplete(list));
  const dispatch = useDispatch();
  const addActive = (item: string) => dispatch(tasks.actions.add({list, item}));
  const addComplete = (item: string) => dispatch(tasks.actions.complete({list, item}));
  return {active, complete, addActive, addComplete};
}
