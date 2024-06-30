import {useSelector, useDispatch} from 'react-redux';
import settings from 'settings/store';

export function useGroqModel(): [string, (key: string) => void] {
  const dispatch = useDispatch();
  const value = useSelector(settings.selectors.getGroqModel) || '';
  const setter = (key: string) =>
    dispatch(settings.actions.setGroqModel(key));

  return [value, setter];
}
