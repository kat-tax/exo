import {useQuery} from '@evolu/react';
import {useLinkProps} from '@react-navigation/native';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {getDevices} from 'app/data/queries';
import {GridCell} from 'app/ui/grid';
import {Grid} from 'app/ui/grid';
import {Screen} from 'app/ui/screen';
import {ListBar} from 'media/stacks/list/bar';
import {Icon} from 'react-exo/icon';
import {DeviceId} from 'app/data/types';

export default function ScreenBrowseDevices(_: ReactNavigation.ScreenProps<'MediaBrowseDevices'>) {
  const devices = useQuery(getDevices);

  return (
    <Screen>
      <ListBar/>
      <ScrollView
        style={styles.root}
        contentContainerStyle={styles.list}>
        <Grid>
          <GridCell focusKey="device-local">
            <DeviceLocal
              name="Local"
              icon="ph:desktop-tower"
              online={true}
            />
          </GridCell>
          {devices.map((device) => (
            <GridCell focusKey={`device-${device.id}`}>
              <DeviceEvolu
                name={device.name ?? ''}
                icon="ph:hard-drives"
                online={Boolean(device.online)}
                deviceId={device.id}
              />
            </GridCell>
          ))}
        </Grid>
      </ScrollView>
    </Screen>
  );
}

function DeviceLocal(props: Omit<DeviceCardProps, 'onPress'>) {
  const link = useLinkProps({
    screen: 'MediaBrowseLocal',
    params: {},
  });
  return (
    <DeviceCard
      {...props}
      onPress={link.onPress}
    />
  );
}

function DeviceEvolu({deviceId, ...props}: Omit<DeviceCardProps, 'onPress'> & {deviceId: DeviceId}) {
  const link = useLinkProps({
    screen: 'MediaBrowseEvolu',
    params: {deviceId},
  });
  return (
    <DeviceCard
      {...props}
      onPress={link.onPress}
    />
  );
}

interface DeviceCardProps {
  name: string,
  icon: string,
  online: boolean,
  onPress: () => void,
}

function DeviceCard(props: DeviceCardProps) {
  return (
    <Pressable onPress={props.onPress} style={styles.device}>
      <View style={styles.header}>
        <View style={styles.identity}>
          <Icon
            name={props.icon}
            size={20}
            uniProps={(theme) => ({
              color: theme.colors.mutedForeground,
            })}
          />
          <Text style={styles.deviceName} numberOfLines={1}>
            {props.name}
          </Text>
        </View>
      </View>
      <View style={styles.status}>
        <View style={[styles.statusDot, props.online && styles.statusDotOnline]}/>
        <Text style={styles.statusText}>
          {props.online ? 'online' : 'offline'}
        </Text>
      </View>
    </Pressable>
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
  device: {
    flex: 1,
    aspectRatio: 1,
    flexDirection: 'column',
    backgroundColor: theme.colors.secondary,
    borderRadius: theme.display.radius3,
    borderColor: theme.colors.border,
    borderWidth: 1,
    padding: theme.display.space3,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 24,
  },
  identity: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.display.space2,
    flex: 1,
    marginRight: theme.display.space2,
  },
  deviceName: {
    color: theme.colors.foreground,
    fontFamily: theme.font.family,
    fontSize: theme.typography.size3,
    fontWeight: theme.typography.weightBold,
    letterSpacing: theme.font.headerSpacing,
    flex: 1,
  },
  status: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    height: 8,
    width: 8,
    marginTop: 3,
    minWidth: 8,
    minHeight: 8,
    borderRadius: 9999,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.ring,
  },
  statusDotOnline: {
    borderColor: theme.palette.green600,
    backgroundColor: theme.colors.success,
  },
  statusText: {
    color: theme.colors.mutedForeground,
    fontSize: theme.font.size,
    fontWeight: theme.font.headerWeight,
    letterSpacing: theme.font.spacing,
    lineHeight: theme.font.height,
    fontVariant: ['small-caps']
  },
}));
