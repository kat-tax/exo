import {t} from '@lingui/macro';
import {Icon} from 'react-exo/icon';
import {View, Text, Pressable} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useLingui} from '@lingui/react';
import {useProfile} from 'app/hooks/useProfile';
import {Identicon} from 'app/widgets/Identicon';
import * as Dropdown from 'app/widgets/Dropdown';

export function MenuHeader() {
  const {styles, theme} = useStyles(stylesheet);
  const profile = useProfile();
  const {i18n} = useLingui();

  return (
    <View style={styles.root}>
      <Dropdown.Root>
        <Dropdown.Trigger>
          <View style={styles.header}>
            <Identicon width={20} height={20}/>
            <View style={styles.info}>
              <Text selectable={false} style={styles.name}>
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
        </Dropdown.Trigger>
        {false &&        
          <Dropdown.Content
            loop
            align="end"
            side="bottom"
            sideOffset={10}
            alignOffset={10}
            avoidCollisions
            collisionPadding={10}>
            <Dropdown.Item key="logout" onSelect={console.log}>
              <Dropdown.ItemTitle>
                <Text>{t(i18n)`Logout`}</Text>
              </Dropdown.ItemTitle>
            </Dropdown.Item>
          </Dropdown.Content>
        }
      </Dropdown.Root>
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
    color: theme.colors.foreground,
    fontFamily: theme.font.family,
    fontWeight: '500',
    fontSize: theme.font.size,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
  },
}));

