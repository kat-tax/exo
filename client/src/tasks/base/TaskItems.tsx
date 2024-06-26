import {useStyles, createStyleSheet} from 'design/styles';
import {Text, Pressable, ScrollView} from 'react-native';

interface TaskItemsProps {
  active: string[],
  complete: string[],
  addActive: (item: string) => void,
  addComplete: (item: string) => void,
}

export function TaskItems(props: TaskItemsProps) {
  const {styles} = useStyles(stylesheet);

  return (
    <ScrollView>
      {props.active?.map((item, index) =>
        <Pressable key={item} onPress={() => props.addComplete(item)}>
          <Text style={styles.text}>
            {`${index + 1}. `}
            {item}
          </Text>
        </Pressable>
      )}
      {props.complete?.map((item, index) =>
        <Pressable key={item} onPress={() => props.addActive(item)}>
          <Text style={[styles.text, styles.strike]}>
            {`${props.active.length + index + 1}. `}
            {item}
          </Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const stylesheet = createStyleSheet(theme => ({
  list: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 14,
    lineHeight: 24,
    color: theme.colors.foreground,
  },
  strike: {
    textDecorationLine: 'line-through',
  },
}));
