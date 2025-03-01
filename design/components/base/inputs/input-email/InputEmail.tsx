import {useVariants, createIcon} from 'react-exo/utils';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {View, TextInput, Text} from 'react-native';

export interface InputEmailProps {
  /** Text to display as a caption below the input field. */
  caption: string,
  /** Text to display as a label above the input field. */
  label: string,
  /** Placeholder text for the input field. */
  placeholder: string,
  /** Current state of the input field, which affects its styling and behavior. */
  state: typeof InputEmailVariants.state[number],
  /** Whether the caption should be displayed. */
  showCaption?: boolean,
  /** Whether the label should be displayed. */
  showLabel?: boolean,
  /** Optional icon to display within the input field. */
  icon?: JSX.Element,
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
}

export const InputEmailVariants = {
  state: ['Empty', 'Hover', 'Focused', 'FocusedFilled', 'Disabled'],
} as const;

/**
 * An email input field component that can optionally display a label and a caption.
 */
export function InputEmail(props: InputEmailProps) {
  const {state} = props;
  const {styles, theme} = useStyles(stylesheet);
  const {vstyles} = useVariants(InputEmailVariants, {state}, styles);

  return (
    <View style={vstyles.root()} testID={props.testID ?? "4107:142"}>
      {props.showLabel && 
        <Text style={vstyles.label()} testID="4107:144">
          {props.label}
        </Text>
      }
      <View style={vstyles.input()} testID="4107:145">
        {createIcon(props.icon, vstyles.phPlaceholder())}
        <TextInput
          style={styles.textinputEmail}
          testID="4107:147"
          inputMode="email"
          defaultValue={''}
          placeholder={props.placeholder}
          placeholderTextColor={theme.colors.mutedForeground}
        />
      </View>
      {props.showCaption && 
        <Text style={vstyles.caption()} testID="4107:148">
          {props.caption}
        </Text>
      }
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
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
  textinputEmail: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    color: theme.colors.mutedForeground,
    fontFamily: theme.font.family,
    fontSize: theme.font.inputSize,
    fontStyle: 'normal',
    fontWeight: theme.font.weight,
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
    borderWidth: 'unset' as any,
    borderStyle: 'unset' as any,
    borderColor: 'unset' as any,
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
    name: 'ph:envelope',
    color: theme.colors.secondaryForeground,
    size: 20,
  },
}));
