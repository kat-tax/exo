import {useState} from 'react';
import {Pressable, View, Text} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {Icon} from 'app/stacks/base';

interface MenuGroupProps extends React.PropsWithChildren {
  label: string,
  closed?: boolean,
}

export function MenuGroup(props: MenuGroupProps) {
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
          {open ? (
            <Icon
              name="ph:caret-down-fill"
              size={8}
              uniProps={theme => ({
                color: theme.colors.mutedForeground,
              })}
            />
          ) : (
            <Icon
              name="ph:caret-right-fill"
              size={8}
              uniProps={theme => ({
                color: theme.colors.mutedForeground,
              })}
            />
          )}
        </View>
      </Pressable>
      {open && props.children}
    </>
  );
}

const styles = StyleSheet.create((theme) => ({
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
    fontSize: theme.font.size,
    ...__TOUCH__ && {
      fontSize: theme.font.contentSize,
      lineHeight: 36,
    },
  },
}));

