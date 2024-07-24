import {Trans} from '@lingui/macro';
import {View, ScrollView, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useLists} from 'tasks/hooks/useLists';
import {MenuHeader} from 'app/base/MenuHeader';
import {MenuFooter} from 'app/base/MenuFooter';
import {MenuSection} from 'app/base/MenuSection';
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
  const {styles, theme} = useStyles(stylesheet);

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
            tab={tabs}
          />
          <MenuItem
            path="/inbox"
            icon="ph:tray"
            label={<Trans>Inbox</Trans>}
            tab={tabs}
          />
          {tabs &&
            <View style={styles.spacer}/>
          }
          <MenuSection
            label={<Trans>Tools</Trans>}
            tabs={tabs}>
            <MenuItem
              path="/map"
              icon="ph:map-trifold"
              label={<Trans>Maps</Trans>}
              tab={tabs}
            />
            <MenuItem
              path="/events"
              icon="ph:calendar-dots"
              label={<Trans>Events</Trans>}
              tab={tabs}
            />
            <MenuItem
              path="/alarms"
              icon="ph:alarm"
              label={<Trans>Alarms</Trans>}
              tab={tabs}
            />
            <MenuItem
              path="/notes"
              icon="ph:note"
              label={<Trans>Notes</Trans>}
              tab={tabs}
            />
          </MenuSection>
          <MenuSection
            label={<Trans>Media</Trans>}
            tabs={tabs}>
            <MenuItem
              path="/files"
              icon="ph:folder"
              label={<Trans>Files</Trans>}
              tab={tabs}
            />
            <MenuItem
              path="/docs"
              icon="ph:file"
              label={<Trans>Docs</Trans>}
              tab={tabs}
            />
            <MenuItem
              path="/roms"
              icon="ph:game-controller"
              label={<Trans>Games</Trans>}
              tab={tabs}
            />
            <MenuItem
              path="/photos"
              icon="ph:image"
              label={<Trans>Photos</Trans>}
              tab={tabs}
            />
            <MenuItem
              path="/videos"
              icon="ph:video"
              label={<Trans>Videos</Trans>}
              tab={tabs}
            />
            <MenuItem
              path="/music"
              icon="ph:music-notes"
              label={<Trans>Music</Trans>}
              tab={tabs}
            />
          </MenuSection>
          <MenuSection
            label={<Trans>Favorites</Trans>}
            tabs={tabs}>
            {tabs ? null : lists.map(({id, complete}) =>
              <MenuItem
                key={id}
                path={`/note/${id}`}
                icon="ph:rocket"
                color={theme.palette.purple400}
                label={<Text>{id}</Text>}
                striked={complete}
              />
            )}
          </MenuSection>
          <View style={styles.spacer}/>
          {__DEV__ &&
            <MenuSection
              closed
              label={<Trans>Developer Mode</Trans>}
              tabs={tabs}>
              <MenuItem
                path="/design"
                icon="ph:palette"
                label={<Trans>Design</Trans>}
                tab={tabs}
              />
              <MenuItem
                path="/library"
                icon="ph:package"
                label={<Trans>Library</Trans>}
                tab={tabs}
              />
            </MenuSection>
          }
          <MenuItem
            path="/settings"
            icon="ph:gear"
            label={<Trans>Settings</Trans>}
            tab={tabs}
          />
          {!__DEV__ &&
            <View style={styles.footer}>
              <MenuFooter/>
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
