import {useVariants} from 'react-exo/utils';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {View, Text} from 'react-native';

export interface MessageProps {
  emote: string,
  message: string,
  timestamp: string,
  mode: typeof MessageVariants.mode[number],
  origin: typeof MessageVariants.origin[number],
  embed?: JSX.Element,
  /** Used to locate this view in end-to-end tests. */
  testID?: string,
}

export const MessageVariants = {
  mode: ['Default', 'Embedded', 'Middle', 'Start', 'End'],
  origin: ['Remote', 'Local'],
} as const;

export function Message(props: MessageProps) {
  const {origin, mode} = props;
  const {styles} = useStyles(stylesheet);
  const {vstyles} = useVariants(MessageVariants, {origin, mode}, styles);

  return (
    <View style={vstyles.root()} testID={props.testID ?? "6323:470"}>
      <View style={vstyles.embed()} testID="6326:511">
        {props.embed}
      </View>
      <View style={vstyles.content()} testID="6343:556">
        <View style={vstyles.text()} testID="6323:477">
          <Text style={vstyles.message()} testID="6323:472">
            {props.message}
          </Text>
          {Boolean(props.timestamp) && (
            <Text style={vstyles.timestamp()} testID="6323:475">
              {props.timestamp}
            </Text>
          )}
        </View>
        {Boolean(props.emote) && (
          <View style={vstyles.emotes()} testID="6330:519">
            <Text style={vstyles.emote()} testID="6331:520">
              {props.emote}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    paddingRight: 40,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  rootOriginLocalModeDefault: {
    paddingRight: 'unset' as any,
    paddingLeft: 40,
    alignItems: 'flex-end',
  },
  rootOriginLocalModeStart: {
    paddingRight: 'unset' as any,
    paddingLeft: 40,
    alignItems: 'flex-end',
  },
  rootOriginLocalModeMiddle: {
    paddingRight: 'unset' as any,
    paddingLeft: 40,
    alignItems: 'flex-end',
  },
  rootOriginLocalModeEnd: {
    paddingRight: 'unset' as any,
    paddingLeft: 40,
    alignItems: 'flex-end',
  },
  rootOriginLocalModeEmbedded: {
    paddingRight: 'unset' as any,
    paddingLeft: 40,
    alignItems: 'flex-end',
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
    rowGap: 0,
    columnGap: 10,
    flexWrap: 'wrap',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: theme.colors.secondary,
  },
  textOriginRemoteModeStart: {
    borderBottomLeftRadius: 2,
  },
  textOriginRemoteModeMiddle: {
    borderBottomLeftRadius: 2,
    borderTopLeftRadius: 2,
  },
  textOriginRemoteModeEnd: {
    borderTopLeftRadius: 2,
  },
  textOriginRemoteModeEmbedded: {
    borderTopLeftRadius: 1,
  },
  textOriginLocalModeDefault: {
    backgroundColor: theme.colors.info,
  },
  textOriginLocalModeStart: {
    borderBottomRightRadius: 2,
    backgroundColor: theme.colors.info,
  },
  textOriginLocalModeMiddle: {
    borderBottomRightRadius: 2,
    borderTopRightRadius: 2,
    backgroundColor: theme.colors.info,
  },
  textOriginLocalModeEnd: {
    borderTopRightRadius: 1,
    backgroundColor: theme.colors.info,
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
    right: 'unset' as any,
    left: 8,
  },
  emotesOriginLocalModeStart: {
    right: 'unset' as any,
    left: 8,
  },
  emotesOriginLocalModeMiddle: {
    right: 'unset' as any,
    left: 8,
  },
  emotesOriginLocalModeEnd: {
    right: 'unset' as any,
    left: 8,
  },
  emotesOriginLocalModeEmbedded: {
    right: 'unset' as any,
    left: 8,
  },
}));
