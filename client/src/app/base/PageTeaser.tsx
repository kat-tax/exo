import {Trans} from '@lingui/macro';
import {View, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'design/styles';

export interface PageTeaserProps {
  title?: string | React.ReactNode,
}

export function PageTeaser(props: PageTeaserProps) {
  const {styles} = useStyles(stylesheet);
  return (
    <View style={styles.root}>
      {props.title &&
        <Text style={styles.header}>
          {props.title}
        </Text>
      }
      <Text style={styles.message}>
        <Trans>Coming Soon</Trans>
      </Text>
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    flex: 1,
    maxWidth: 980,
    gap: theme.display.space5,
    padding: theme.display.space5,
    backgroundColor: theme.colors.background,
  },
  header: {
    fontSize: theme.font.headerSize,
    fontWeight: theme.font.headerWeight,
    lineHeight: theme.font.headerHeight,
    letterSpacing: theme.font.headerSpacing,
    color: theme.colors.foreground,
  },
  message: {
    fontSize: theme.font.contentSize,
    fontWeight: theme.font.contentWeight,
    lineHeight: theme.font.contentHeight,
    letterSpacing: theme.font.contentSpacing,
    color: theme.colors.mutedForeground,
  },
}));
