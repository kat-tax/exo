import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {View, Text, Image} from 'react-native';

export interface ExoBannerProps {
  thumbnail: string,
  header: string,
  contents: string,
  footer: string,
}

export function ExoBanner(props: ExoBannerProps) {
  const {styles} = useStyles(stylesheet);
  return (
    <View style={styles.root}>
      <Image
        style={styles.thumbnail}
        source={{uri: props.thumbnail}}
        width={72}
        height={72}
      />
      <View style={styles.contents}>
        <Text style={styles.header}>
          {props.header}
        </Text>
        <Text style={styles.body}>
          {props.contents}
        </Text>
        <Text style={styles.footer}>
          {props.footer}
        </Text>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    padding: 16,
    rowGap: 16,
    columnGap: 16,
    borderWidth: 1,
    borderRadius: 6,
    borderStyle: 'solid',
    borderColor: theme.colors.border,
    backgroundColor: theme.colors.popover,
  },
  thumbnail: {
    width: 72,
    height: 72,
  },
  header: {
    color: theme.colors.cardForeground,
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 14,
  },
  body: {
    alignSelf: 'stretch',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 10,
    color: theme.colors.cardForeground,
  },
  footer: {
    alignSelf: 'stretch',
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 10,
    color: theme.colors.mutedForeground,
  },
  contents: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
    columnGap: 4,
    rowGap: 4,
  },
}));

