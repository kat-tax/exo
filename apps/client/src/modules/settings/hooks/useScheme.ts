import {useColorScheme} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getScheme} from 'modules/settings/store/selectors';
import settings from 'modules/settings/store';

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
