import {View} from 'react-native';
import {useLingui} from '@lingui/react/macro';
import {useStyles, createStyleSheet} from 'react-native-unistyles';

import {TabsItem} from './TabsItem';

export function Tabs() {
  const {styles} = useStyles(stylesheet);
  const {t} = useLingui();

  return (
    <View style={styles.root}>
      <TabsItem
        label={t`Dashboard`}
        icon="ph:squares-four"
        path="/"
      />
      <TabsItem
        label={t`Inbox`}
        icon="ph:tray"
        path="/inbox"
      />
      <TabsItem
        label={t`Files`}
        icon="ph:folder"
        path="/browse"
      />
      <TabsItem
        label={t`World`}
        icon="ph:globe"
        path="/world"
      />
      <TabsItem
        label={t`Settings`}
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
