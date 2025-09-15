import {useLingui} from '@lingui/react/macro';
import {StyleSheet} from 'react-native-unistyles';
import {View, Text} from 'react-native';
import {Icon} from 'react-exo/icon';

import {Button} from 'components/base/pressables/button';

import type {ViewStyle, StyleProp} from 'react-native';

export interface PromptProps {
  /** The main message text of the prompt. */
  message: string,
  /** The title text of the prompt. */
  title: string,
  /** Optional flag to show a close button. */
  showClose?: boolean,
  /** Optional JSX element for a custom confirm button. */
  confirmButton?: React.ReactElement,
  /** Used to override the default root style. */
  style?: StyleProp<ViewStyle>,
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
}

/**
 * A prompt with a title, message, optional cancel, and a configurable submit button.
 * Meant to be used inside a modal, bottom sheet, or similar container.
 */
export function Prompt(props: PromptProps) {
  const {t} = useLingui();

  return (
    <View testID={props.testID ?? "1034:553"} style={[styles.root, props.style]}>
      <View testID="1034:537" style={styles.header}>
        <Text testID="1034:538"
          style={styles.title}
          selectable={false}>
          {props.title}
        </Text>
      </View>
      <Text testID="1034:542" style={styles.message}>
        {props.message}
      </Text>
      <View testID="1034:543" style={styles.buttons}>
        {props.showClose &&
          <View testID="5759:459" style={styles.cancel}>
            {props.showClose &&
              <Button testID="1034:544"
                label={t`Cancel`}
                mode="Text"
                state="Default"
                showIcon
                icon={
                  <Icon name="ph:x"/>
                }
              />
            }
          </View>
        }
        {props.confirmButton}
      </View>
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  root: {
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
  title: {
    alignSelf: 'stretch',
    color: theme.colors.popoverForeground,
    fontFamily: theme.font.family,
    fontSize: theme.font.titleSize,
    fontStyle: 'normal',
    fontWeight: theme.font.titleWeight,
    lineHeight: theme.font.titleHeight,
    letterSpacing: theme.font.titleSpacing,
  },
  header: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  message: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    alignSelf: 'stretch',
    color: theme.colors.mutedForeground,
    fontFamily: theme.font.family,
    fontSize: theme.font.contentSize,
    fontStyle: 'normal',
    fontWeight: theme.font.contentWeight,
    lineHeight: theme.font.contentHeight,
    letterSpacing: theme.font.contentSpacing,
  },
  button: {
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
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: theme.display.space2,
    alignSelf: 'stretch',
  },
  cancel: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button2: {
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
}));
