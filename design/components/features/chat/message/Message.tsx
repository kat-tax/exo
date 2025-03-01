import {useVariants} from 'react-exo/utils';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {View, Text} from 'react-native';

export interface MessageProps {
  emote: string,
  message: string,
  timestamp: string,
  mode: typeof MessageVariants.mode[number],
  origin: typeof MessageVariants.origin[number],
  avatar?: JSX.Element,
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
    <View style={vstyles.root()} testID={props.testID ?? "6434:126"}>
      <View style={vstyles.embed()} testID="6434:128">
        {props.embed}
      </View>
      <View style={vstyles.content()} testID="6434:130">
        <View style={vstyles.text()} testID="6434:131">
          <Text style={vstyles.message()} testID="6434:132">
            {props.message}
          </Text>
          <Text style={vstyles.timestamp()} testID="6434:133">
            {props.timestamp}
          </Text>
        </View>
        <View style={vstyles.emotes()} testID="6434:134">
          <Text style={vstyles.emote()} testID="6434:135">
            {props.emote}
          </Text>
        </View>
        <View style={vstyles.avatar()} testID="6434:136">
          {props.avatar}
        </View>
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
    right: 'unset' as any,
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
    left: 'unset' as any,
    right: -17,
  },
}));
