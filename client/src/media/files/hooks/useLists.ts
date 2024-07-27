import {useSelector} from 'react-redux';
import store from 'media/files/store';

export function useLists() {
  return useSelector(store.selectors.getLists);
}
