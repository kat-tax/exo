import {useLingui} from '@lingui/react/macro';
import {StyleSheet} from 'react-native-unistyles';
import {View} from 'react-native';
import {Icon} from 'react-exo/icon';

import {Prompt} from 'components/base/popovers/prompt';
import {Button} from 'components/base/pressables/button';

import type {ViewStyle, StyleProp} from 'react-native';

export interface LogoutProps {
  /** Used to override the default root style. */
  style?: StyleProp<ViewStyle>,
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
}

export function Logout(props: LogoutProps) {
  const {t} = useLingui();

  return (
    <View testID={props.testID ?? "4428:130"} style={[styles.root, props.style]}>
      <Prompt testID="4427:124"
        message={t`This will clear all session data. Are you sure you would like to proceed?`}
        title={t`Logout?`}
        showClose
        confirmButton={
          <Button testID="2028:426"
            label="Logout"
            mode="Destructive"
            state="Default"
            showIcon
            icon={
              <Icon name="ph:sign-out"/>
            }
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  root: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    alignSelf: 'stretch',
  },
  prompt: {
    minWidth: 320,
    minHeight: 200,
    padding: theme.display.space5,
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.display.space2,
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    alignSelf: 'stretch',
    backgroundColor: theme.colors.popover,
  },
}));
