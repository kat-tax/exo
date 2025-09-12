import {View, TextInput, Text} from 'react-native';
import {StyleSheet, withUnistyles} from 'react-native-unistyles';
import {useVariants, createIcon} from 'react-exo/utils';

export interface InputPasswordProps {
  /** Text to display as a caption below the input field. */
  caption: string,
  /** Text to display as a label above the input field. */
  label: string,
  /** Placeholder text for the input field. */
  placeholder: string,
  /** Current state of the input field, which affects its styling and behavior. */
  state: typeof InputPasswordVariants.state[number],
  /** Determines if the caption should be displayed. */
  showCaption?: boolean,
  /** Determines if the label should be displayed. */
  showLabel?: boolean,
  /** Optional icon to display within the input field. */
  icon?: React.ReactElement,
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
}

export const InputPasswordVariants = {
  state: ['Empty', 'Hover', 'Focused', 'FocusedFilled', 'Disabled'],
} as const;

/**
 * A password input field component that can optionally display a label and a caption.
 */
export function InputPassword(props: InputPasswordProps) {
  const {state} = props;
  const {vstyles} = useVariants(InputPasswordVariants, {state}, styles);

  return (
    <View style={vstyles.root()} testID={props.testID ?? "4029:244"}>
      {props.showLabel &&
        <Text style={vstyles.label()} testID="4029:246">
          {props.label}
        </Text>
      }
      <View style={vstyles.input()} testID="4029:247">
        {createIcon(props.icon, vstyles.phPlaceholder())}
        <UniTextInput
          style={styles.textinputText}
          testID="4029:249"
          inputMode="text"
          defaultValue={''}
          placeholder={props.placeholder}
          secureTextEntry
        />
      </View>
      {props.showCaption &&
        <Text style={vstyles.caption()} testID="4029:250">
          {props.caption}
        </Text>
      }
    </View>
  );
}

const UniTextInput = withUnistyles(TextInput, (theme) => ({
  placeholderTextColor: theme.colors.mutedForeground,
}));

const styles = StyleSheet.create((theme) => ({
  root: {
    width: 264,
    minHeight: 36,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    gap: theme.display.space3,
  },
  label: {
    height: 20,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignSelf: 'stretch',
    color: theme.colors.foreground,
    fontFamily: theme.font.family,
    fontSize: theme.font.labelSize,
    fontStyle: 'normal',
    fontWeight: theme.font.labelWeight,
    lineHeight: theme.font.labelHeight,
  },
  labelStateDisabled: {
    opacity: 0.5,
  },
  textinputText: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    color: theme.colors.mutedForeground,
    fontFamily: theme.font.family,
    fontSize: theme.font.inputSize,
    fontStyle: 'normal',
    fontWeight: theme.font.inputWeight,
    lineHeight: theme.font.inputHeight,
    letterSpacing: theme.font.inputSpacing,
  },
  input: {
    flexDirection: 'row',
    height: 36,
    minHeight: 36,
    paddingTop: 0,
    paddingLeft: theme.display.space3,
    paddingBottom: 0,
    paddingRight: theme.display.space3,
    alignItems: 'center',
    gap: theme.display.space2,
    alignSelf: 'stretch',
    borderRadius: theme.display.radius3,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.input,
    shadowColor: 'rgba(0, 0, 0, 0.12156862765550613)',
    shadowRadius: 2,
    shadowOffset: {"width":0,"height":1},
  },
  inputStateHover: {
    borderColor: theme.colors.ring,
  },
  inputStateFocused: {
    borderColor: theme.colors.outline,
  },
  inputStateFocusedFilled: {
    borderColor: theme.colors.outline,
  },
  inputStateDisabled: {
    borderWidth: undefined,
    borderStyle: undefined,
    borderColor: undefined,
    opacity: 0.5,
  },
  caption: {
    alignSelf: 'stretch',
    color: theme.colors.foreground,
    fontFamily: theme.font.family,
    fontSize: theme.font.contentSize,
    fontStyle: 'normal',
    fontWeight: theme.font.contentWeight,
    lineHeight: theme.font.contentHeight,
    letterSpacing: theme.font.contentSpacing,
    opacity: 0.5,
  },
  phPlaceholder: {
    name: 'ph:lock',
    color: theme.colors.secondaryForeground,
    size: 20,
  },
}));
