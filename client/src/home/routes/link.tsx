import {useMemo} from 'react';
import {useLingui} from '@lingui/react/macro';
import {StyleSheet} from 'react-native-unistyles';
import {Platform, View} from 'react-native';
import {useNavigate, useParams} from 'react-exo/navigation';
import {Panel, PanelSection, PanelItem} from 'app/ui/panel';
import {IconRemote, TextInput} from 'app/ui/base';
import {useLinks} from 'home/hooks/use-links';
import {useQuery} from 'app/data';
import {getLink} from 'app/data/queries';
import {Button} from 'design';

export default function ScreenLink() {
  const {id} = useParams<{id: string}>();
  const links = useLinks();
  const linkId = useMemo(() => links.getId(id), [id]);
  const linkData = useQuery(getLink(linkId))[0];

  const update = links.update.bind(null, linkId);
  const nav = useNavigate();
  const {t} = useLingui();

  if (!linkData) {
    nav('/');
    return null;
  }

  return (
    <Panel
      title={linkData.name || t`Untitled`}
      message={t`Configure dashboard link`}
      right={
        <View style={styles.link}>
          <IconRemote
            name={linkData.icon ?? 'ph:globe'}
            size={'50%'}
            uniProps={(theme: any) => ({
              color: linkData.color ?? theme.colors.foreground,
            })}
          />
        </View>
      }>
        <View style={styles.root}>
          <PanelSection title={t`General`}>
            <PanelItem
              label={t`URL`}
              description={t`The web page to link to.`}>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                autoComplete="url"
                keyboardType="url"
                textContentType="URL"
                maxLength={1000}
                placeholder={`https://search.brave.com`}
                onChangeText={update.bind(null, 'url')}
                value={linkData.url ?? ''}
              />
            </PanelItem>
            <PanelItem
              label={t`Name`}
              description={t`The display name of the link.`}>
              <TextInput
                style={styles.input}
                maxLength={25}
                placeholder={`Brave`}
                onChangeText={update.bind(null, 'name')}
                value={linkData.name ?? ''}
              />
            </PanelItem>
          </PanelSection>
          <PanelSection title={t`Appearance`}>
            <PanelItem
              label={t`Icon`}
              description={t`The icon to display for the link.`}>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                maxLength={25}
                placeholder={`simple-icons:brave`}
                onChangeText={update.bind(null, 'icon')}
                value={linkData.icon ?? ''}
              />
            </PanelItem>
            <PanelItem
              label={t`Color`}
              description={t`The color of the link icon.`}>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                maxLength={25}
                placeholder={`#888`}
                onChangeText={update.bind(null, 'color')}
                value={linkData.color ?? ''}
              />
            </PanelItem>
          </PanelSection>
          <View style={styles.actions}>
            <Button
              label={t`Go Back`}
              mode="Secondary"
              state="Default"
              onPress={() => nav('/')}
            />
            <Button
              label={t`Delete`}
              mode="Destructive"
              state="Default"
              onPress={() => {
                links.remove(linkId);
                nav('/');
              }}
            />
          </View>
        </View>
    </Panel>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    ...Platform.select({
      ios: {
        gap: 0,
      },
      default: {
        gap: theme.display.space8,
      },
    }),
  },
  actions: {
    flexDirection: 'row',
    marginBottom: theme.display.space5,
    gap: theme.display.space4,
  },
  input: {
    padding: theme.display.space2,
    paddingHorizontal: theme.display.space3,
    color: theme.colors.foreground,
    fontSize: theme.typography.size2,
    fontWeight: theme.typography.weightLight,
    lineHeight: theme.typography.lineHeight2,
    letterSpacing: theme.typography.letterSpacing2,
    fontFamily: theme.font.family,
    backgroundColor: theme.colors.card,
    borderRadius: theme.display.radius3,
    borderColor: theme.colors.border,
    borderWidth: 1,
    width: 215,
  },
  link: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.display.radius3,
    borderColor: theme.colors.border,
    borderWidth: 1,
    overflow: 'hidden',
  },
}));
