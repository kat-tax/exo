import {View} from 'react-native';
import {useLingui} from '@lingui/react/macro';
import {useCallback} from 'react';
import {useNavigate} from 'react-exo/navigation';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {InitDirectory} from 'media/dir/hfs/utils/path';
import {TextButton} from 'app/interface/base/TextButton';
import {IconButton} from 'app/interface/base/IconButton';
import {Icon} from 'react-exo/icon';

export interface ListBarProps {
  path: string,
  hidden: boolean,
  actions: {
    icon: string,
    onPress: () => void,
  }[],
}

export function ListBar({path, actions, hidden}: ListBarProps) {
  const {styles} = useStyles(stylesheet);
  return !hidden ? (
    <View style={styles.root}>
      <View style={styles.breadcrumbs}>
        {path.split('/').map((item, index, array) => (
          <View key={index} style={styles.breadcrumb}>
            <ListBarItem item={item} last={index === array.length - 1} />
            {index < array.length - 1 && <ListBarItemSeparator />}
          </View>
        ))}
      </View>
      <View style={styles.actions}>
        {actions.map(({icon, onPress}) => (
          <ListBarAction
            key={icon}
            icon={icon}
            onPress={onPress}
          />
        ))}
      </View>
    </View>
  ) : null;
}

export function ListBarItem({item, last}: {item: string, last: boolean}) {
  const {t} = useLingui();
  const nav = useNavigate();
  const title = useCallback((name: string) => {
    const dir = name as InitDirectory;
    switch (dir) {
      case InitDirectory.Documents:
        return t`Documents`;
      case InitDirectory.Music:
        return t`Music`;
      case InitDirectory.Pictures:
        return t`Pictures`;
      case InitDirectory.Videos:
        return t`Videos`;
      case InitDirectory.Games:
        return t`Games`;
      case InitDirectory.Books:
        return t`Books`;
      case InitDirectory.Downloads:
        return t`Downloads`;
      case InitDirectory.Uploads:
        return t`Uploads`;
      default: dir satisfies never;
        return dir || t`Files`;
    }
  }, [t]);

  return (
    <TextButton
      label={title(item)}
      state={last ? 'Default' : 'Disabled'}
      onPress={() => nav(item)}
    />
  );
}

export function ListBarItemSeparator() {
  const {styles, theme} = useStyles(stylesheet);
  return (
    <View tabIndex={-1} style={styles.separator}>
      <Icon
        name="ph:caret-right"
        color={theme.colors.mutedForeground}
        size={10}
      />
    </View>
  );
}

export function ListBarAction({icon, onPress}: {icon: string, onPress: () => void}) {
  return (
    <IconButton
      icon={icon}
      state="Default"
      onPress={onPress}
    />
  );
}

const stylesheet = createStyleSheet((theme) => ({
  root: {
    height: 32,
    paddingVertical: theme.display.space2,
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  breadcrumbs: {
    flexDirection: 'row',
    alignItems: 'center',
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: 0,
  },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actions: {
    flexDirection: 'row',
    paddingTop: 1,
    paddingLeft: 1,
    paddingBottom: 1,
    paddingRight: 1,
    alignItems: 'center',
    rowGap: 8,
    columnGap: 8,
  },
  separator: {
    width: 10,
    height: 10,
  },
}));
