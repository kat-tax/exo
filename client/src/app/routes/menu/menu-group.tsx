import {useState} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {Pressable, View, Text} from 'react-native';
import {Icon} from 'react-exo/icon';

interface MenuGroupProps extends React.PropsWithChildren {
  label: string,
  closed?: boolean,
}

export function MenuGroup(props: MenuGroupProps) {
  const {styles, theme} = useStyles(stylesheet);
  const [open, setOpen] = useState(!props.closed);

  return (
    <>
      <Pressable
        style={styles.root}
        onPress={() => setOpen(!open)}>
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
      </Pressable>
      {open && props.children}
    </>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
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
    ...__TOUCH__ && {
      lineHeight: 36,
      fontSize: 12,
    },
  },
}));

