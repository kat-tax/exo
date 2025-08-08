import {Trans} from '@lingui/react';
import {Linking, Text, View} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {useSettings} from 'settings/hooks/use-settings';
import {useNavigate} from 'react-exo/navigation';
import {useClock} from 'home/hooks/use-clock';
import {greetMsg} from 'home/utils/time';
import {Icon, IconRemote} from 'app/ui/base';
import {Panel} from 'app/ui/panel';
import {Grid} from 'app/ui/grid';
import {GridCell} from 'app/ui/grid';
import cfg from 'config';

export default function ScreenHome() {
  const navigate = useNavigate();
  const settings = useSettings();
  const clock = useClock();

  const links: Array<{
    id: string;
    url: string;
    name: string;
    icon: string;
    color: string;
  }> = [
    {
      id: '1',
      url: 'https://search.brave.com',
      name: 'Brave',
      icon: 'simple-icons:brave',
      color: '#3b82f6',
    },
    {
      id: '2',
      url: 'https://github.com/trending',
      name: 'GitHub',
      icon: 'simple-icons:github',
      color: '#999999',
    },
    {
      id: '3',
      url: 'https://news.ycombinator.com/news',
      name: 'Hacker News',
      icon: 'simple-icons:ycombinator',
      color: '#ff6600',
    },
  ];

  return (
    <Panel
      title={cfg.APP_NAME}
      message={<Trans {...greetMsg(settings.name)}/>}
      right={
        <Text style={styles.clock}>
          {clock}
        </Text>
      }>
      <Grid>
        {links.map((link) => (
          <GridCell
            key={link.id}
            focusKey={`link-${link.id}`}
            onSelect={() => Linking.openURL(link.url)}>
            <View style={styles.link}>
              <IconRemote
                name={link.icon}
                color={link.color}
                size={'50%'}
              />
            </View>
          </GridCell>
        ))}
        <GridCell
          focusKey="link-add"
          onSelect={() => navigate('/settings')}>
          <View style={[styles.link, styles.linkAdd]}>
            <Icon name="ph:plus" size={32} uniProps={
              (theme: any) => ({
                color: theme.colors.mutedForeground,
              })
            }/>
          </View>
        </GridCell>
      </Grid>
    </Panel>
  );
}

const styles = StyleSheet.create((theme) => ({
  clock: {
    fontFamily: theme.font.family,
    fontSize: theme.typography.size7,
    fontWeight: theme.typography.weightThin,
    letterSpacing: theme.font.headerSpacing,
    color: theme.colors.foreground,
  },
  link: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.display.radius3,
    borderColor: theme.colors.border,
    borderWidth: 1,
    overflow: 'hidden',
  },
  linkAdd: {
    backgroundColor: theme.colors.accent,
  },
}));
