import {useState} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {Pressable, View, Text} from 'react-native';
import {Icon} from 'react-exo/icon';
import {isTouch} from 'app/utils/platform';
import {useScheme} from 'app/hooks/useScheme';

interface MenuSectionProps extends React.PropsWithChildren {
  label: string,
  closed?: boolean,
  disabled?: boolean,
  action?: {
    icon: string,
    label: string,
    onPress: () => void,
  },
}

export function MenuSection(props: MenuSectionProps) {
  const {styles, theme} = useStyles(stylesheet);
  const [open, setOpen] = useState(!props.closed);
  const [scheme] = useScheme();

  if (props.disabled) return null;

  return (
    <>
      <Pressable
        onPress={() => setOpen(!open)}
        style={({hovered}) => [
          styles.trigger,
          hovered && {
            backgroundColor: scheme === 'dark'
              ? 'rgba(255, 255, 255, 0.045)'
              : 'rgba(0, 0, 0, 0.035)'
          },
        ]}>
        {root => <>
          <View style={styles.content}>
            <Text
              style={styles.label}>
              {props.label}
            </Text>
            <Icon
              name={open ? 'ph:caret-down-fill' : 'ph:caret-right-fill'}
              color={theme.colors.mutedForeground}
              size={8}
            />
          </View>
          {props.action &&
            <Pressable
              onPress={props.action.onPress}
              accessibilityLabel={props.action.label}
              style={(e) => [
                styles.action,
                (e.hovered || root.hovered) && styles.actionVisible,
              ]}>
              {action =>
                <Icon
                  size={16}
                  name={props.action?.icon || ''}
                  color={
                    action.hovered
                      ? theme.colors.foreground
                      : theme.colors.mutedForeground
                  }
                />
              }
            </Pressable>
          }
        </>}
      </Pressable>
      {open && props.children}
    </>
  );
}

const stylesheet = createStyleSheet(theme => ({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: theme.display.space4,
    borderRadius: theme.display.radius1,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.display.space1,
  },
  label: {
    userSelect: 'none',
    marginRight: theme.display.space1,
    color: theme.colors.mutedForeground,
    lineHeight: theme.font.labelHeight,
    fontSize: 11,
    ...isTouch() && {
      lineHeight: 36,
      fontSize: 12,
    },
  },
  action: {
    opacity: 0,
    height: '100%',
    justifyContent: 'center',
    paddingLeft: theme.display.space2,
    paddingRight: theme.display.space1,
    color: theme.colors.mutedForeground,
  },
  actionVisible: {
    opacity: 1,
  },
}));

