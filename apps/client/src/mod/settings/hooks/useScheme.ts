import {useSelector, useDispatch} from 'react-redux';
import {useColorScheme} from 'react-native';
import {getScheme} from 'mod/settings/store/selectors';
import settings from 'mod/settings/store';

import type {ColorSchemeName} from 'react-native';

export function useScheme(storedOnly?: boolean): [ColorSchemeName, (scheme: ColorSchemeName) => void] {
  const scheme = useColorScheme();
  const stored = useSelector(getScheme);
  const dispatch = useDispatch();

  const setScheme = (newScheme: ColorSchemeName) =>
    dispatch(settings.actions.setScheme(newScheme));

  return (stored || storedOnly)
    ? [stored, setScheme]
    : [scheme, setScheme];
}
