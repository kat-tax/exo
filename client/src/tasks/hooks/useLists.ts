import {useSelector} from 'react-redux';
import store from 'tasks/store';

export function useLists() {
  return useSelector(store.selectors.getLists);
}
