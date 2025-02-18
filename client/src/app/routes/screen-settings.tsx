import {View, Platform} from 'react-native';
import {Picker} from 'react-exo/picker';
import {useLingui} from '@lingui/react/macro';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {Panel, PanelItem, PanelSection} from 'app/stacks/panel';
import {useLocale} from 'app/hooks/use-locale';
import {useTheme} from 'app/hooks/use-theme';
import {locales} from 'config/locales';

export default function ScreenSettings() {
  const [scheme, setScheme] = useTheme(true);
  const [locale, setLocale] = useLocale(true);
  const {styles, theme} = useStyles(stylesheet);
  const {t} = useLingui();

  return (
    <Panel
      title={t`Settings`}
      message={t`Manage your settings`}>
      <View style={styles.root}>
        <PanelSection title={t`Display`}>
          <PanelItem
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
          </PanelItem>
          <PanelItem
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
          </PanelItem>
        </PanelSection>
      </View>
    </Panel>
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
