import {View, Text, TextInput, Platform} from 'react-native';
import {Picker} from 'react-exo/picker';
import {alert} from 'react-exo/toast';
import {Button} from 'design';
import {Trans, t} from '@lingui/macro';
import {useLingui} from '@lingui/react';
import {useDispatch} from 'react-redux';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useDisplayName} from 'settings/hooks/useDisplayName';
import {useGroqModel} from 'settings/hooks/useGroqModel';
import {useGroqKey} from 'settings/hooks/useGroqKey';
import {useLocale} from 'settings/hooks/useLocale';
import {useScheme} from 'settings/hooks/useScheme';
import {locales} from 'config/locales';
import {Page} from 'app/base/Page';
import home from 'home/store';

export default function ScreenSettings() {
  const {i18n} = useLingui();
  const {styles, theme} = useStyles(stylesheet);
  const [name, setName] = useDisplayName();
  const [locale, setLocale] = useLocale(true);
  const [scheme, setScheme] = useScheme(true);
  const [model, setModel] = useGroqModel();
  const [groq, setGroq] = useGroqKey();
  const dispatch = useDispatch();

  const resetPrompts = () => {
    // TODO: replace with modal
    const confirmed = window.confirm(t(i18n)`Are you sure you want to reset your prompt history?`);
    if (confirmed) {
      dispatch(home.actions.clearPrompts());
      alert({
        title: t(i18n)`Prompt History Reset`,
        message: t(i18n)`Your prompt history has been reset.`,
        preset: 'done',
      });
    }
  };

  const resetCalendar = () => {
    // TODO: replace with modal
    const confirmed = window.confirm(t(i18n)`Are you sure you want to reset your calendar data?`);
    if (confirmed) {
      alert({
        title: t(i18n)`Calendar Data Reset`,
        message: t(i18n)`Your calendar has been reset.`,
        preset: 'done',
      });
    }
  };

  return (
    <Page
      title={<Trans>Settings</Trans>}
      message={<Trans>Manage your settings</Trans>}>
      <View style={styles.content}>
        <View style={styles.group}>
          <Text style={styles.header}>
            <Trans>Display</Trans>
          </Text>
          <View style={styles.option}>
            <View style={styles.info}>
              <Text style={styles.label}>
                <Trans>Display Name</Trans>
              </Text>
              <Text style={styles.description}>
                <Trans>Set a display name for yourself.</Trans>
              </Text>
            </View>
            <View>
              <TextInput
                style={styles.input}
                selectTextOnFocus
                placeholder={t(i18n)`Enter alias`}
                defaultValue={name}
                placeholderTextColor={theme.colors.mutedForeground}
                onChangeText={setName}
              />
            </View>
          </View>
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
                <Picker.Item label="Celsius" value="c" color={theme.colors.foreground}/>
                <Picker.Item label="Fahrenheit" value="f" color={theme.colors.foreground}/>
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
                <Picker.Item label="Kilometers" value="km" color={theme.colors.foreground}/>
                <Picker.Item label="Miles" value="mi" color={theme.colors.foreground}/>
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
                defaultValue={groq}
                placeholderTextColor={theme.colors.mutedForeground}
                onChangeText={setGroq}
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
                selectedValue={model}
                onValueChange={setModel}>
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
                onPress={resetPrompts}
              />
            </View>
          </View>
          <View style={styles.option}>
            <View style={styles.info}>
              <Text style={styles.label}>
                <Trans>Calendar</Trans>
              </Text>
              <Text style={styles.description}>
                <Trans>Delete all calendar data.</Trans>
              </Text>
            </View>
            <View>
              <Button
                label={t(i18n)`Delete Calendar`}
                mode="Destructive"
                state="Default"
                onPress={resetCalendar}
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
                onPress={undefined}
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
    fontFamily: theme.font.family,
    fontSize: theme.font.size,
    fontWeight: '300',
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
}));
