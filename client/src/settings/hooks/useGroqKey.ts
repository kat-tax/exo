import {useSelector, useDispatch} from 'react-redux';
import settings from 'settings/store';

export function useGroqKey(): [string, (key: string) => void] {
  const dispatch = useDispatch();
  const value = useSelector(settings.selectors.getGroqKey) || '';
  const setter = (key: string) =>
    dispatch(settings.actions.setGroqKey(key));

  return [value, setter];
}
