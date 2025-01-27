import {useState} from 'react';
import {useLingui} from '@lingui/react/macro';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useSettings} from 'app/hooks/useSettings';
import {useLocale} from 'app/hooks/useLocale';
import {useScheme} from 'app/hooks/useScheme';

import {View, TextInput, Platform} from 'react-native';
import {Picker} from 'react-exo/picker';

import {Page} from 'app/interface/Page';
import {PageItem} from 'app/interface/PageItem';
import {PageSection} from 'app/interface/PageSection';
import {Identicon} from 'app/stacks/Identicon';
import {locales} from 'config/locales';
import {Button} from 'design';

export default function ScreenSettings() {
  const settings = useSettings();
  const [showKey, setShowKey] = useState(false);
  const [scheme, setScheme] = useScheme(true);
  const [locale, setLocale] = useLocale(true);
  const {styles, theme} = useStyles(stylesheet);
  const {t} = useLingui();

  return (
    <Page
      title={t`Settings`}
      message={t`Manage your settings`}
      widget={
        <Identicon
          id={settings.owner?.id}
          width={48}
          height={48}
          linkable
        />
      }>
      <View style={styles.root}>
        <PageSection title={t`Profile`}>
          <PageItem
            label={t`User Name`}
            description={t`Your name to display in the app.`}>
            <TextInput
              style={styles.input}
              maxLength={50}
              defaultValue={settings.profile?.name?.toString()}
              onChangeText={settings.updateName}
              placeholder={t`Enter name`}
              placeholderTextColor={theme.colors.mutedForeground}
            />
          </PageItem>
          <PageItem
            label={t`Owner Key`}
            description={t`A mnemonic phrase for authentication.`}>
            <TextInput
              style={styles.input}
              selectTextOnFocus
              secureTextEntry={!showKey}
              defaultValue={settings.owner?.mnemonic}
              placeholder={'<owner key>'}
              placeholderTextColor={theme.colors.mutedForeground}
              importantForAutofill="no"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              onFocus={() => setShowKey(true)}
              onBlur={e => {
                setShowKey(false);
                settings.changeOwner(e.nativeEvent.text);
              }}
            />
          </PageItem>
        </PageSection>
        <PageSection title={t`Display`}>
          <PageItem
            label={t`Language`}
            description={t`Select the language for the app.`}>
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
          </PageItem>
          <PageItem
            label={t`Theme`}
            description={t`Select the theme for the app.`}>
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
          </PageItem>
          <PageItem
            label={t`Temperature`}
            description={t`Select the temperature unit for the app.`}>
            <Picker
              style={styles.select}
              itemStyle={styles.selectItem}
              dropdownIconColor={theme.colors.foreground}
              selectedValue={undefined}
              onValueChange={undefined}>
              <Picker.Item label={t`Celsius`} value="c" color={theme.colors.foreground}/>
              <Picker.Item label={t`Fahrenheit`} value="f" color={theme.colors.foreground}/>
            </Picker>
          </PageItem>
          <PageItem
            label={t`Distance`}
            description={t`Select the distance unit for the app.`}>
            <Picker
              style={styles.select}
              itemStyle={styles.selectItem}
              dropdownIconColor={theme.colors.foreground}
              selectedValue={undefined}
              onValueChange={undefined}>
              <Picker.Item label={t`Kilometers`} value="km" color={theme.colors.foreground}/>
              <Picker.Item label={t`Miles`} value="mi" color={theme.colors.foreground}/>
            </Picker>
          </PageItem>
        </PageSection>
        <PageSection title={t`Services`}>
          <PageItem
            label={t`Groq API Key`}
            description={t`Provide a key to use AI features.`}>
            <TextInput
              style={styles.input}
              secureTextEntry
              selectTextOnFocus
              placeholder={'<groq api key>'}
              defaultValue={settings.profile?.groqKey?.toString()}
              placeholderTextColor={theme.colors.mutedForeground}
              onBlur={e => settings.updateGroqKey(e.nativeEvent.text)}
            />
          </PageItem>
          <PageItem
            label={t`Groq Model ID`}
            description={t`Select the AI model to use.`}>
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
          </PageItem>
          <PageItem
            label={t`Maptiler URL`}
            description={t`Provide a url to use map features.`}>
            <TextInput
              style={styles.input}
              selectTextOnFocus
              placeholder={'https://api.maptiler.com'}
              defaultValue={settings.profile?.maptilerUrl?.toString()}
              placeholderTextColor={theme.colors.mutedForeground}
              onBlur={e => settings.updateMaptilerUrl(e.nativeEvent.text)}
            />
          </PageItem>
          <PageItem
            label={t`Maptiler API Key`}
            description={t`Provide a key to use map features.`}>
            <TextInput
              style={styles.input}
              secureTextEntry
              selectTextOnFocus
              placeholder={'<maptiler api key>'}
              defaultValue={settings.profile?.maptilerKey?.toString()}
              placeholderTextColor={theme.colors.mutedForeground}
              onBlur={e => settings.updateMaptilerKey(e.nativeEvent.text)}
            />
          </PageItem>
          <PageItem
            label={t`Matrix User ID`}
            description={t`Provide a matrix user to use social features.`}>
            <TextInput
              style={styles.input}
              selectTextOnFocus
              placeholder={'@user:matrix.org'}
              defaultValue={settings.profile?.matrixUserId?.toString()}
              placeholderTextColor={theme.colors.mutedForeground}
              onBlur={e => settings.updateMatrixUserId(e.nativeEvent.text)}
            />
          </PageItem>
          <PageItem
            label={t`Matrix Base URL`}
            description={t`Provide a base url to use social features.`}>
            <TextInput
              style={styles.input}
              selectTextOnFocus
              placeholder={'https://matrix.org'}
              defaultValue={settings.profile?.matrixBaseUrl?.toString()}
              placeholderTextColor={theme.colors.mutedForeground}
              onBlur={e => settings.updateMatrixBaseUrl(e.nativeEvent.text)}
            />
          </PageItem>
          <PageItem
            label={t`Matrix Access Token`}
            description={t`Provide a token to use social features.`}>
            <TextInput
              style={styles.input}
              secureTextEntry
              selectTextOnFocus
              placeholder={t`<matrix access token>`}
              defaultValue={settings.profile?.matrixAccessToken?.toString()}
              placeholderTextColor={theme.colors.mutedForeground}
              onBlur={e => settings.updateMatrixAccessToken(e.nativeEvent.text)}
            />
          </PageItem>
        </PageSection>
        <PageSection title={t`Data`}>
          <PageItem
            label={t`Prompts`}
            description={t`Delete all local prompt data.`}>
            <Button
              label={t`Delete Prompts`}
              mode="Destructive"
              state="Default"
              onPress={settings.resetPrompts}
            />
          </PageItem>
          <PageItem
            label={t`Database`}
            description={t`Delete the local database.`}>
            <Button
              label={t`Delete Database`}
              mode="Destructive"
              state="Default"
              onPress={settings.resetOwner}
            />
          </PageItem>
          <PageItem
            label={t`Filesystem`}
            description={t`Delete all local files.`}>
            <Button
              label={t`Delete Filesystem`}
              mode="Destructive"
              state="Default"
              onPress={settings.resetFS}
            />
          </PageItem>
        </PageSection>
      </View>
    </Page>
  );
}

const stylesheet = createStyleSheet(theme => ({
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
