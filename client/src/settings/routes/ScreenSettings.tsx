import {View, Text} from 'react-native';
import {Picker} from 'react-exo/picker';
import {Trans, t} from '@lingui/macro';
import {useLingui} from '@lingui/react';
import {useStyles, createStyleSheet} from 'design/styles';
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
    <Page title={<Trans>Settings</Trans>}>
      <View style={styles.content}>
        <View style={styles.option}>
          <Text style={styles.label}>
            <Trans>Theme</Trans>
          </Text>
          <Picker
            style={styles.select}
            itemStyle={styles.selectItem}
            dropdownIconColor={theme.colors.foreground}
            selectedValue={scheme}
            onValueChange={setScheme}>
            <Picker.Item label={t`Default`} value="" color={theme.colors.foreground}/>
            <Picker.Item label={t`Light`} value="light" color={theme.colors.foreground}/>
            <Picker.Item label={t`Dark`} value="dark" color={theme.colors.foreground}/>
          </Picker>
        </View>
        <View style={styles.option}>
          <Text style={styles.label}>
            <Trans>Language</Trans>
          </Text>
          <Picker
            style={styles.select}
            itemStyle={styles.selectItem}
            dropdownIconColor={theme.colors.foreground}
            selectedValue={locale}
            onValueChange={setLocale}>
            <Picker.Item label={t`Default`} value="" color={theme.colors.foreground}/>
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
    </Page>
  );
}

const stylesheet = createStyleSheet(theme => ({
  content: {
    gap: 16,
  },
  option: {
    gap: 4,
  },
  label: {
    fontSize: 14,
    color: theme.colors.foreground,
  },
  select: {
    width: 160,
  },
  selectItem: {
    color: theme.colors.foreground,
  },
}));
