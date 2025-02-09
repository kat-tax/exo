import {Icon} from 'react-exo/icon';
import {View, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {Button} from 'design';

interface WatermarkProps extends React.PropsWithChildren {
  title: string,
  label: string,
  icon: string,
  dnd?: boolean,
  onAction?: () => void,
}

export function Watermark(props: WatermarkProps) {
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.root}>
      <View style={[styles.box, props.dnd && styles.boxDnd]}>
        <Text style={styles.text}>
          {props.title}
        </Text>
        <Button
          mode="Secondary"
          state="Default"
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

const stylesheet = createStyleSheet(theme => ({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    gap: theme.display.space5,
    padding: theme.display.space8,
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
    fontWeight: '100',
    lineHeight: theme.font.contentHeight,
    letterSpacing: theme.font.contentSpacing,
    color: theme.colors.mutedForeground,
  },
}));
