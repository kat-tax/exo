import {useLingui} from '@lingui/react/macro';
import {StyleSheet} from 'react-native-unistyles';
import {View} from 'react-native';
import {Icon} from 'react-exo/icon';

import {Button} from 'components/base/pressables/button';
import {InputEmail} from 'components/base/inputs/input-email';
import {InputPassword} from 'components/base/inputs/input-password';

import type {ViewStyle, StyleProp} from 'react-native';

export interface LoginProps {
  /** Used to override the default root style. */
  style?: StyleProp<ViewStyle>,
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
}

export function Login(props: LoginProps) {
  const {t} = useLingui();

  return (
    <View testID={props.testID ?? "4089:70"} style={[styles.root, props.style]}>
      <View testID="4552:140" style={styles.contents}>
        <View testID="4552:141" style={styles.inputs}>
          <InputEmail testID="4089:125"
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
          <InputPassword testID="4109:116"
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
        </View>
        <View testID="4533:248" style={styles.buttons}>
          <Button testID="4089:132"
            label={t`Login`}
            mode="Primary"
            state="Default"
            showIcon
            icon={
              <Icon name="ph:sign-in"/>
            }
          />
          <Button testID="4533:244"
            label={t`Create Account`}
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
  contents: {
    maxWidth: 400,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.display.space6,
  },
  inputs: {
    maxWidth: 320,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: theme.display.space5,
    alignSelf: 'stretch',
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
    borderColor: theme.colors.primary,
    backgroundColor: theme.colors.primary,
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
