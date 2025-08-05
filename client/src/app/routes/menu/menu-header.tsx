import {View, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useQuery} from '@evolu/react';
import {useAppOwner} from '@evolu/react';
import {getProfile} from 'app/data';
import {Identicon} from 'app/stacks/identicon';

export function MenuHeader() {
  const {styles} = useStyles(stylesheet);
  const profiles = useQuery(getProfile);
  const appOwner = useAppOwner();

  return (
    <View style={styles.root}>
      <View style={styles.head}>
        <Identicon id={appOwner?.id} width={22} height={22}/>
        <View style={styles.info}>
          <Text style={styles.name} selectable={false}>
            {profiles[0]?.name ?? ''}
          </Text>
        </View>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet(theme => ({
  root: {
    marginVertical: theme.display.space4,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.display.space2,
    paddingHorizontal: theme.display.space2,
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.display.space1,
  },
  name: {
    userSelect: 'none',
    fontWeight: '500',
    fontFamily: theme.font.family,
    fontSize: theme.font.contentSize,
    lineHeight: theme.font.contentHeight,
    letterSpacing: theme.font.contentSpacing,
    color: theme.colors.foreground,
  },
}));

