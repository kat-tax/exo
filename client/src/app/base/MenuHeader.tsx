import {t} from '@lingui/macro';
import {Icon} from 'react-exo/icon';
import {View, Text, Pressable} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useLingui} from '@lingui/react';
import {useOwner} from '@evolu/react-native';
import {Identicon} from 'app/widgets/Identicon';

import type {MenuProps} from 'app/base/Menu';

export function MenuHeader(props: MenuProps) {
  const {styles, theme} = useStyles(stylesheet);
  const {i18n} = useLingui();
  const owner = useOwner();

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <Identicon
          id={owner?.id}
          width={20}
          height={20}
          link="/settings"
        />
        <View style={styles.info}>
          <Text selectable style={styles.name}>
            {props?.profile?.name ?? t(i18n)`Human`}
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
    fontWeight: '500',
    fontFamily: theme.font.family,
    fontSize: theme.font.size,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
    color: theme.colors.foreground,
  },
}));

