import {useSelector} from 'react-redux';
import {getLists} from 'mod/tasks/store/selectors';

export function useLists() {
  return useSelector(getLists);
}
