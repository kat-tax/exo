import {View, Text, TextInput, Platform} from 'react-native';
import {Trans, t} from '@lingui/macro';
import {Picker} from 'react-exo/picker';
import {useState} from 'react';
import {useLingui} from '@lingui/react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useSettings} from 'settings/hooks/useSettings';
import {useScheme} from 'settings/hooks/useScheme';
import {useLocale} from 'settings/hooks/useLocale';
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
      widget={<Identicon width={48} height={48}/>}>
      <View style={styles.content}>
        <View style={styles.group}>
          <Text style={styles.header}>
            <Trans>Profile</Trans>
          </Text>
          <View style={styles.option}>
            <View style={styles.info}>
              <Text style={styles.label}>
                <Trans>User Name</Trans>
              </Text>
              <Text style={styles.description}>
                <Trans>Your name to display in the app.</Trans>
              </Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                maxLength={50}
                defaultValue={settings.profile?.name?.toString()}
                onChangeText={settings.updateName}
                placeholder={t(i18n)`Enter your name`}
                placeholderTextColor={theme.colors.mutedForeground}
              />
            </View>
          </View>
          <View style={styles.option}>
            <View style={styles.info}>
              <Text style={styles.label}>
                <Trans>Owner Key</Trans>
              </Text>
              <Text style={styles.description}>
                <Trans>A mnemonic phrase for authentication.</Trans>
              </Text>
            </View>
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
          </View>
        </View>
        <View style={styles.group}>
          <Text style={styles.header}>
            <Trans>Display</Trans>
          </Text>
          <View style={styles.option}>
            <View style={styles.info}>
              <Text style={styles.label}>
                <Trans>Language</Trans>
              </Text>
              <View style={styles.info}>
                <Text style={styles.description}>
                  <Trans>Select the language for the app.</Trans>
                </Text>
              </View>
            </View>
            <View>
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
            </View>
          </View>
          <View style={styles.option}>
            <View style={styles.info}>
              <Text style={styles.label}>
                <Trans>Theme</Trans>
              </Text>
              <Text style={styles.description}>
                <Trans>Select the theme for the app.</Trans>
              </Text>
            </View>
            <View>
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
            </View>
          </View>
          <View style={styles.option}>
            <View style={styles.info}>
              <Text style={styles.label}>
                <Trans>Temperature</Trans>
              </Text>
              <Text style={styles.description}>
                <Trans>Select the temperature unit for the app.</Trans>
              </Text>
            </View>
            <View>
              <Picker
                style={styles.select}
                itemStyle={styles.selectItem}
                dropdownIconColor={theme.colors.foreground}
                selectedValue={undefined}
                onValueChange={undefined}>
                <Picker.Item label={t(i18n)`Celsius`} value="c" color={theme.colors.foreground}/>
                <Picker.Item label={t(i18n)`Fahrenheit`} value="f" color={theme.colors.foreground}/>
              </Picker>
            </View>
          </View>
          <View style={styles.option}>
            <View style={styles.info}>
              <Text style={styles.label}>
                <Trans>Distance</Trans>
              </Text>
              <Text style={styles.description}>
                <Trans>Select the distance unit for the app.</Trans>
              </Text>
            </View>
            <View>
              <Picker
                style={styles.select}
                itemStyle={styles.selectItem}
                dropdownIconColor={theme.colors.foreground}
                selectedValue={undefined}
                onValueChange={undefined}>
                <Picker.Item label={t(i18n)`Kilometers`} value="km" color={theme.colors.foreground}/>
                <Picker.Item label={t(i18n)`Miles`} value="mi" color={theme.colors.foreground}/>
              </Picker>
            </View>
          </View>
        </View>
        <View style={styles.group}>
          <Text style={styles.header}>
            <Trans>AI</Trans>
          </Text>
          <View style={styles.option}>
            <View style={styles.info}>
              <Text style={styles.label}>
                <Trans>Groq API Key</Trans>
              </Text>
              <Text style={styles.description}>
                <Trans>Provide a key to use AI features.</Trans>
              </Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                selectTextOnFocus
                placeholder={t(i18n)`Enter api key`}
                defaultValue={settings.profile?.groqKey?.toString()}
                placeholderTextColor={theme.colors.mutedForeground}
                onBlur={e => settings.updateGroqKey(e.nativeEvent.text)}
              />
            </View>
          </View>
          <View style={styles.option}>
            <View style={styles.info}>
              <Text style={styles.label}>
                <Trans>Groq Model ID</Trans>
              </Text>
              <Text style={styles.description}>
                <Trans>Select the AI model to use.</Trans>
              </Text>
            </View>
            <View>
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
            </View>
          </View>
        </View>
        <View style={styles.group}>
          <Text style={styles.header}>
            <Trans>Data</Trans>
          </Text>
          <View style={styles.option}>
            <View style={styles.info}>
              <Text style={styles.label}>
                <Trans>Prompts</Trans>
              </Text>
              <Text style={styles.description}>
                <Trans>Delete all prompt data.</Trans>
              </Text>
            </View>
            <View>
              <Button
                label={t(i18n)`Delete Prompts`}
                mode="Destructive"
                state="Default"
                onPress={settings.resetPrompts}
              />
            </View>
          </View>
          <View style={styles.option}>
            <View style={styles.info}>
              <Text style={styles.label}>
                <Trans>All Data</Trans>
              </Text>
              <Text style={styles.description}>
                <Trans>Delete the local database.</Trans>
              </Text>
            </View>
            <View>
              <Button
                label={t(i18n)`Delete Database`}
                mode="Destructive"
                state="Default"
                onPress={settings.resetOwner}
              />
            </View>
          </View>
        </View>
      </View>
    </Page>
  );
}

const stylesheet = createStyleSheet(theme => ({
  content: {
    ...Platform.select({
      ios: {
        gap: 0,
      },
      default: {
        gap: theme.display.space8,
      },
    }),
  },
  group: {
    gap: theme.display.space5,
  },
  header: {
    fontFamily: theme.font.family,
    fontSize: theme.font.labelSize,
    fontWeight: theme.font.labelWeight,
    lineHeight: theme.font.labelHeight,
    letterSpacing: theme.font.labelSpacing,
    color: theme.colors.foreground,
  },
  option: {
    gap: theme.display.space5,
    borderBottomColor: theme.colors.border,
    paddingBottom: theme.display.space5,
    borderBottomWidth: 1,
    alignItems: {
      initial: 'flex-start',
      xs: 'center',
    },
    justifyContent: {
      initial: 'flex-start',
      xs: 'space-between',
    },
    flexDirection: {
      initial: 'column',
      xs: 'row',
    },
  },
  info: {
    gap: theme.display.space2,
  },
  label: {
    fontFamily: theme.font.family,
    fontSize: theme.font.size,
    fontWeight: theme.font.weight,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
    color: theme.colors.foreground,
  },
  description: {
    fontWeight: '300',
    fontFamily: theme.font.family,
    fontSize: theme.font.size,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
    color: theme.colors.mutedForeground,
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
