import {useCallback, useEffect, useRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFocusable, FocusContext} from '@noriginmedia/norigin-spatial-navigation';
import {useNavigate} from 'react-exo/navigation';
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
  actions?: Array<ListBarAction>,
}

export interface ListBarAction {
  id: string,
  icon: string,
  onPress: () => void,
}

export function ListBar({path, actions}: ListBarProps) {
  const items = path?.split('/');
  const scroll = useRef<ScrollView>(null);
  const {styles} = useStyles(stylesheet);
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
              <ListBarItem name="Files" path="/browse"/>
              <ListBarItemSeparator/>
            </>
          ) : null}
          {items?.map((name, index, array) => {
            const path = array.slice(0, index + 1).join('/');
            const last = index === array.length - 1;
            return (
              <View key={path} style={styles.breadcrumb}>
                <ListBarItem {...{name, path, last, scroll}}/>
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

export function ListBarItem({name, path, last, scroll}: {
  name?: string,
  path?: string,
  last?: boolean,
  scroll?: React.RefObject<ScrollView>,
}) {
  const {t} = useLingui();
  const nav = useNavigate();
  const goto = useCallback(() => nav(path ?? name ?? '/browse'), [nav, path, name]);
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
      label={title(name)}
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
  const {ref, focused} = useFocusable({
    onEnterPress: onPress,
    focusKey: `bar@${id}`,
  });

  return (
    <ButtonIcon
      vref={ref}
      icon={icon}
      size={ICON_SIZE}
      state={focused ? 'Focused' : 'Default'}
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
    paddingHorizontal: TOUCH ? theme.display.space3 : 6,
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
    gap: TOUCH ? theme.display.space3 : theme.display.space2,
  },
  separator: {
    width: 10,
    height: 10,
  },
}));
