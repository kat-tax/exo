import {Trans} from '@lingui/react';
import {Linking, Pressable, Text, View} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {useSettings} from 'settings/hooks/use-settings';
import {useNavigate} from 'react-exo/navigation';
import {useClock} from 'home/hooks/use-clock';
import {greetMsg} from 'home/utils/time';
import {Icon, IconRemote} from 'app/ui/base';
import {Panel} from 'app/ui/panel';
import {Grid} from 'app/ui/grid';
import {GridCell} from 'app/ui/grid';
import {useQuery} from 'app/data';
import {getLinks} from 'app/data/queries';
import {useLinks} from 'home/hooks/use-links';
import cfg from 'config';

export default function ScreenHome() {
  const settings = useSettings();
  const clock = useClock();
  const links = useLinks();
  const data = useQuery(getLinks);
  const nav = useNavigate();

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
        {data.map(({id, url, icon, color}) => (
          <GridCell
            key={id}
            focusKey={`link-${id}`}
            onSelect={() => url && Linking.openURL(url)}>
            <View style={styles.link}>
              <IconRemote
                name={icon ?? ''}
                color={color ?? ''}
                size={'50%'}
              />
              <Pressable
                style={styles.editButton}
                onPress={() => nav(`/new-link`, {state: {id}})}>
                <Icon
                  name="ph:pencil-simple"
                  size={16}
                  uniProps={(theme: any) => ({
                    color: theme.colors.mutedForeground,
                  })}
                />
              </Pressable>
            </View>
          </GridCell>
        ))}
        <GridCell
          focusKey="link-add"
          onSelect={() => {
            const id = links.create();
            if (id) nav(`/new-link`, {state: {id}});
          }}>
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
  editButton: {
    position: 'absolute',
    top: theme.display.space1,
    right: theme.display.space1,
    padding: theme.display.space1,
    borderRadius: theme.display.radius2,
    backgroundColor: theme.colors.background,
    opacity: 0.9,
  },
}));
