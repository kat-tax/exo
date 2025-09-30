import {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {getDiskSpace} from 'react-exo/fs';
import {bytesize} from 'app/lib/format';
import {Progress} from 'app/ui/base';

interface MenuFooterProps {
  actions?: React.ReactNode,
}

export function MenuFooter(props: MenuFooterProps) {
  const [storage, setStorage] = useState<{msg: string, val: number}>();

  useEffect(() => {
    const updateStorage = () => {
      getDiskSpace().then(e => {
        setStorage(prev => {
          const val = (e.used / e.total) * 100;
          if (prev?.val === val) return prev;
          return {val, msg: `${bytesize(e.used)} / ${bytesize(e.total)}`};
        });
      });
    };
    updateStorage();
    const i = setInterval(updateStorage, 5 * 1000);
    return () => clearInterval(i);
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.bar}>
        <Progress
          fullWidth
          progress={storage?.val ?? 0}
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

const styles = StyleSheet.create((theme) => ({
  root: {
    flexDirection: 'column',
    gap: theme.display.space2,
    marginTop: theme.display.space5,
    marginBottom: theme.display.space2,
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
    fontSize: __TOUCH__ ? 11 : 9,
    fontFamily: theme.font.family,
    lineHeight: theme.font.height,
    fontWeight: theme.font.weight,
    letterSpacing: theme.font.spacing,
    color: theme.colors.mutedForeground,
  },
}));

