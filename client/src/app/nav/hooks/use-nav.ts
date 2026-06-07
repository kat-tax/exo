import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';

export function useNav() {
  return useNavigation<NativeStackNavigationProp<ReactNavigation.RootParamList>>();
}
