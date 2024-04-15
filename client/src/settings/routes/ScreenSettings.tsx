import {Text} from 'react-native';
import {Picker} from 'react-exo/picker';
import {Trans, t} from '@lingui/macro';
import {useLingui} from '@lingui/react';
import {useStyles, createStyleSheet} from 'styles';
import {useLocale} from 'settings/hooks/useLocale';
import {useScheme} from 'settings/hooks/useScheme';
import {Page} from 'common/base/Page';

export default function ScreenSettings() {
  const {styles} = useStyles(stylesheet);
  const [activeScheme] = useScheme();
  const [scheme, setScheme] = useScheme(true);
  const [locale, setLocale] = useLocale(true);
  const isDark = activeScheme === 'dark';
  const color = isDark ? '#fff' : '#000';

  useLingui();

  return (
    <Page title={t`Settings`}>
      <Text style={styles.label}>
        <Trans>Theme</Trans>
      </Text>
      {/* <Picker
        style={styles.select}
        selectedValue={scheme}
        onValueChange={setScheme}>
        <Picker.Item label={t`Default`} value="" color={color}/>
        <Picker.Item label={t`Light`} value="light" color={color}/>
        <Picker.Item label={t`Dark`} value="dark" color={color}/>
      </Picker> */}
      <Text style={styles.label}>
        <Trans>Language</Trans>
      </Text>
      {/* <Picker
        style={styles.select}
        selectedValue={locale}
        onValueChange={setLocale}>
        <Picker.Item label={t`Default`} value="" color={color}/>
        <Picker.Item label="English" value="en" color={color}/>
        <Picker.Item label="Deutsch" value="de" color={color}/>
        <Picker.Item label="Español" value="es" color={color}/>
        <Picker.Item label="Portugués" value="pt" color={color}/>
        <Picker.Item label="Bahasa Indonesia" value="id" color={color}/>
        <Picker.Item label="Русский" value="ru" color={color}/>
        <Picker.Item label="やまと" value="ja" color={color}/>
        <Picker.Item label="عربي" value="ar" color={color}/>
      </Picker> */}
    </Page>
  );
}

const stylesheet = createStyleSheet(theme => ({
  label: {
    color: '#333',
    fontSize: 16,
    marginBottom: 8,
    marginTop: 16,
  },
  select: {
    width: 200,
    padding: 8,
    color: '#000',
    borderColor: '#000',
    backgroundColor: '#fff',
  },
}));
