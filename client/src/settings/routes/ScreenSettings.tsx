import {View, TextInput, Platform} from 'react-native';
import {Trans, t} from '@lingui/macro';
import {Picker} from 'react-exo/picker';
import {useState} from 'react';
import {useLingui} from '@lingui/react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useSettings} from 'settings/hooks/useSettings';
import {useScheme} from 'settings/hooks/useScheme';
import {useLocale} from 'settings/hooks/useLocale';
import {SettingsGroup} from 'settings/base/SettingsGroup';
import {SettingsOption} from 'settings/base/SettingsOption';
import {Identicon} from 'app/widgets/Identicon';
import {Page} from 'app/base/Page';
import {Button} from 'design';
import {locales} from 'config/locales';

export default function ScreenSettings() {
  const settings = useSettings();
  const {i18n} = useLingui();
  const {styles, theme} = useStyles(stylesheet);
  const [locale, setLocale] = useLocale(true);
  const [scheme, setScheme] = useScheme(true);
  const [isKeyVisible, setKeyVisible] = useState(false);

  return (
    <Page
      title={<Trans>Settings</Trans>}
      message={<Trans>Manage your settings</Trans>}
      widget={
        <Identicon
          id={settings.owner?.id}
          width={48}
          height={48}
        />
      }>
      <View style={styles.root}>
        <SettingsGroup title={t(i18n)`Profile`}>
          <SettingsOption
            label={t(i18n)`User Name`}
            description={t(i18n)`Your name to display in the app.`}>
            <TextInput
              style={styles.input}
              maxLength={50}
              defaultValue={settings.profile?.name?.toString()}
              onChangeText={settings.updateName}
              placeholder={t(i18n)`Enter your name`}
              placeholderTextColor={theme.colors.mutedForeground}
            />
          </SettingsOption>
          <SettingsOption
            label={t(i18n)`Owner Key`}
            description={t(i18n)`A mnemonic phrase for authentication.`}>
            <View style={styles.ownerKey}>
              <TextInput
                style={styles.input}
                selectTextOnFocus
                secureTextEntry={!isKeyVisible}
                defaultValue={settings.owner?.mnemonic}
                placeholder={t(i18n)`Enter your mnemonic phrase`}
                placeholderTextColor={theme.colors.mutedForeground}
                importantForAutofill="no"
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect={false}
                onFocus={() => setKeyVisible(true)}
                onBlur={e => {
                  setKeyVisible(false);
                  settings.changeOwner(e.nativeEvent.text);
                }}
              />
            </View>
          </SettingsOption>
        </SettingsGroup>
        <SettingsGroup title={t(i18n)`Display`}>
          <SettingsOption
            label={t(i18n)`Language`}
            description={t(i18n)`Select the language for the app.`}>
            <Picker
              style={styles.select}
              itemStyle={styles.selectItem}
              dropdownIconColor={theme.colors.foreground}
              selectedValue={locale}
              onValueChange={setLocale}>
              <Picker.Item label={t(i18n)`Auto`} value="" color={theme.colors.foreground}/>
              {Object.entries(locales).map(([value, label]) => (
                <Picker.Item
                  key={value}
                  value={value}
                  label={label}
                  color={theme.colors.foreground}
                />
              ))}
            </Picker>
          </SettingsOption>
          <SettingsOption
            label={t(i18n)`Theme`}
            description={t(i18n)`Select the theme for the app.`}>
            <Picker
              style={styles.select}
              itemStyle={styles.selectItem}
              dropdownIconColor={theme.colors.foreground}
              selectedValue={scheme}
              onValueChange={setScheme}>
              <Picker.Item label={t`Auto`} value="" color={theme.colors.foreground}/>
              <Picker.Item label={t`Light`} value="light" color={theme.colors.foreground}/>
              <Picker.Item label={t`Dark`} value="dark" color={theme.colors.foreground}/>
            </Picker>
          </SettingsOption>
          <SettingsOption
            label={t(i18n)`Temperature`}
            description={t(i18n)`Select the temperature unit for the app.`}>
            <Picker
              style={styles.select}
              itemStyle={styles.selectItem}
              dropdownIconColor={theme.colors.foreground}
              selectedValue={undefined}
              onValueChange={undefined}>
              <Picker.Item label={t(i18n)`Celsius`} value="c" color={theme.colors.foreground}/>
              <Picker.Item label={t(i18n)`Fahrenheit`} value="f" color={theme.colors.foreground}/>
            </Picker>
          </SettingsOption>
          <SettingsOption
            label={t(i18n)`Distance`}
            description={t(i18n)`Select the distance unit for the app.`}>
            <Picker
              style={styles.select}
              itemStyle={styles.selectItem}
              dropdownIconColor={theme.colors.foreground}
              selectedValue={undefined}
              onValueChange={undefined}>
              <Picker.Item label={t(i18n)`Kilometers`} value="km" color={theme.colors.foreground}/>
              <Picker.Item label={t(i18n)`Miles`} value="mi" color={theme.colors.foreground}/>
            </Picker>
          </SettingsOption>
        </SettingsGroup>
        <SettingsGroup title={t(i18n)`AI`}>
          <SettingsOption
            label={t(i18n)`Groq API Key`}
            description={t(i18n)`Provide a key to use AI features.`}>
            <TextInput
              style={styles.input}
              selectTextOnFocus
              placeholder={t(i18n)`Enter api key`}
              defaultValue={settings.profile?.groqKey?.toString()}
              placeholderTextColor={theme.colors.mutedForeground}
              onBlur={e => settings.updateGroqKey(e.nativeEvent.text)}
            />
          </SettingsOption>
          <SettingsOption
            label={t(i18n)`Groq Model ID`}
            description={t(i18n)`Select the AI model to use.`}>
            <Picker
              style={styles.select}
              itemStyle={styles.selectItem}
              dropdownIconColor={theme.colors.foreground}
              selectedValue={settings.profile?.groqModel?.toString()}
              onValueChange={settings.updateGroqModel}>
              <Picker.Item label="llama3-8b" value="llama3-8b-8192" color={theme.colors.foreground}/>
              <Picker.Item label="llama3-70b" value="llama3-70b-8192" color={theme.colors.foreground}/>
              <Picker.Item label="mixtral-8x7b" value="mixtral-8x7b-32768" color={theme.colors.foreground}/>
              <Picker.Item label="gemma-7b" value="gemma-7b-it" color={theme.colors.foreground}/>
            </Picker>
          </SettingsOption>
        </SettingsGroup>
        <SettingsGroup title={t(i18n)`Data`}>
          <SettingsOption
            label={t(i18n)`Prompts`}
            description={t(i18n)`Delete all prompt data.`}>
            <Button
              label={t(i18n)`Delete Prompts`}
              mode="Destructive"
              state="Default"
              onPress={settings.resetPrompts}
            />
          </SettingsOption>
          <SettingsOption
            label={t(i18n)`All Data`}
            description={t(i18n)`Delete the local database.`}>
            <Button
              label={t(i18n)`Delete Database`}
              mode="Destructive"
              state="Default"
              onPress={settings.resetOwner}
            />
          </SettingsOption>
        </SettingsGroup>
      </View>
    </Page>
  );
}

const stylesheet = createStyleSheet(theme => ({
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
  },
  select: {
    ...Platform.select({
      ios: {
        width: '100%',
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
        // Move dropdown arrow to the left
        ['border-right']: 'inset 8px transparent',
      },
    }),
  },
  selectItem: {
    color: theme.colors.foreground,
  },
  ownerKey: {
    flex: 1,
    maxWidth: 500,
    width: {
      xs: '100%',
    },
  },
}));
