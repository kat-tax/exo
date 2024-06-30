import {useSelector, useDispatch} from 'react-redux';
import settings from 'settings/store';

export function useDisplayName(): [string, (name: string) => void] {
  const dispatch = useDispatch();
  const value = useSelector(settings.selectors.getDisplayName) || '';
  const setter = (name: string) =>
    dispatch(settings.actions.setDisplayName(name));

  return [value, setter];
}
