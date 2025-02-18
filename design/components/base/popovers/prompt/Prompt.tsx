import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {View, Text} from 'react-native';
import {Icon} from 'react-exo/icon';
import {Button} from 'components/base/pressables/button';

export interface PromptProps {
  /** The main message text of the prompt. */
  message: string,
  /** The title text of the prompt. */
  title: string,
  /** Optional flag to show a close button. */
  showClose?: boolean,
  /** Optional JSX element for a custom confirm button. */
  confirmButton?: JSX.Element,
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
}

/**
 * A prompt with a title, message, optional cancel, and a configurable submit button.
 * Meant to be used inside a modal, bottom sheet, or similar container.
 */
export function Prompt(props: PromptProps) {
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.root} testID={props.testID ?? "1034:553"}>
      <View style={styles.header} testID="1034:537">
        <Text style={styles.title} testID="1034:538">
          {props.title}
        </Text>
      </View>
      <Text style={styles.message} testID="1034:542">
        {props.message}
      </Text>
      <View style={styles.buttons} testID="1034:543">
        {props.showClose && 
          <View style={styles.cancel} testID="5759:459">
            {props.showClose && 
              <Button
                testID="1034:544"
                label="Cancel"
                mode="Text"
                state="Default"
                showIcon
                icon={
                  <Icon
                    name="ph:x"
                  />
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

const stylesheet = createStyleSheet(theme => ({
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
}));
