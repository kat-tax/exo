import {useFocusable, FocusContext} from '@noriginmedia/norigin-spatial-navigation';
import {useQuery} from '@evolu/react';
import {useMemo} from 'react';
import {StyleSheet} from 'react-native-unistyles';
import {ScrollView} from 'react-native';
import {ListBar} from 'media/stacks/list/bar';
import {Grid} from 'app/ui/grid';
import {Screen} from 'app/ui/screen';
import {getDevices} from 'app/data/queries';
import {getDeviceIcon} from 'app/lib/platform';
import {device} from 'app/data/lib/device';

import {DeviceLocal, DeviceEvolu} from 'media/stacks/device';

const SHOW_LOCAL_AND_EVOLU_DEVICE = true;

export default function ScreenBrowseDevices(_: ReactNavigation.ScreenProps<'MediaBrowseDevices'>) {
  const devices = useQuery(getDevices);
  const local = useMemo(() => devices.find(d => d.id === device.id), [devices]);
  const {ref, focusKey} = useFocusable();
  return (
    <Screen>
      <ListBar/>
      <FocusContext.Provider value={focusKey}>
        <ScrollView
          ref={ref}
          style={styles.root}
          contentContainerStyle={styles.list}>
          <Grid>
            <DeviceLocal
              id={device.id}
              name={device.name}
              icon={getDeviceIcon(device.platform)}
              online={true}
              storageUsed={local?.storageUsed}
              storageTotal={local?.storageTotal}
            />
            {devices.filter(d => SHOW_LOCAL_AND_EVOLU_DEVICE ? d.id !== device.id : true).map(d => (
              <DeviceEvolu
                key={d.id}
                id={d.id}
                name={d.name}
                icon={getDeviceIcon(d.platform)}
                online={Boolean(d.online)}
                storageUsed={d.storageUsed}
                storageTotal={d.storageTotal}
              />
            ))}
          </Grid>
        </ScrollView>
      </FocusContext.Provider>
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
}));
