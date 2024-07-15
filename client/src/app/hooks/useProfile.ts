import {useQuery} from '@evolu/react-native';
import {profile} from 'app/data';

export function useProfile() {
  const {row} = useQuery(profile);
  return row;
}
