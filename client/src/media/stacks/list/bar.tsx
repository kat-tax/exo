import {Icon} from 'react-exo/icon';
import {Motion} from 'react-exo/motion';
import {StyleSheet} from 'react-native-unistyles';
import {useNavigation} from '@react-navigation/native';
import {View, ScrollView} from 'react-native';
import {useEffect, useRef, useState, useCallback} from 'react';
import {useFocusable, FocusContext} from '@noriginmedia/norigin-spatial-navigation';
import {useLingui} from '@lingui/react/macro';
import {useMediaName} from 'media/hooks/use-media-name';
import {MenuDropdown} from 'app/ui/float';
import {ButtonText} from 'app/ui/button/text';
import {ButtonIcon} from 'app/ui/button/icon';
import {PathId} from 'app/data/types';

import type {MenuDropdownItem} from 'app/ui/float/menu-dropdown';
import type {DeviceId} from 'app/data/types';

const ITEM_SIZE = __TOUCH__ ? 46 : 36;
const ICON_SIZE = __TOUCH__ ? 18 : 16;
const TEXT_SIZE = __TOUCH__ ? 14 : 12;
const SEPARATOR_SIZE = __TOUCH__ ? 14 : 10;

export interface ListBarProps {
  paths?: Array<[name: string, path: string]>;
  actions?: Array<ListBarAction>,
  deviceId?: DeviceId | null;
}

export interface ListBarAction {
  id: string,
  icon: string,
  onPress?: () => void,
  items?: Array<MenuDropdownItem | undefined | false>,
}

export function ListBar({paths, actions, deviceId}: ListBarProps) {
  const {t} = useLingui();
  const scroll = useRef<ScrollView>(null);
  const {ref, focusKey} = useFocusable({
    preferredChildFocusKey: `bar@${paths?.at(-1)?.[1]}`,
    saveLastFocusedChild: false,
  });

  // biome-ignore lint/correctness/useExhaustiveDependencies: explicit
  useEffect(() => {
    scroll.current?.scrollToEnd({animated: true});
  }, [paths]);

  return (
    <FocusContext.Provider value={focusKey}>
      <View ref={ref} style={styles.root}>
        <ScrollView
          ref={scroll}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.breadcrumbs}>
          {paths ? (
            <>
              <ListBarItem
                name={t`Files`}
                path=""
                deviceId={deviceId}
              />
              {paths.length > 0 && <ListBarItemSeparator/>}
            </>
          ) : null}
          {paths?.map(([name, path], index, array) => {
            const last = index === array.length - 1;
            return (
              <View key={path} style={styles.breadcrumb}>
                <ListBarItem {...{name, path, last, deviceId}}/>
                {index < array.length - 1 && <ListBarItemSeparator/>}
              </View>
            );
          })}
        </ScrollView>
        <View style={styles.actions}>
          {actions?.map(({id, icon, onPress, items}) => (
            <ListBarAction key={id} {...{id, icon, onPress, items}}/>
          ))}
        </View>
      </View>
    </FocusContext.Provider>
  );
}

export function ListBarItem({name, path, last, deviceId}: {
  name: string,
  path: string,
  last?: boolean,
  deviceId?: DeviceId | null,
}) {
  const title = useMediaName(name);
  const nav = useNavigation();
  const open = useCallback(() => {
    if (deviceId) {
      let pathId: PathId | undefined = undefined;
      const _pathId = PathId.from(path);
      if (_pathId.ok) pathId = _pathId.value;
      nav.navigate('MediaBrowseEvolu', {pathId, deviceId});
    } else {
      nav.navigate('MediaBrowseLocal', {path});
    }
  }, [deviceId, path, nav]);

  const {ref, focused} = useFocusable({
    focusKey: `bar@${path}`,
    onEnterPress: open,
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
      onPress={open}
      state={focused
        ? 'Focused'
        : last
          ? 'Default'
          : 'Disabled'
      }
    />
  );
}

export function ListBarAction({id, icon, onPress, items}: ListBarAction) {
  const [open, setOpen] = useState(false);
  const {ref, focused} = useFocusable({
    onEnterPress: () => {
      if (items) {
        setOpen(true);
      } else {
        onPress?.();
      }
    },
    focusKey: `bar@${id}`,
  });

  const button = items ? (
    <Motion.View
      ref={ref}
      initial={{rotate: '0deg'}}
      animate={{rotate: open ? '45deg' : '0deg'}}
      transition={{type: 'spring', speed: 100}}>
      <ButtonIcon
        icon={icon}
        size={ICON_SIZE}
        state={focused ? 'Focused' : 'Default'}
      />
    </Motion.View>
  ) : (
    <View ref={ref}>
      <ButtonIcon
        icon={icon}
        size={ICON_SIZE}
        state={focused ? 'Focused' : 'Default'}
        onPress={onPress}
      />
    </View>
  );

  if (items) {
    return (
      <MenuDropdown label={id} open={open} onOpenChange={setOpen} items={items}>
        {button}
      </MenuDropdown>
    );
  }

  return button;
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
    width: SEPARATOR_SIZE,
    height: 10,
  },
}));
