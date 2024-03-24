import {useSelector} from 'react-redux';
import {getLists} from 'modules/tasks/store/selectors';

export function useLists() {
  return useSelector(getLists);
}
