import {t} from '@lingui/macro';
import {useLingui} from '@lingui/react';
import {Icon} from 'react-exo/icon';
import {View, Text, Pressable} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import * as Dropdown from 'app/base/Dropdown';
import {useProfile} from 'app/hooks/useProfile';
import {Identicon} from 'app/base/Identicon';

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
              <Text style={styles.name}>
                {profile?.name ?? t(i18n)`Human`}
              </Text>
              <Icon name="ph:caret-down" size={12} color={theme.colors.mutedForeground}/>
            </View>
            <View style={styles.fill}/>
            <Pressable onPress={() => console.log('Menu action not implemented')}>
              <Icon name="ph:magnifying-glass" size={16} color={theme.colors.mutedForeground}/>
            </Pressable>
            <Pressable onPress={() => console.log('Menu action not implemented')}>
              <Icon name="ph:note-pencil" size={16} color={theme.colors.mutedForeground}/>
            </Pressable>
          </View>
        </Dropdown.Trigger>
        {false &&        
          <Dropdown.Content
            loop
            side="bottom"
            align="end"
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
    marginBottom: theme.display.space2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.display.space2,
    padding: theme.display.space2,
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

