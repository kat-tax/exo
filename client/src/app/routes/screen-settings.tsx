import {useState} from 'react';
import {useLingui} from '@lingui/react/macro';
import {StyleSheet} from 'react-native-unistyles';
import {View, Platform} from 'react-native';
import {Panel, PanelItem, PanelSection} from 'app/stacks/panel';
import {Picker, TextInput} from 'app/stacks/base';
import {Identicon} from 'app/stacks/identicon';
import {useSettings} from 'app/hooks/use-settings';
import {useLocale} from 'app/hooks/use-locale';
import {useTheme} from 'app/hooks/use-theme';
import {locales} from 'config/locales';

export default function ScreenSettings() {
  const [scheme, setScheme] = useTheme(true);
  const [locale, setLocale] = useLocale(true);
  const [showKey, setShowKey] = useState(false);
  const settings = useSettings();
  const {t} = useLingui();

  return (
    <Panel
      title={t`Settings`}
      message={t`Manage your settings`}
      right={
        <Identicon
          id={settings.owner?.id}
          width={64}
          height={64}
        />
      }>
      <View style={styles.root}>
        <PanelSection title={t`Profile`}>
          <PanelItem
            label={t`Display Name`}
            description={t`Your name to display in the app.`}>
            <TextInput
              style={styles.input}
              maxLength={25}
              defaultValue={settings.name}
              onChangeText={settings.updateName}
              placeholder={t`Enter name`}
            />
          </PanelItem>
          <PanelItem
            label={t`Owner Key`}
            description={t`The mnemonic phrase for your database.`}>
            <TextInput
              style={styles.input}
              selectTextOnFocus
              secureTextEntry={!showKey}
              defaultValue={settings.owner?.mnemonic?.toString() ?? ''}
              placeholder={t`Enter mnemonic`}
              importantForAutofill="no"
              autoCapitalize="none"
              autoComplete="off"
              spellCheck={false}
              passwordRules="none"
              autoCorrect={false}
              onFocus={() => setShowKey(true)}
              onBlur={e => {
                setShowKey(false);
                settings.changeOwner(e.nativeEvent.text);
              }}
            />
          </PanelItem>
        </PanelSection>
        <PanelSection title={t`Display`}>
          <PanelItem
            label={t`Language`}
            description={t`Select the language for the app.`}>
            <Picker
              style={styles.select}
              itemStyle={styles.selectItem}
              selectedValue={locale}
              onValueChange={setLocale}>
              <Picker.Item label={t`System`} value=""/>
              {Object.entries(locales).map(([value, label]) => (
                <Picker.Item
                  key={value}
                  value={value}
                  label={label}
                />
              ))}
            </Picker>
          </PanelItem>
          <PanelItem
            label={t`Theme`}
            description={t`Select the theme for the app.`}>
            <Picker
              style={styles.select}
              itemStyle={styles.selectItem}
              selectedValue={scheme}
              onValueChange={setScheme}>
              <Picker.Item label={t`System`} value=""/>
              <Picker.Item label={t`Light`} value="light"/>
              <Picker.Item label={t`Dark`} value="dark"/>
            </Picker>
          </PanelItem>
        </PanelSection>
      </View>
    </Panel>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    marginTop: theme.display.space5,
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
  select: {
    ...Platform.select({
      ios: {
        width: '100%',
      },
      android: {
        minWidth: 200,
      },
      default: {
        padding: theme.display.space2,
        color: theme.colors.foreground,
        fontSize: theme.typography.size2,
        fontWeight: theme.typography.weightLight,
        lineHeight: theme.typography.lineHeight2,
        letterSpacing: theme.typography.letterSpacing2,
        fontFamily: theme.font.family,
        backgroundColor: theme.colors.card,
        boxShadow: `0px 0px 0px 1px ${theme.colors.border}`,
        borderRadius: theme.display.radius3,
        borderColor: 'transparent',
        borderWidth: 1,
        minWidth: 120,
        borderRight: 'inset 8px transparent',
      },
    }),
  },
  selectItem: {
    color: theme.colors.foreground,
  },
}));
