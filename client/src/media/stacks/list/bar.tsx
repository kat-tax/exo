import {Icon} from 'react-exo/icon';
import {Motion} from 'react-exo/motion';
import {StyleSheet} from 'react-native-unistyles';
import {View, ScrollView} from 'react-native';
import {useCallback, useEffect, useRef, useState} from 'react';
import {useFocusable, FocusContext} from '@noriginmedia/norigin-spatial-navigation';
import {useLingui} from '@lingui/react/macro';
import {useNavigation} from '@react-navigation/native';
import {useMediaName} from 'media/hooks/use-media-name';
import {MenuDropdown} from 'app/ui/float';
import {ButtonText} from 'app/ui/button/text';
import {ButtonIcon} from 'app/ui/button/icon';

const ITEM_SIZE = __TOUCH__ ? 46 : 32;
const ICON_SIZE = __TOUCH__ ? 18 : 16;
const TEXT_SIZE = __TOUCH__ ? 14 : 11;

export interface ListBarProps {
  path?: string,
  actions?: Array<ListBarAction>,
}

export interface ListBarAction {
  id: string,
  icon: string,
  onPress: () => void,
}

export function ListBar({path, actions}: ListBarProps) {
  const {t} = useLingui();
  const items = path?.split('/');
  const scroll = useRef<ScrollView>(null);
  const {ref, focusKey} = useFocusable({
    preferredChildFocusKey: `bar@${path}`,
    saveLastFocusedChild: false,
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: explicit
  useEffect(() => {
    scroll.current?.scrollToEnd({animated: true});
  }, [path]);

  return (
    <FocusContext.Provider value={focusKey}>
      <View ref={ref} style={styles.root}>
        <ScrollView
          ref={scroll}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.breadcrumbs}>
          {path ? (
            <>
              <ListBarItem name={t`Files`} path=""/>
              <ListBarItemSeparator/>
            </>
          ) : null}
          {items?.map((name, index, array) => {
            const path = [...array.slice(0, index + 1)].join('/');
            const last = index === array.length - 1;
            return (
              <View key={path} style={styles.breadcrumb}>
                <ListBarItem {...{name, path, last}}/>
                {index < array.length - 1 && <ListBarItemSeparator/>}
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.actions}>
          {actions?.map(({id, icon, onPress}) => (
            <ListBarAction key={id} {...{id, icon, onPress}}/>
          ))}
        </View>
      </View>
    </FocusContext.Provider>
  );
}

export function ListBarItem({name, path, last}: {
  name?: string,
  path?: string,
  last?: boolean,
}) {
  const title = useMediaName(name);
  const nav = useNavigation();
  const goto = useCallback(() => nav.navigate('MediaBrowse', {
    path: path ?? name ?? '',
    backend: 'local',
  }), [nav, path, name]);

  const {ref, focused} = useFocusable({
    focusKey: `bar@${path}`,
    onEnterPress: goto,
    onFocus: () => {
      // TODO: scroll to the item once flashlist is used
      // scroll?.current?.scrollTo({x: layout.x, animated: true});
    },
  });

  return (
    <ButtonText
      vref={ref}
      label={title}
      size={TEXT_SIZE}
      onPress={goto}
      state={focused
        ? 'Focused'
        : last
          ? 'Default'
          : 'Disabled'
      }
    />
  );
}

export function ListBarAction({id, icon, onPress}: ListBarAction) {
  const [open, setOpen] = useState(false);
  const {ref, focused} = useFocusable({
    onEnterPress: () => setOpen(true),
    focusKey: `bar@${id}`,
  });

  return (
    <MenuDropdown label={id} open={open} onOpenChange={setOpen} items={[
      {
        name: 'new-folder',
        label: 'New Folder',
        icon: 'ph:folder-plus',
        action: onPress,
      },
      {
        name: 'divider',
        label: '-',
      },
      {
        name: 'import',
        label: 'Import…',
        icon: 'ph:upload',
        sub: [
          {
            name: 'import-folder',
            label: 'Folder',
            icon: 'ph:folder',
            action: onPress,
          },
          {
            name: 'import-files',
            label: 'Files',
            icon: 'ph:file',
            action: onPress,
          },
          {
            name: 'import-camera',
            label: 'Cam',
            icon: 'ph:camera',
            action: onPress,
          },
        ],
      },
    ]}>
      <Motion.View
        ref={ref}
        initial={{rotate: '0deg'}}
        animate={{rotate: open ? '45deg' : '0deg'}}
        transition={{type: 'spring', speed: 100}}>
        <ButtonIcon
          icon={icon}
          size={ICON_SIZE}
          state={focused ? 'Focused' : 'Default'}
          onPress={onPress}
        />
      </Motion.View>
    </MenuDropdown>
  );
}

export function ListBarItemSeparator() {
  return (
    <View tabIndex={-1} style={styles.separator}>
      <Icon
        name="ph:caret-right"
        size={10}
        uniProps={(theme) => ({
          color: theme.colors.mutedForeground,
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    height: ITEM_SIZE,
    paddingVertical: theme.display.space2,
    paddingHorizontal: __TOUCH__ ? theme.display.space3 : 6,
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
    gap: __TOUCH__ ? theme.display.space3 : theme.display.space2,
  },
  separator: {
    width: 10,
    height: 10,
  },
}));
