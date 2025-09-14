import {useVariants} from 'react-exo/utils';
import {StyleSheet} from 'react-native-unistyles';
import {View, Text} from 'react-native';

import type {ViewStyle, StyleProp} from 'react-native';

export interface MessageProps {
  emote: string,
  message: string,
  timestamp: string,
  mode: typeof MessageVariants.mode[number],
  origin: typeof MessageVariants.origin[number],
  avatar?: React.ReactElement,
  embed?: React.ReactElement,
  /** Used to override the default root style. */
  style?: StyleProp<ViewStyle>,
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
}

export const MessageVariants = {
  mode: ['Default', 'Embedded', 'Middle', 'Start', 'End'],
  origin: ['Remote', 'Local'],
} as const;

export function Message(props: MessageProps) {
  const {origin, mode} = props;
  const {vstyles} = useVariants(MessageVariants, {origin, mode}, styles);

  return (
    <View testID={props.testID ?? "6434:126"} style={[vstyles.root(), props.style]}>
      <View testID="6434:128" style={vstyles.embed()}>
        {props.embed}
      </View>
      <View testID="6434:130" style={vstyles.content()}>
        <View testID="6434:131" style={vstyles.text()}>
          <Text testID="6434:132" style={vstyles.message()}>
            {props.message}
          </Text>
          <Text testID="6434:133" style={vstyles.timestamp()}>
            {props.timestamp}
          </Text>
        </View>
        <View testID="6434:134" style={vstyles.emotes()}>
          <Text testID="6434:135" style={vstyles.emote()}>
            {props.emote}
          </Text>
        </View>
        <View testID="6434:136" style={vstyles.avatar()}>
          {props.avatar}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create(theme => ({
  root: {
    paddingRight: 40,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  rootOriginLocalModeDefault: {
    paddingRight: undefined,
    paddingLeft: 40,
    alignItems: 'flex-end',
  },
  rootOriginLocalModeStart: {
    paddingRight: undefined,
    paddingLeft: 40,
    alignItems: 'flex-end',
  },
  rootOriginLocalModeMiddle: {
    paddingRight: undefined,
    paddingLeft: 40,
    alignItems: 'flex-end',
  },
  rootOriginLocalModeEnd: {
    paddingRight: undefined,
    paddingLeft: 40,
    alignItems: 'flex-end',
  },
  rootOriginLocalModeEmbedded: {
    paddingRight: undefined,
    paddingLeft: 40,
    alignItems: 'flex-end',
  },
  placeholder: {
    flexGrow: undefined,
    flexShrink: undefined,
    flexBasis: undefined,
    alignSelf: undefined,
    width: 140,
    height: 32,
  },
  placeholderOriginLocalModeDefault: {
    flexGrow: undefined,
    flexShrink: undefined,
    flexBasis: undefined,
    alignSelf: undefined,
    opacity: 0.3,
    backgroundColor: 'lightgray',
  },
  placeholderOriginRemoteModeStart: {
    flexGrow: undefined,
    flexShrink: undefined,
    flexBasis: undefined,
    alignSelf: undefined,
    opacity: 0.3,
    backgroundColor: 'lightgray',
  },
  placeholderOriginLocalModeStart: {
    flexGrow: undefined,
    flexShrink: undefined,
    flexBasis: undefined,
    alignSelf: undefined,
    opacity: 0.3,
    backgroundColor: 'lightgray',
  },
  placeholderOriginRemoteModeMiddle: {
    flexGrow: undefined,
    flexShrink: undefined,
    flexBasis: undefined,
    alignSelf: undefined,
    opacity: 0.3,
    backgroundColor: 'lightgray',
  },
  placeholderOriginLocalModeMiddle: {
    flexGrow: undefined,
    flexShrink: undefined,
    flexBasis: undefined,
    alignSelf: undefined,
    opacity: 0.3,
    backgroundColor: 'lightgray',
  },
  placeholderOriginRemoteModeEnd: {
    flexGrow: undefined,
    flexShrink: undefined,
    flexBasis: undefined,
    alignSelf: undefined,
    opacity: 0.3,
    backgroundColor: 'lightgray',
  },
  placeholderOriginLocalModeEnd: {
    flexGrow: undefined,
    flexShrink: undefined,
    flexBasis: undefined,
    alignSelf: undefined,
    opacity: 0.3,
    backgroundColor: 'lightgray',
  },
  placeholderOriginRemoteModeEmbedded: {
    flexGrow: undefined,
    flexShrink: undefined,
    flexBasis: undefined,
    alignSelf: undefined,
    opacity: 0.3,
    backgroundColor: 'lightgray',
  },
  placeholderOriginLocalModeEmbedded: {
    flexGrow: undefined,
    flexShrink: undefined,
    flexBasis: undefined,
    alignSelf: undefined,
    opacity: 0.3,
    backgroundColor: 'lightgray',
  },
  embed: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 10,
    columnGap: 10,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  message: {
    color: theme.colors.secondaryForeground,
    fontFamily: theme.font.family,
    fontSize: theme.font.contentSize,
    fontStyle: 'normal',
    fontWeight: theme.font.contentWeight,
    lineHeight: theme.font.contentHeight,
    letterSpacing: theme.font.contentSpacing,
  },
  messageOriginLocalModeDefault: {
    color: theme.palette.white,
  },
  messageOriginLocalModeStart: {
    color: theme.palette.white,
  },
  messageOriginLocalModeMiddle: {
    color: theme.palette.white,
  },
  messageOriginLocalModeEnd: {
    color: theme.palette.white,
  },
  messageOriginLocalModeEmbedded: {
    color: theme.palette.white,
  },
  timestamp: {
    color: theme.colors.mutedForeground,
    textAlign: 'right',
    fontFamily: theme.font.family,
    fontSize: 10,
    fontStyle: 'normal',
    fontWeight: theme.font.weight,
    lineHeight: 20,
    letterSpacing: theme.font.spacing,
  },
  timestampOriginLocalModeDefault: {
    color: theme.palette.blue200,
  },
  timestampOriginLocalModeStart: {
    color: theme.palette.blue200,
  },
  timestampOriginLocalModeMiddle: {
    color: theme.palette.blue200,
  },
  timestampOriginLocalModeEnd: {
    color: theme.palette.blue200,
  },
  timestampOriginLocalModeEmbedded: {
    color: theme.palette.blue200,
  },
  content: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    rowGap: 10,
    columnGap: 10,
  },
  text: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    alignContent: 'flex-end',
    rowGap: 10,
    columnGap: 10,
    flexWrap: 'wrap',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: theme.colors.secondary,
  },
  textOriginLocalModeDefault: {
    backgroundColor: theme.colors.info,
  },
  textOriginRemoteModeStart: {
    borderBottomLeftRadius: 2,
  },
  textOriginLocalModeStart: {
    borderBottomRightRadius: 2,
    backgroundColor: theme.colors.info,
  },
  textOriginRemoteModeMiddle: {
    borderBottomLeftRadius: 2,
    borderTopLeftRadius: 2,
  },
  textOriginLocalModeMiddle: {
    borderBottomRightRadius: 2,
    borderTopRightRadius: 2,
    backgroundColor: theme.colors.info,
  },
  textOriginRemoteModeEnd: {
    borderTopLeftRadius: 2,
  },
  textOriginLocalModeEnd: {
    borderTopRightRadius: 1,
    backgroundColor: theme.colors.info,
  },
  textOriginRemoteModeEmbedded: {
    borderTopLeftRadius: 1,
  },
  textOriginLocalModeEmbedded: {
    borderTopRightRadius: 1,
    backgroundColor: theme.colors.info,
  },
  emote: {
    color: 'rgba(255, 255, 255, 1)',
    fontFamily: theme.font.family,
    fontSize: 18,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 19,
    letterSpacing: theme.font.spacing,
  },
  emotes: {
    flexDirection: 'row',
    paddingTop: 3,
    paddingLeft: 4,
    paddingBottom: 1,
    paddingRight: 4,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 8,
    bottom: -21,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.background,
    backgroundColor: theme.colors.accent,
  },
  emotesOriginLocalModeDefault: {
    right: undefined,
    left: 8,
  },
  avatar: {
    flexDirection: 'row',
    width: 30,
    height: 30,
    alignItems: 'flex-start',
    position: 'absolute',
    left: -16,
    top: -18,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.colors.background,
    backgroundColor: theme.colors.primaryForeground,
  },
  avatarOriginLocalModeDefault: {
    left: undefined,
    right: -17,
  },
}));
