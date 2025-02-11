import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useNavigate} from 'react-exo/navigation';
import {useCallback} from 'react';
import {useLingui} from '@lingui/react/macro';
import {isTouch} from 'react-exo/utils';
import {Icon} from 'react-exo/icon';
import {View, ScrollView} from 'react-native';
import {ButtonText} from 'app/stacks/button/text';
import {ButtonIcon} from 'app/stacks/button/icon';
import {InitDirectory} from 'media/dir/utils/hfs/path';

const TOUCH = isTouch();
const ITEM_SIZE = TOUCH ? 46 : 32;
const ICON_SIZE = TOUCH ? 18 : 16;
const TEXT_SIZE = TOUCH ? 14 : 11;

export interface ListBarProps {
  path?: string,
  actions?: {
    icon: string,
    onPress: () => void,
  }[],
}

export function ListBar({path, actions}: ListBarProps) {
  const {styles} = useStyles(stylesheet);
  const tabs = path?.split('/');
  return (
    <View style={styles.root}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.breadcrumbs}>
        {path ? (
          <>
            <ListBarItem name="Files" path="/browse"/>
            <ListBarItemSeparator/>
          </>
        ) : null}
        {tabs?.map((name, index, array) => (
          <View key={index} style={styles.breadcrumb}>
            <ListBarItem
              name={name}
              path={tabs.slice(0, index + 1).join('/')}
              last={index === array.length - 1}
            />
            {index < array.length - 1 && <ListBarItemSeparator/>}
          </View>
        ))}
      </ScrollView>
      <View style={styles.actions}>
        {actions?.map(({icon, onPress}) => (
          <ListBarAction key={icon} {...{icon, onPress}}/>
        ))}
      </View>
    </View>
  );
}

export function ListBarItem({name, path, last}: {
  name?: string,
  path?: string,
  last?: boolean,
}) {
  const {t} = useLingui();
  const nav = useNavigate();
  const title = useCallback((n?: string) => {
    const dir = n as InitDirectory;
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
    <ButtonText
      label={title(name)}
      size={TEXT_SIZE}
      onPress={() => {
        nav(path ?? name ?? '/browse');
      }}
      state={last ? 'Default' : 'Disabled'}
    />
  );
}

export function ListBarAction({icon, onPress}: {icon: string, onPress: () => void}) {
  return (
    <ButtonIcon
      icon={icon}
      size={ICON_SIZE}
      state="Default"
      onPress={onPress}
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

const stylesheet = createStyleSheet((theme) => ({
  root: {
    height: ITEM_SIZE,
    paddingVertical: theme.display.space2,
    paddingHorizontal: 6,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  breadcrumbs: {
    height: ITEM_SIZE,
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
    marginLeft: theme.display.space1,
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
