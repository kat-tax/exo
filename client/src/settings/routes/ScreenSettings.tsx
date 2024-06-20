import {View, Text, Platform} from 'react-native';
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
          <View>
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
    fontSize: 14,
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
  select: {
    ...Platform.select({
      ios: {
        width: '100%',
      },
      web: {
        width: 180,
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
        width: 180,
      },
    }),
  },
  selectItem: {
    color: theme.colors.foreground,
  },
}));
