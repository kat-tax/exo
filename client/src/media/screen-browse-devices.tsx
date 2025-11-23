import {Icon} from 'react-exo/icon';
import {bytesize} from 'react-exo/fs';
import {StyleSheet} from 'react-native-unistyles';
import {ScrollView, Text, View} from 'react-native';
import {useLinkProps} from '@react-navigation/native';
import {useQuery} from '@evolu/react';
import {useMemo} from 'react';
import {ListBar} from 'media/stacks/list/bar';
import {GridCell} from 'app/ui/grid';
import {Grid} from 'app/ui/grid';
import {Screen} from 'app/ui/screen';
import {DeviceId} from 'app/data/types';
import {getDevices} from 'app/data/queries';
import {getDeviceIcon} from 'app/lib/platform';
import {device} from 'app/data/lib/device';

const SHOW_LOCAL_AND_EVOLU_DEVICE = true;

export default function ScreenBrowseDevices(_: ReactNavigation.ScreenProps<'MediaBrowseDevices'>) {
  const devices = useQuery(getDevices);
  const local = useMemo(() => devices.find(d => d.id === device.id), [devices]);
  return (
    <Screen>
      <ListBar/>
      <ScrollView
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
      isLocal={true}
      onPress={link.onPress}
    />
  );
}

function DeviceEvolu(props: Omit<DeviceCardProps, 'onPress'>) {
  const link = useLinkProps({
    screen: 'MediaBrowseEvolu',
    params: {deviceId: props.id},
  });
  return (
    <DeviceCard
      {...props}
      onPress={link.onPress}
    />
  );
}

interface DeviceCardProps {
  id: DeviceId,
  name: string | null,
  icon: string,
  online: boolean,
  isLocal?: boolean,
  storageUsed?: number | null,
  storageTotal?: number | null,
  onPress: () => void,
}

function DeviceCard(props: DeviceCardProps) {
  return (
    <GridCell
      focusKey={`device-${props.id}:${props.name}`}
      onPress={props.onPress}>
      <View style={styles.device}>
        <View style={styles.identity}>
          <Icon
            name={props.icon}
            size={16}
            uniProps={(theme) => ({
              color: theme.colors.mutedForeground,
            })}
          />
          <Text style={styles.deviceName} numberOfLines={1}>
            {props.name}
          </Text>
        </View>
        {props.storageUsed && props.storageTotal && (
          <View style={styles.storageDisplay}>
            <Text numberOfLines={1} style={styles.storageUsed}>
              {bytesize(props.storageUsed)}
            </Text>
            <Text numberOfLines={1} style={styles.storageTotal}>
              / {bytesize(props.storageTotal)}
            </Text>
          </View>
        )}
        <View style={styles.footer}>
          <View style={[styles.badge, props.isLocal && styles.badgeVisible]}>
            <Text style={styles.badgeText}>local</Text>
          </View>
          <View style={styles.status}>
            <View style={[styles.statusDot, props.online && styles.statusDotOnline]}/>
            <Text style={styles.statusText}>
              {props.online ? 'online' : 'offline'}
            </Text>
          </View>
        </View>
      </View>
    </GridCell>
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    aspectRatio: 1,
    padding: theme.display.space3,
    borderWidth: 1,
    borderRadius: theme.display.radius3,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.secondary,
  },
  identity: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.display.space2,
    marginRight: theme.display.space2,
  },
  deviceName: {
    flex: 1,
    color: theme.colors.foreground,
    fontSize: theme.font.contentSize,
    fontFamily: theme.font.family,
    fontWeight: theme.typography.weightBold,
    letterSpacing: theme.font.contentSpacing,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badge: {
    opacity: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 3,
    paddingHorizontal: theme.display.space2,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.display.radius2,
  },
  badgeVisible: {
    opacity: 0.5,
  },
  badgeText: {
    color: theme.colors.primaryForeground,
    fontSize: theme.font.size,
    fontVariant: ['small-caps'],
    fontWeight: theme.font.headerWeight,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    height: 8,
    width: 8,
    minWidth: 8,
    minHeight: 8,
    marginTop: 3,
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
    fontVariant: ['small-caps'],
    fontWeight: theme.font.headerWeight,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
  },
  storageDisplay: {
    flex: 1,
    opacity: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storageUsed: {
    color: theme.colors.foreground,
    fontSize: 24,
    fontFamily: theme.font.family,
    fontWeight: theme.typography.weightBold,
    lineHeight: 32,
    textAlign: 'center',
  },
  storageTotal: {
    color: theme.colors.mutedForeground,
    fontSize: 16,
    fontFamily: theme.font.family,
    lineHeight: 20,
    textAlign: 'center',
  },
}));
