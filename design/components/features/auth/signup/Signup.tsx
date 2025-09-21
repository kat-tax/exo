import {useLingui} from '@lingui/react/macro';
import {StyleSheet} from 'react-native-unistyles';
import {View} from 'react-native';
import {Icon} from 'react-exo/icon';

import {Button} from 'components/base/pressables/button';
import {InputEmail} from 'components/base/inputs/input-email';
import {InputPassword} from 'components/base/inputs/input-password';

import type {ViewStyle, StyleProp} from 'react-native';

export interface SignupProps {
  /** Used to override the default root style. */
  style?: StyleProp<ViewStyle>,
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
}

export function Signup(props: SignupProps) {
  const {t} = useLingui();

  return (
    <View testID={props.testID ?? "4552:242"} style={[styles.root, props.style]}>
      <View testID="4552:214" style={styles.contents}>
        <View testID="8740:416" style={styles.inputs}>
          <InputEmail testID="4552:219"
            style={styles.email}
            caption={t`Caption`}
            label={t`Email`}
            placeholder={t`user@example.com`}
            state="Empty"
            showCaption={false}
            showLabel
            icon={
              <Icon name="ph:envelope"/>
            }
          />
          <InputPassword testID="4552:220"
            style={styles.password}
            caption={t`Caption`}
            label={t`Password`}
            placeholder={t`password`}
            state="Empty"
            showCaption={false}
            showLabel
            icon={
              <Icon name="ph:lock"/>
            }
          />
          <InputPassword testID="4552:251"
            style={styles.confirm}
            caption={t`Caption`}
            label={t`Confirm`}
            placeholder={t`password`}
            state="Empty"
            showCaption={false}
            showLabel
            icon={
              <Icon name="ph:lock"/>
            }
          />
        </View>
        <View testID="4552:221" style={styles.buttons}>
          <Button testID="4552:223"
            label={t`Create Account`}
            mode="Primary"
            state="Default"
            showIcon
            icon={
              <Icon name="ph:sign-in"/>
            }
          />
          <Button testID="4552:222"
            label={t`Login`}
            mode="Text"
            state="Default"
            showIcon
            icon={
              <Icon name="ph:user-plus"/>
            }
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  root: {
    flexDirection: 'row',
    padding: theme.display.space4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background,
  },
  email: {
    width: undefined,
    alignSelf: 'stretch',
  },
  password: {
    width: undefined,
    alignSelf: 'stretch',
  },
  confirm: {
    width: undefined,
    alignSelf: 'stretch',
  },
  contents: {
    maxWidth: 400,
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.display.space6,
  },
  inputs: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: theme.display.space5,
    alignSelf: 'stretch',
  },
  signup: {
    flexDirection: 'row',
    height: 36,
    paddingTop: 0,
    paddingLeft: theme.display.space4,
    paddingBottom: 0,
    paddingRight: theme.display.space4,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.display.space2,
    borderRadius: theme.display.radius3,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
  },
  login: {
    flexDirection: 'row',
    height: 36,
    paddingTop: 0,
    paddingLeft: theme.display.space4,
    paddingBottom: 0,
    paddingRight: theme.display.space4,
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.display.space2,
    borderRadius: theme.display.radius3,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgba(0, 0, 0, 0)',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    rowGap: 10,
    columnGap: 10,
  },
}));
