import {StyleSheet} from 'react-native-unistyles';
import {View, ScrollView} from 'react-native';
import {useEffect, useRef} from 'react';
import {useFocusable, FocusContext} from '@noriginmedia/norigin-spatial-navigation';
import {useLingui} from '@lingui/react/macro';

import {BarPath} from './path';
import {BarAction} from './action';
import {BarSeparator} from './separator';

import type {BarActionProps} from './action';
import type {DeviceId} from 'app/data/types';

const ITEM_SIZE = __TOUCH__ ? 46 : 36;

export interface BarProps {
  paths?: Array<[name: string, path: string]>;
  actions?: Array<BarActionProps>,
  deviceId?: DeviceId | null;
  deviceName?: string | null;
}

export function Bar({paths, actions, deviceId, deviceName}: BarProps) {
  const {t} = useLingui();
  const scroll = useRef<ScrollView>(null);
  const {ref, focusKey} = useFocusable({
    saveLastFocusedChild: false,
    focusBoundaryDirections: ['left', 'right'],
    //preferredChildFocusKey: `bar@${!paths?.length ? '%device%' : paths?.at(-1)?.[1]}`,
  });

  // Scroll to end when paths change
  useEffect(() => {
    scroll.current?.scrollToEnd({animated: true})
  }, [paths]);

  // Scroll with wheel
  useEffect(() => {
    if (!__WEB__) return;
    if (!scroll.current) return;
    const element = scroll.current.getScrollableNode?.();
    const handleWheel = (event: WheelEvent) => {
      if (scroll.current && event.deltaY !== 0) {
        element.scrollLeft += event.deltaY;
        event.preventDefault();
      }
    };
    element?.addEventListener('wheel', handleWheel, {passive: false});
    return () => element?.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <FocusContext.Provider value={focusKey}>
      <View ref={ref} style={styles.root}>
        <View style={styles.breadcrumbs}>
          <ScrollView
            ref={scroll}
            horizontal
            contentContainerStyle={styles.breadcrumbsContent}
            showsHorizontalScrollIndicator={false}>
            <BarPath
              name={t`Files`}
              deviceId={deviceId}
              last={!paths}
            />
            {paths &&
              <>
                <BarSeparator/>
                <BarPath
                  name={deviceName ?? t`Local`}
                  deviceId={deviceId}
                  path=""
                  last={paths.length === 0}
                />
                {paths.length > 0 &&
                  <BarSeparator/>
                }
              </>
            }
            {paths?.map(([name, path], index, array) => {
              const last = index === array.length - 1;
              return (
                <View key={path} style={styles.breadcrumb}>
                  <BarPath {...{name, path, last, deviceId}}/>
                  {index < array.length - 1 && <BarSeparator/>}
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View style={styles.actions}>
          {actions?.map(({id, icon, onPress, items}) => (
            <BarAction key={id} {...{id, icon, onPress, items}}/>
          ))}
        </View>
      </View>
    </FocusContext.Provider>
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
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  breadcrumbsContent: {
    flexDirection: 'row',
    alignItems: 'center',
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
}));
