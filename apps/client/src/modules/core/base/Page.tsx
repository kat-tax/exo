import {View, Text} from 'react-native';
import {SafeAreaView} from 'react-exo/safearea';

import type {ReactNode} from 'react';

export interface PageProps {
  title: string | ReactNode,
  children?: ReactNode,
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
