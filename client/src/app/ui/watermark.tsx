import {Icon} from 'react-exo/icon';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {useFocusable} from '@noriginmedia/norigin-spatial-navigation';
import {Button} from 'design';

interface WatermarkProps extends React.PropsWithChildren {
  title: string,
  label: string,
  icon: string,
  dnd?: boolean,
  onAction?: () => void,
}

export function Watermark(props: WatermarkProps) {
  const {ref, focused} = useFocusable();
  return (
    <View style={styles.root}>
      <View style={[styles.box, props.dnd && styles.boxDnd]}>
        <Text style={styles.text}>
          {props.title}
        </Text>
        <Button
          // @ts-expect-error - TODO: extend design prop types
          ref={ref}
          mode="Secondary"
          state={focused ? 'Focused' : 'Default'}
          label={props.label}
          onPress={props.onAction}
          icon={<Icon name={props.icon}/>}
          showIcon
        />
        {props.children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    gap: theme.display.space5,
    padding: theme.display.space6,
    borderStyle: 'dashed',
    borderWidth: 0,
    borderColor: theme.colors.muted,
    borderRadius: theme.display.radius3,
    maxWidth: 420,
  },
  boxDnd: {
    borderWidth: 1,
  },
  text: {
    textAlign: 'center',
    fontFamily: theme.font.family,
    fontSize: theme.font.size,
    fontWeight: '300',
    lineHeight: theme.font.contentHeight,
    letterSpacing: theme.font.contentSpacing,
    color: theme.colors.mutedForeground,
  },
}));
