import {Text} from 'react-native';
import {Picker} from 'react-exo/picker';
import {Trans, t} from '@lingui/macro';
import {useLingui} from '@lingui/react';
import {useStyles, createStyleSheet} from 'design/styles';
import {useLocale} from 'settings/hooks/useLocale';
import {useScheme} from 'settings/hooks/useScheme';
import {locales} from 'config/locales';
import {Page} from 'core/base/Page';

export default function ScreenSettings() {
  const {styles} = useStyles(stylesheet);
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
        <Picker.Item label={t`Default`} value=""/>
        <Picker.Item label={t`Light`} value="light"/>
        <Picker.Item label={t`Dark`} value="dark"/>
      </Picker>
      <Text style={styles.label}>
        <Trans>Language</Trans>
      </Text>
      <Picker
        style={styles.select}
        selectedValue={locale}
        onValueChange={setLocale}>
        <Picker.Item label={t`Default`} value=""/>
        {Object.entries(locales).map(([value, label]) => (
          <Picker.Item key={value} label={label} value={value}/>
        ))}
      </Picker>
    </Page>
  );
}

const stylesheet = createStyleSheet(_theme => ({
  label: {
    fontSize: 14,
    marginVertical: 8,
  },
  select: {
    width: 160,
  },
}));
