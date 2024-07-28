import {Trans} from '@lingui/macro';
import {View, ScrollView, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useFileSystem} from 'app/hooks/useFileSystem';
import {useLists} from 'media/files/hooks/useLists';
import {MenuHeader} from 'app/base/MenuHeader';
import {MenuSection} from 'app/base/MenuSection';
import {WidgetStorage} from 'app/base/WidgetStorage';
import {MenuItem} from 'app/base/MenuItem';
import {isTouch} from 'app/utils/platform';

import type {useProfile} from 'app/data';

export interface MenuProps {
  profile?: ReturnType<typeof useProfile>,
  tabs?: boolean,
}

export function Menu(props: MenuProps) {
  const lists = useLists();
  const {tabs} = props;
  const {importFile} = useFileSystem();
  const {styles, theme} = useStyles(stylesheet);
  const itemMode = tabs ? 'tab' : 'default';

  return (
    <View style={styles.bg}>
      <ScrollView horizontal={tabs} contentContainerStyle={{flexGrow: 1}}>
        <View style={[styles.root, tabs && styles.rootTabs]}>
          {!tabs &&
            <MenuHeader {...props}/>
          }
          <MenuItem
            path="/"
            icon="ph:squares-four"
            label={<Trans>Dashboard</Trans>}
            mode={itemMode}
          />
          <MenuItem
            path="/inbox"
            icon="ph:tray"
            label={<Trans>Inbox</Trans>}
            mode={itemMode}
          />
          {tabs &&
            <View style={styles.spacer}/>
          }
          <MenuSection
            label={<Trans>Media</Trans>}
            mode={itemMode}
            action={{
              icon: 'ph:upload',
              label: 'Import Files',
              onPress: importFile,
            }}>
            <MenuItem
              path="/browse"
              icon="ph:folder"
              label={<Trans>Files</Trans>}
              mode={itemMode}
            />
            <MenuItem
              path="/browse/documents"
              icon="ph:file-text"
              label={<Trans>Docs</Trans>}
              mode={itemMode}
            />
            <MenuItem
              path="/browse/music"
              icon="ph:music-notes"
              label={<Trans>Music</Trans>}
              mode={itemMode}
            />
            <MenuItem
              path="/browse/pictures"
              icon="ph:image"
              label={<Trans>Pictures</Trans>}
              mode={itemMode}
            />
            <MenuItem
              path="/browse/videos"
              icon="ph:video"
              label={<Trans>Movies</Trans>}
              mode={itemMode}
            />
            <MenuItem
              path="/browse/games"
              icon="ph:game-controller"
              label={<Trans>Games</Trans>}
              mode={itemMode}
            />
            <MenuItem
              path="/browse/books"
              icon="ph:book-open-text"
              label={<Trans>Books</Trans>}
              mode={itemMode}
            />
          </MenuSection>
          <MenuSection
            label={<Trans>World</Trans>}
            mode={itemMode}>
            <MenuItem
              path="/news"
              icon="ph:rss"
              label={<Trans>News</Trans>}
              mode={itemMode}
            />
            <MenuItem
              path="/maps"
              icon="ph:map-trifold"
              label={<Trans>Maps</Trans>}
              mode={itemMode}
            />
            <MenuItem
              path="/events"
              icon="ph:calendar-dots"
              label={<Trans>Events</Trans>}
              mode={itemMode}
            />
            <MenuItem
              path="/alarms"
              icon="ph:alarm"
              label={<Trans>Alarms</Trans>}
              mode={itemMode}
            />
          </MenuSection>
          <MenuSection
            label={<Trans>Favorites</Trans>}
            mode={itemMode}>
            {tabs ? null : lists.map(({id}) =>
              <MenuItem
                key={id}
                path={`/note/${id}`}
                icon="ph:rocket"
                color={theme.palette.purple400}
                label={<Text>{id}</Text>}
                mode="subitem"
              />
            )}
          </MenuSection>
          {__DEV__ &&
            <MenuSection
              closed
              label={<Trans>Dev Mode</Trans>}
              mode={itemMode}>
              <MenuItem
                path="/design"
                icon="ph:palette"
                label={<Trans>Design</Trans>}
                mode={itemMode}
              />
              <MenuItem
                path="/library"
                icon="ph:package"
                label={<Trans>Library</Trans>}
                mode={itemMode}
              />
            </MenuSection>
          }
          <View style={styles.spacer}/>
          {tabs
            ? <MenuItem
                path="/settings"
                icon="ph:gear"
                label={<Trans>Settings</Trans>}
                mode={itemMode}
              />
            : <View style={styles.footer}>
                <WidgetStorage actions={
                  <MenuItem
                    path="/settings"
                    icon="ph:gear"
                    label={<Trans>Settings</Trans>}
                    mode="action"
                  />
                }/>
              </View>
          }
        </View>
      </ScrollView>
    </View>
  );
}

const stylesheet = createStyleSheet((theme, rt) => ({
  bg: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  root: {
    flex: 1,
    padding: 10,
    borderColor: theme.colors.border,
    borderRightWidth: rt.rtl ? 0 : rt.hairlineWidth,
    borderLeftWidth: rt.rtl ? rt.hairlineWidth : 0,
  },
  rootTabs: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.display.space2,
    borderTopWidth: rt.hairlineWidth,
    borderRightWidth: 0,
    borderLeftWidth: 0,
  },
  footer: {
    gap: theme.display.space2,
    marginTop: theme.display.space5,
    display: {
      initial: 'none',
      xs: 'flex',
    },
  },
  spacer: {
    flex: 1,
    display: {
      initial: 'none',
      xs: 'flex',
    },
  },
  build: {
    color: theme.colors.mutedForeground,
    fontFamily: theme.font.family,
    fontWeight: '500',
    fontSize: 9,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
    ...isTouch() && {
      fontSize: theme.font.contentSize,
      lineHeight: theme.font.contentHeight,
      letterSpacing: theme.font.contentSpacing,
    },
  },
}));
