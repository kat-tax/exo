import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useVariants} from 'react-exo/utils';
import {View, Text} from 'react-native';

export interface StatusProps {
  /** The value to display within the status component. */
  value: string,
  /** The visual mode of the component, determining its styling. */
  mode: typeof StatusVariants.mode[number],
  /** Whether the value should be displayed. */
  hasValue?: boolean,
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
}

export const StatusVariants = {
  mode: ['Default', 'Info', 'Success', 'Warning', 'Error'],
} as const;

/**
 * A component that renders an alert with configurable properties.
 */
export function Status(props: StatusProps) {
  const {mode} = props;
  const {styles} = useStyles(stylesheet);
  const {vstyles} = useVariants(StatusVariants, {mode}, styles);

  return (
    <View style={vstyles.root()} testID={props.testID ?? "5235:309"}>
      {props.hasValue && 
        <View style={vstyles.content()} testID="5235:304">
          <Text style={vstyles.value()} testID="5235:303">
            {props.value}
          </Text>
        </View>
      }
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    height: 16,
    minWidth: 16,
    minHeight: 6,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
    borderBottomLeftRadius: 9999,
    borderBottomRightRadius: 9999,
    borderTopLeftRadius: 9999,
    borderTopRightRadius: 9999,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.popoverForeground,
  },
  rootModeInfo: {
    borderColor: theme.palette.blue600,
    backgroundColor: theme.colors.info,
  },
  rootModeSuccess: {
    borderColor: theme.palette.green600,
    backgroundColor: theme.colors.success,
  },
  rootModeWarning: {
    borderColor: theme.palette.yellow600,
    backgroundColor: theme.colors.warning,
  },
  rootModeError: {
    borderColor: theme.palette.red600,
    backgroundColor: theme.colors.destructive,
  },
  value: {
    color: theme.colors.popover,
    textAlign: 'center',
    fontFamily: 'Inter',
    fontSize: 9,
    fontStyle: 'normal',
    fontWeight: '500',
    lineHeight: 10,
  },
  valueModeInfo: {
    color: theme.colors.destructiveForeground,
  },
  valueModeSuccess: {
    color: theme.colors.destructiveForeground,
  },
  valueModeWarning: {
    color: theme.colors.destructiveForeground,
  },
  valueModeError: {
    color: theme.colors.destructiveForeground,
  },
  content: {
    flexDirection: 'row',
    paddingTop: 0,
    paddingLeft: theme.display.space1,
    paddingBottom: 0,
    paddingRight: theme.display.space1,
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
