import {useState, useEffect} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {getDiskSpace} from 'react-exo/fs';
import {View, Text} from 'react-native';
import {Progress} from 'react-exo/progress';
import {bytesize} from 'app/utils/formatting';

interface StorageWidgetProps {
  actions?: React.ReactNode,
}

export function StorageWidget(props: StorageWidgetProps) {
  const [storage, setStorage] = useState<{msg: string, val: number}>();
  const {styles, theme} = useStyles(stylesheet);

  useEffect(() => {
    getDiskSpace().then(e => setStorage({
      msg: `${bytesize(e.used)} / ${bytesize(e.total)}`,
      val: (e.used / e.total) * 100,
    }));
  });

  return (
    <View style={styles.root}>
      <View style={styles.bar}>
        <Progress
          fullWidth
          progress={storage?.val ?? 0}
          progressColor={theme.colors.mutedForeground}
          style={{height: 6, backgroundColor: theme.colors.muted}}
        />
      </View>
      <View style={styles.info}>
        <Text
          style={styles.text}
          selectable={false}
          numberOfLines={1}>
          {storage?.msg ?? '0GB / 0GB'}
        </Text>
        {props.actions}
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    flexDirection: 'column',
    gap: theme.display.space1,
  },
  bar: {
    paddingHorizontal: theme.display.space1,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: theme.display.space1,
  },
  text: {
    fontSize: 9,
    fontFamily: theme.font.family,
    lineHeight: theme.font.height,
    fontWeight: theme.font.weight,
    letterSpacing: theme.font.spacing,
    color: theme.colors.mutedForeground,
  },
}));

