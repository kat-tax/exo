import {useSelector} from 'react-redux';
import {getLists} from 'tasks/store/selectors';

export function useLists() {
  return useSelector(getLists);
}
