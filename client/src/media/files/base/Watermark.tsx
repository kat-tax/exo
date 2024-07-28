import {Icon} from 'react-exo/icon';
import {View, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {Button} from 'design';

interface WatermarkProps extends React.PropsWithChildren {
  title: string,
  label: string,
  icon: string,
  onAction: () => void,
}

export function Watermark(props: WatermarkProps) {
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.root}>
      <Text style={styles.text}>
        {props.title}
      </Text>
      <Button
        mode="Primary"
        state="Default"
        label={props.label}
        onPress={props.onAction}
        icon={<Icon name={props.icon}/>}
        showIcon
      />
      {props.children}
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.display.space5,
    marginBottom: theme.display.space9,
  },
  text: {
    fontFamily: theme.font.family,
    fontSize: theme.font.contentSize,
    fontWeight: theme.font.contentWeight,
    lineHeight: theme.font.contentHeight,
    letterSpacing: theme.font.contentSpacing,
    color: theme.colors.mutedForeground,
  },
}));
