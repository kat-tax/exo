import {t} from '@lingui/macro';
import {Icon} from 'react-exo/icon';
import {View, Text, Pressable} from 'react-native';
import {useLingui} from '@lingui/react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useAppContext} from 'app/routes/useAppContext';
import {Identicon} from 'app/widgets/Identicon';

export function MenuHeader() {
  const {styles, theme} = useStyles(stylesheet);
  const {profile} = useAppContext();
  const {i18n} = useLingui();

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Identicon width={20} height={20}/>
        <View style={styles.info}>
          <Text style={styles.name}>
            {profile?.name ?? t(i18n)`Human`}
          </Text>
        </View>
        <View style={styles.fill}/>
        <Pressable onPress={() => {}}>
          <Icon
            name="ph:magnifying-glass"
            color={theme.colors.mutedForeground}
            size={16}
          />
        </Pressable>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    marginBottom: theme.display.space3,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.display.space2,
    padding: theme.display.space2,
    paddingRight: theme.display.space1,
  },
  fill: {
    flex: 1,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.display.space1,
  },
  name: {
    userSelect: 'none',
    color: theme.colors.foreground,
    fontFamily: theme.font.family,
    fontWeight: '500',
    fontSize: theme.font.size,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
  },
}));

