import {Text} from 'react-native';
import {Picker} from 'react-exo/picker';
import {Trans, t} from '@lingui/macro';
import {useLingui} from '@lingui/react';
import {useStyles, createStyleSheet} from 'styles';
import {useLocale} from 'settings/hooks/useLocale';
import {useScheme} from 'settings/hooks/useScheme';
import {locales} from 'config/locales';
import {Page} from 'core/base/Page';

export default function ScreenSettings() {
  const {styles, theme} = useStyles(stylesheet);
  const [scheme, setScheme] = useScheme(true);
  const [locale, setLocale] = useLocale(true);

  useLingui();

  return (
    <Page title={t`Settings`}>
      <Text style={styles.label}>
        <Trans>Theme</Trans>
      </Text>
      <Picker
        style={styles.select}
        selectedValue={scheme}
        onValueChange={setScheme}>
        <Picker.Item label={t`Default`} value="" color={theme.colors.foreground}/>
        <Picker.Item label={t`Light`} value="light" color={theme.colors.foreground}/>
        <Picker.Item label={t`Dark`} value="dark" color={theme.colors.foreground}/>
      </Picker>
      <Text style={styles.label}>
        <Trans>Language</Trans>
      </Text>
      <Picker
        style={styles.select}
        selectedValue={locale}
        onValueChange={setLocale}>
        <Picker.Item label={t`Default`} value="" color={theme.colors.foreground}/>
        {Object.entries(locales).map(([value, label]) => (
          <Picker.Item
            key={value}
            label={label}
            value={value}
            color={theme.colors.foreground}
          />
        ))}
      </Picker>
    </Page>
  );
}

const stylesheet = createStyleSheet(theme => ({
  label: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
    color: theme.colors.foreground,
  },
  select: {
    width: 200,
    padding: 8,
    color: theme.colors.foreground,
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.background,
  },
}));
