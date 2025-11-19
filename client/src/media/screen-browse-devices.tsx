import {Link} from '@react-navigation/native';
import {useQuery} from '@evolu/react';
import {ScrollView} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {getDevices} from 'app/data/queries';
import {Screen} from 'app/ui/screen';
import {ListBar} from 'media/stacks/list/bar';
import {Panel} from 'design';

export default function ScreenBrowseDevices(_: ReactNavigation.ScreenProps<'MediaBrowseDevices'>) {
  const devices = useQuery(getDevices);
  return (
    <Screen>
      <ListBar/>
      <ScrollView
        style={styles.root}
        contentContainerStyle={styles.list}>
        <Link
          style={styles.link}
          screen="MediaBrowseLocal"
          params={{}}>
          <Panel
            style={styles.panel}
            header="Local"
            message=""
          />
        </Link>
        {devices.map((device) => (
          <Link
            key={device.id}
            style={styles.link}
            screen="MediaBrowseEvolu"
            params={{deviceId: device.id}}>
            <Panel
              style={styles.panel}
              header={device.name ?? 'Unknown'}
              message=""
            />
          </Link>
        ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
  },
  list: {
    gap: theme.display.space2,
    padding: theme.display.space2,
  },
  link: {
    flex: 1,
  },
  panel: {
    width: '100%',
  },
}));
