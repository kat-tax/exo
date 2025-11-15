import {useState} from 'react';
import {useLingui} from '@lingui/react/macro';
import {useNavigation} from '@react-navigation/native';
import {View, Platform} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {TextInput} from 'react-exo/textinput';
import {Sheet} from 'react-exo/sheet';
import {Avatar} from 'react-exo/avatar';
import {Picker} from 'react-exo/picker';
import {locales} from 'config/locales';
import {Button, Prompt} from 'design';
import {Panel, PanelSection, PanelItem} from 'app/ui/panel';
import {AccountKey} from 'settings/stacks/account-key';
import {useSettings} from 'settings/hooks/use-settings';
import {useLocale} from 'settings/hooks/use-locale';
import {useTheme} from 'settings/hooks/use-theme';

export default function ScreenOverview() {
  const [scheme, setScheme] = useTheme(true);
  const [locale, setLocale] = useLocale(true);
  const [deleteConfirm, setDeleteConfirm] = useState('');
  const settings = useSettings();
  const nav = useNavigation();
  const {t} = useLingui();

  return (
    <Panel
      title={t`Settings`}
      message={t`Configure the app`}
      right={<Avatar id={settings.owner?.id} size={100}/>}>
      <View style={styles.root}>
        <PanelSection title={t`Profile`}>
          <PanelItem
            label={t`Display Name`}
            description={t`Choose your display name.`}>
            <TextInput
              style={styles.input}
              maxLength={25}
              defaultValue={settings.name}
              onChangeText={settings.updateName}
              placeholder={t`Enter name`}
            />
          </PanelItem>
        </PanelSection>
        <PanelSection title={t`Appearance`}>
          <PanelItem
            label={t`Language`}
            description={t`Select your preferred language.`}>
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
            description={t`Select the color scheme.`}>
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
        <PanelSection title={t`Data`}>
          <PanelItem
            label={t`Account Key`}
            description={t`Manage your mnemonic phrase.`}>
            <Sheet
              autoWebSize={620}
              edgeToEdge={false}
              trigger={
                <Button
                  label={settings.owner?.mnemonic ? t`Manage Key` : t`Set Key`}
                  mode="Primary"
                  state="Default"
                />
              }>
              <AccountKey
                mnemonic={settings.owner?.mnemonic?.toString() ?? ''}
                onChangeOwner={settings.changeOwner}
              />
            </Sheet>
          </PanelItem>
          <PanelItem
            label={t`Storage Usage`}
            description={t`Monitor disk usage on device.`}>
            <Button
              label={t`View Usage`}
              mode="Primary"
              state="Default"
              onPress={() => nav.navigate('SettingsStorage')}
            />
          </PanelItem>
          <PanelItem
            label={t`Reset Data`}
            description={t`Deletes database and resets key.`}>
            <Sheet
              autoWebSize={250}
              edgeToEdge={false}
              trigger={
                <Button
                  label={t`Reset Data`}
                  mode="Destructive"
                  state="Default"
                />
              }>
              <View style={styles.confirmRoot}>
                <Prompt
                  title={t`Reset Data`}
                  message={t`This will reset your account key and delete your local database. This action is irreversible. If you have data you wish to backup make sure to save your account key.`}
                  showClose={false}
                  confirmButton={
                    <View style={styles.confirmForm}>
                      <TextInput
                        style={styles.confirmInput}
                        value={deleteConfirm}
                        onChangeText={setDeleteConfirm}
                        placeholder={t`Type "${'delete'}" to confirm`}
                        maxLength={6}
                        autoCapitalize="none"
                        autoCorrect={false}
                        spellCheck={false}
                      />
                      <Button
                        label={t`Confirm`}
                        mode="Destructive"
                        state={deleteConfirm === 'delete' ? "Default" : "Disabled"}
                        disabled={deleteConfirm !== 'delete'}
                        onPress={deleteConfirm === 'delete' ? settings.resetOwner : undefined}
                      />
                    </View>
                  }
                />
              </View>
            </Sheet>
          </PanelItem>
        </PanelSection>
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
  select: {
    ...Platform.select({
      ios: {
        width: '100%',
      },
      android: {
        minWidth: 120,
      },
      default: {
        minWidth: 120,
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
        borderRight: 'inset 8px transparent',
      },
    }),
  },
  selectItem: {
    color: theme.colors.foreground,
  },
  confirmRoot: {
    marginTop: theme.display.space4,
    marginBottom: theme.display.space4,
  },
  confirmForm: {
    flex: 1,
    gap: theme.display.space2,
    marginTop: theme.display.space4,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  confirmInput: {
    width: '50%',
    minWidth: 200,
    padding: theme.display.space2,
    paddingHorizontal: theme.display.space3,
    color: theme.colors.foreground,
    fontSize: theme.typography.size2,
    fontWeight: theme.typography.weightLight,
    lineHeight: theme.typography.lineHeight2,
    letterSpacing: theme.typography.letterSpacing2,
    fontFamily: theme.font.family,
    borderRadius: theme.display.radius3,
    borderColor: theme.colors.border,
    borderWidth: 1,
  },
}));
