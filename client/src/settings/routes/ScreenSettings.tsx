import {View, Text, TextInput, Platform} from 'react-native';
import {Picker} from 'react-exo/picker';
import {alert} from 'react-exo/toast';
import {Button} from 'design';
import {Trans, t} from '@lingui/macro';
import {useLingui} from '@lingui/react';
import {useDispatch} from 'react-redux';
import {useStyles, createStyleSheet} from 'design/styles';
import {useDisplayName} from 'settings/hooks/useDisplayName';
import {useGroqModel} from 'settings/hooks/useGroqModel';
import {useGroqKey} from 'settings/hooks/useGroqKey';
import {useLocale} from 'settings/hooks/useLocale';
import {useScheme} from 'settings/hooks/useScheme';
import {locales} from 'config/locales';
import {Page} from 'app/base/Page';
import home from 'home/store';

export default function ScreenSettings() {
  const {styles, theme} = useStyles(stylesheet);
  const [locale, setLocale] = useLocale(true);
  const [scheme, setScheme] = useScheme(true);
  const [name, setName] = useDisplayName();
  const [groq, setGroq] = useGroqKey();
  const [model, setModel] = useGroqModel();
  const dispatch = useDispatch();

  const resetPrompts = () => {
    // TODO: replace with modal
    const confirmed = window.confirm('Are you sure you want to reset your prompt history?');
    if (confirmed) {
      dispatch(home.actions.clearPrompts());
      alert({
        title: 'Prompt History Reset',
        message: 'Your prompt history has been reset.',
        preset: 'done',
      });
    }
  };

  useLingui();
  return (
    <Page
      title={<Trans>Settings</Trans>}
      message={<Trans>Manage your settings</Trans>}>
      <View style={styles.content}>
        <View style={styles.option}>
          <Text style={styles.label}>
            <Trans>Theme</Trans>
          </Text>
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
          <Text style={styles.label}>
            <Trans>Language</Trans>
          </Text>
          <View>
            <Picker
              style={styles.select}
              itemStyle={styles.selectItem}
              dropdownIconColor={theme.colors.foreground}
              selectedValue={locale}
              onValueChange={setLocale}>
              <Picker.Item label={t`Auto`} value="" color={theme.colors.foreground}/>
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
          <Text style={styles.label}>
            <Trans>Display Name</Trans>
          </Text>
          <View>
            <TextInput
              style={styles.input}
              selectTextOnFocus
              placeholder={t`Enter alias`}
              defaultValue={name}
              placeholderTextColor={theme.colors.mutedForeground}
              onChangeText={setName}
            />
          </View>
        </View>
        <View style={styles.option}>
          <Text style={styles.label}>
            <Trans>Groq API Key</Trans>
          </Text>
          <View>
            <TextInput
              style={styles.input}
              selectTextOnFocus
              placeholder={t`Enter api key`}
              defaultValue={groq}
              placeholderTextColor={theme.colors.mutedForeground}
              onChangeText={setGroq}
            />
          </View>
        </View>
        <View style={styles.option}>
          <Text style={styles.label}>
            <Trans>Groq Model ID</Trans>
          </Text>
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
        <View style={styles.option}>
          <Text style={styles.label}>
            <Trans>Prompt History</Trans>
          </Text>
          <View style={{width: 180}}>
            <Button
              onPress={resetPrompts}
              mode="Destructive"
              state="Default"
              label="Reset"
            />
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
        gap: theme.display.space5,
      },
    }),
  },
  option: {
    gap: theme.display.space1,
  },
  label: {
    fontFamily: theme.font.family,
    fontSize: theme.font.inputSize,
    fontWeight: theme.font.inputWeight,
    lineHeight: theme.font.inputHeight,
    letterSpacing: theme.font.inputSpacing,
    color: theme.colors.foreground,
    ...Platform.select({
      ios: {
        marginBottom: 0,
      },
      default: {
        marginBottom: theme.display.space2,
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
    width: {
      xs: '100%',
      sm: 180,
    },
  },
  select: {
    ...Platform.select({
      ios: {
        width: '100%',
      },
      web: {
        width: {
          xs: '100%',
          sm: 180,
        },
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
      default: {
        width: {
          xs: '100%',
          sm: 180,
        },
      },
    }),
  },
  selectItem: {
    color: theme.colors.foreground,
  },
}));
