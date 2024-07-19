import {useState} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {Pressable, Text} from 'react-native';
import {Icon} from 'react-exo/icon';
import {isTouch} from 'app/utils/platform';

interface MenuSectionProps extends React.PropsWithChildren {
  label: JSX.Element,
  tabs?: boolean,
  closed?: boolean,
  disabled?: boolean,
}

export function MenuSection(props: MenuSectionProps) {
  const {styles, theme} = useStyles(stylesheet);
  const [open, setOpen] = useState(!props.closed);

  if (props.disabled) return null;
  if (props.tabs) return props.children

  return (
    <>
      <Pressable
        onPress={() => setOpen(!open)}
        // @ts-ignore
        style={({hovered}) => [
          styles.trigger,
          {backgroundColor: hovered
            ? 'rgba(255, 255, 255, 0.045)'
            : 'rgba(0, 0, 0, 0.035)'
          },
        ]}>
      <Text
        selectable={false}
        style={styles.label}>
        {props.label}
      </Text>
      <Icon
        name={open ? 'ph:caret-down-fill' : 'ph:caret-right-fill'}
        color={theme.colors.mutedForeground}
        size={8}
      />
      </Pressable>
      {open && props.children}
    </>
  );
}

const stylesheet = createStyleSheet(theme => ({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.display.space2,
    marginTop: theme.display.space4,
    backgroundColor: theme.colors.muted,
  },
  label: {
    marginRight: theme.display.space1,
    color: theme.colors.mutedForeground,
    lineHeight: 11,
    fontSize: 11,
    ...isTouch() && {
      lineHeight: 36,
      fontSize: 12,
    },
  },
}));

