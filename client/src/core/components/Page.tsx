import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-exo/safearea';

export interface PageProps {
  title: string | React.ReactNode,
  children?: React.ReactNode,
}

export function Page(props: PageProps) {
  const showHeader = false;
  return (
    <SafeAreaView>
      <View>
        {showHeader &&
          <Text>
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
