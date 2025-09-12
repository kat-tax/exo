import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {useLingui} from '@lingui/react/macro';
import {Identicon} from 'app/ui/identicon';
import {getProfile} from 'app/data/queries';
import {useQuery, useAppOwner} from 'app/data';

export function MenuHeader() {
  const {t} = useLingui();
  const profiles = useQuery(getProfile);
  const appOwner = useAppOwner();

  return (
    <View style={styles.root}>
      <View style={styles.head}>
        <Identicon id={appOwner?.id} size={22}/>
        <View style={styles.info}>
          <Text style={styles.name} selectable={false}>
            {profiles[0]?.name ?? t`Human`}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
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

