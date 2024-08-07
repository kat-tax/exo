import {View} from 'react-native';
import {Trans} from '@lingui/macro';
import {useStyles, createStyleSheet} from 'react-native-unistyles';

import {NavTabsItem} from './NavTabsItem';

export function NavTabs() {
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.root}>
      <NavTabsItem
        label={<Trans>Dashboard</Trans>}
        icon="ph:squares-four"
        path="/"
      />
      <NavTabsItem
        label={<Trans>Inbox</Trans>}
        icon="ph:tray"
        path="/inbox"
      />
      <NavTabsItem
        label={<Trans>Files</Trans>}
        icon="ph:folder"
        path="/browse"
      />
      <NavTabsItem
        label={<Trans>World</Trans>}
        icon="ph:globe"
        path="/world"
      />
      <NavTabsItem
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
