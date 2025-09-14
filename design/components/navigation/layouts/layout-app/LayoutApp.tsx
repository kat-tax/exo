import {useLingui} from '@lingui/react/macro';
import {StyleSheet} from 'react-native-unistyles';
import {View} from 'react-native';
import {Icon} from 'icons.tsx';

import {Button} from 'components/base/pressables/button';

import type {ViewStyle, StyleProp} from 'react-native';

export interface LayoutAppProps {
  boolean?: boolean,
  outlet?: React.ReactElement,
  /** Used to override the default root style. */
  style?: StyleProp<ViewStyle>,
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
}

export function LayoutApp(props: LayoutAppProps) {
  const {t} = useLingui();

  return (
    <View testID={props.testID ?? "4533:304"} style={[styles.root, props.style]}>
      <View testID="4533:529" style={styles.menu}>
        <Button testID="4533:550"
          style={styles.button}
          label={t`Signout`}
          mode="Secondary"
          state="Default"
          showIcon
          icon={
            <Icon name="ph:placeholder"/>
          }
        />
      </View>
      {props.outlet}
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  root: {
    flexDirection: 'row',
    width: 1280,
    height: 832,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: theme.colors.background,
  },
  button: {
    flexShrink: undefined,
    backgroundColor: undefined,
  },
  menu: {
    width: 200,
    paddingTop: 494,
    paddingLeft: 0,
    paddingBottom: 494,
    paddingRight: 0,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    rowGap: 10,
    columnGap: 10,
    flexShrink: 0,
    alignSelf: 'stretch',
    aspectRatio: '25 / 104',
    backgroundColor: 'rgba(37, 37, 37, 1)',
  },
  screenHome: {
    width: undefined,
    height: undefined,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    alignSelf: 'stretch',
  },
}));
