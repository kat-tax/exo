import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-exo/safearea';
import {useStyles, createStyleSheet} from 'design/styles';

export interface PageProps {
  title?: string | React.ReactNode,
  children?: React.ReactNode,
}

export function Page(props: PageProps) {
  const {styles} = useStyles(stylesheet);
  return (
    <SafeAreaView>
      <View style={styles.root}>
        {props.title &&
          <Text style={styles.header}>
            {props.title}
          </Text>
        }
        <View>
          {props.children}
        </View>
      </View>
    </SafeAreaView>
  );
}

const stylesheet = createStyleSheet(_theme => ({
  root: {
    flex: 1,
    padding: 24,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
}));
