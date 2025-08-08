import {useState} from 'react';
import {useLingui} from '@lingui/react/macro';
import {useNavigate} from 'react-exo/navigation';
import {StyleSheet} from 'react-native-unistyles';
import {Platform, View} from 'react-native';
import {Panel, PanelSection, PanelItem} from 'app/ui/panel';
import {IconRemote, TextInput} from 'app/ui/base';
import {useLinks} from 'home/hooks/use-links';
import {Button} from 'design';

export default function ScreenNewLink() {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [icon, setIcon] = useState('');
  const [color, setColor] = useState('');
  const savedDisabled = !url.trim() || !name.trim() || !icon.trim() || !color.trim();

  const {t} = useLingui();
  const nav = useNavigate();
  const {createLink} = useLinks();

  const handleSave = () => {
    if (!url.trim() || !name.trim() || !icon.trim() || !color.trim()) {
      return;
    }

    const success = createLink({
      url: url.trim(),
      name: name.trim(),
      icon: icon.trim(),
      color: color.trim(),
    });

    if (success) {
      nav('/');
    }
  };

  return (
    <Panel
      title={name || t`Untitled`}
      message={t`Configure dashboard link`}
      right={
        <View style={styles.link}>
          <IconRemote
            name={icon || 'simple-icons:brave'}
            color={color || '#888'}
            size={'50%'}
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
                selectTextOnFocus
                autoCapitalize="none"
                autoComplete="url"
                keyboardType="url"
                textContentType="URL"
                maxLength={1000}
                placeholder={`https://search.brave.com`}
                onChangeText={setUrl}
                value={url}
              />
            </PanelItem>
            <PanelItem
              label={t`Name`}
              description={t`The display name of the link.`}>
              <TextInput
                style={styles.input}
                selectTextOnFocus
                maxLength={25}
                placeholder={`Brave`}
                onChangeText={setName}
                value={name}
              />
            </PanelItem>
          </PanelSection>
          <PanelSection title={t`Appearance`}>
            <PanelItem
              label={t`Icon`}
              description={t`The icon to display for the link.`}>
              <TextInput
                style={styles.input}
                selectTextOnFocus
                autoCapitalize="none"
                maxLength={25}
                placeholder={`simple-icons:brave`}
                onChangeText={setIcon}
                value={icon}
              />
            </PanelItem>
            <PanelItem
              label={t`Color`}
              description={t`The color of the link icon.`}>
              <TextInput
                style={styles.input}
                selectTextOnFocus
                autoCapitalize="none"
                maxLength={25}
                placeholder={`#888`}
                onChangeText={setColor}
                value={color}
              />
            </PanelItem>
          </PanelSection>
          <View style={styles.actions}>
            <Button
              label={t`Cancel`}
              mode="Secondary"
              state="Default"
              onPress={() => nav('/')}
            />
            <Button
              label={t`Save Link`}
              mode="Primary"
              state={savedDisabled ? 'Disabled' : 'Default'}
              disabled={savedDisabled}
              onPress={handleSave}
            />
          </View>
        </View>
    </Panel>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    paddingBottom: theme.display.space9,
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
    gap: theme.display.space4,
    flexDirection: 'row',
    marginTop: theme.display.space3,
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
