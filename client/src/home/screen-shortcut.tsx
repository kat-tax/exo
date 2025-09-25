import {useMemo} from 'react';
import {useLingui} from '@lingui/react/macro';
import {Platform, View} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {TextInput} from 'react-exo/textinput';
import {Icon} from 'react-exo/icon';
import {Panel, PanelSection, PanelItem} from 'app/ui/panel';
import {useShortcuts} from 'home/hooks/use-shortcuts';
import {getShortcut} from 'app/data/queries';
import {useQuery} from 'app/data';
import {Button} from 'design';

export default function ScreenShortcutEdit({route, navigation}: ReactNavigation.ScreenProps<'HomeShortcut'>) {
  const {id} = route.params;
  const shortcuts = useShortcuts();
  const shortcutId = useMemo(() => shortcuts.getId(id), [id]);
  const shortcutData = useQuery(getShortcut(shortcutId))[0];

  const update = shortcuts.update.bind(null, shortcutId);
  const {t} = useLingui();

  if (!shortcutData) {
    navigation.navigate('HomeDashboard');
    return null;
  }

  return (
    <Panel
      title={shortcutData.name || t`Untitled`}
      message={t`Configure dashboard shortcut`}
      back="HomeDashboard"
      right={
        <View style={styles.icon}>
          <Icon.Remote
            name={shortcutData.icon ?? 'ph:globe'}
            size={'50%'}
            uniProps={(theme) => ({
              color: shortcutData.color ?? theme.colors.foreground,
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
                value={shortcutData.url ?? ''}
              />
            </PanelItem>
            <PanelItem
              label={t`Name`}
              description={t`The display name of the shortcut.`}>
              <TextInput
                style={styles.input}
                maxLength={25}
                placeholder={`Brave`}
                onChangeText={update.bind(null, 'name')}
                value={shortcutData.name ?? ''}
              />
            </PanelItem>
          </PanelSection>
          <PanelSection title={t`Appearance`}>
            <PanelItem
              label={t`Icon`}
              description={t`The icon to display for the shortcut.`}>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                maxLength={25}
                placeholder={`simple-icons:brave`}
                onChangeText={update.bind(null, 'icon')}
                value={shortcutData.icon ?? ''}
              />
            </PanelItem>
            <PanelItem
              label={t`Color`}
              description={t`The color of the shortcut icon.`}>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                maxLength={25}
                placeholder={`#888`}
                onChangeText={update.bind(null, 'color')}
                value={shortcutData.color ?? ''}
              />
            </PanelItem>
          </PanelSection>
          <PanelSection title={t`Danger Zone`}>
            <PanelItem
              label={t`Delete Shortcut`}
              description={t`Permanently delete shortcut.`}>
              <Button
                label={t`Delete Shortcut`}
                mode="Destructive"
                state="Default"
                onPress={() => {
                  shortcuts.remove(shortcutId);
                  navigation.navigate('HomeDashboard');
                }}
              />
            </PanelItem>
          </PanelSection>
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
  icon: {
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
  input: {
    width: {
      initial: '100%',
      xxs: 120,
      sm: 215,
    },
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
  },
}));
