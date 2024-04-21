import {useStyles, createStyleSheet} from 'design/styles';
import {Text, Pressable, ScrollView} from 'react-native';

interface TasksListProps {
  active: string[],
  complete: string[],
  addActive: (item: string) => void,
  addComplete: (item: string) => void,
}

export function TasksList(props: TasksListProps) {
  const {styles} = useStyles(stylesheet);

  return (
    <ScrollView>
      {props.active?.map((item, index) =>
        <Pressable key={item} onPress={() => props.addComplete(item)}>
          <Text style={styles.text}>
            {`${index + 1}. `}
          </Text>
          <Text style={styles.text}>
            {item}
          </Text>
        </Pressable>
      )}
      {props.complete?.map((item, index) =>
        <Pressable key={item} onPress={() => props.addActive(item)}>
          <Text style={[styles.text, styles.strike]}>
            {`${props.active.length + index + 1}. `}
          </Text>
          <Text style={styles.text}>
            {item}
          </Text>
        </Pressable>
      )}
    </ScrollView>
  );
}

const stylesheet = createStyleSheet(_theme => ({
  list: {
    flex: 1,
    width: '100%',
    height: '100%',
    marginVertical: 12,
    marginHorizontal: 6,
  },
  text: {
    color: '#000',
    fontSize: 16,
    lineHeight: 36,
  },
  strike: {
    textDecorationLine: 'line-through',
  },
}));
