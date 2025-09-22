import {Icon} from 'react-exo/icon';
import {Trans} from '@lingui/react';
import {Linking, Text, View} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {useSettings} from 'settings/hooks/use-settings';
import {useNavigate} from 'react-exo/navigation';
import {useClock} from 'home/hooks/use-clock';
import {greetMsg} from 'home/utils/time';
import {Panel} from 'app/ui/panel';
import {Grid} from 'app/ui/grid';
import {GridCell} from 'app/ui/grid';
import {useQuery} from 'app/data';
import {getShortcuts} from 'app/data/queries';
import {useShortcuts} from 'home/hooks/use-shortcuts';
import {useTheme} from 'settings/hooks/use-theme';
import cfg from 'config';
import {Chart} from 'app/ui/chart/Chart';

export default function ScreenDashboard() {
  const shortcuts = useShortcuts();
  const settings = useSettings();
  const [theme] = useTheme();
  const clock = useClock();
  const data = useQuery(getShortcuts);
  const nav = useNavigate();

  return (
    <Panel
      title={cfg.APP_NAME}
      message={<Trans {...greetMsg(settings.name || 'Human')}/>}
      right={
        <Text style={styles.clock}>
          {clock}
        </Text>
      }>
      <Chart theme={theme} option={{
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line',
          },
        ],
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
        },
      }}/>
      <Chart theme={theme} option={{
        series: [
          {
            type: 'pie',
            data: [
              {
                value: 335,
                name: 'Direct'
              },
              {
                value: 234,
                name: 'Index'
              },
              {
                value: 1548,
                name: 'Social'
              }
            ]
          }
        ]
      }}/>
      <Grid>
        {data?.filter(shortcut => shortcut.url)?.map(({id, url, icon, color}) => (
          <GridCell
            key={id}
            focusKey={`shortcut-${id}`}
            onPress={() => url && Linking.openURL(url)}
            onEditSelect={() => nav(`/shortcut/${id}`)}>
            <View style={[styles.shortcut, !url && styles.shortcutAdd]}>
              <Icon.Remote
                name={icon ?? ''}
                size={'50%'}
                uniProps={(theme) => ({
                  color: color ?? theme.colors.foreground,
                })}
              />
            </View>
          </GridCell>
        ))}
        <GridCell
          focusKey="shortcut-add"
          onPress={() => {
            const id = data?.find(shortcut => !shortcut.url)?.id ?? shortcuts.create();
            if (id) nav(`/shortcut/${id}`);
          }}>
          <View style={[styles.shortcut, styles.shortcutAdd]}>
            <Icon
              name="ph:plus"
              size={32}
              uniProps={(theme) => ({
                color: theme.colors.mutedForeground,
              })}
            />
          </View>
        </GridCell>
      </Grid>
    </Panel>
  );
}

const styles = StyleSheet.create((theme) => ({
  clock: {
    color: theme.colors.foreground,
    letterSpacing: theme.font.headerSpacing,
    fontWeight: theme.typography.weightThin,
    fontFamily: theme.font.family,
    fontSize: {
      initial: theme.typography.size7,
      xxs: theme.typography.size8,
      md: theme.typography.size9,
    },
  },
  shortcut: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.display.radius3,
    borderColor: theme.colors.border,
    borderWidth: 1,
    overflow: 'hidden',
  },
  shortcutAdd: {
    backgroundColor: theme.colors.accent,
  },
}));
