import {View} from 'react-native';
import {Trans} from '@lingui/macro';
import {useStyles, createStyleSheet} from 'react-native-unistyles';

import {TabsItem} from './TabsItem';

export function Tabs() {
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.root}>
      <TabsItem
        label={<Trans>Dashboard</Trans>}
        icon="ph:squares-four"
        path="/"
      />
      <TabsItem
        label={<Trans>Inbox</Trans>}
        icon="ph:tray"
        path="/inbox"
      />
      <TabsItem
        label={<Trans>Files</Trans>}
        icon="ph:folder"
        path="/browse"
      />
      <TabsItem
        label={<Trans>World</Trans>}
        icon="ph:globe"
        path="/world"
      />
      <TabsItem
        label={<Trans>Settings</Trans>}
        icon="ph:gear"
        path="/settings"
      />
    </View>
  );
}

const stylesheet = createStyleSheet((theme, rt) => ({
  root: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: theme.colors.border,
    borderTopWidth: rt.hairlineWidth,
    backgroundColor: theme.colors.background,
  },
}));
