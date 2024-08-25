import {Trans} from '@lingui/macro';
import {View, ScrollView} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {StorageWidget} from 'media/stacks/StorageWidget';
import {useImporter} from 'media/hooks/useImporter';

import {MenuItem} from './MenuItem';
import {MenuHeader} from './MenuHeader';
import {MenuSection} from './MenuSection';

import type {useProfile} from 'app/data';

export interface MenuProps {
  profile?: ReturnType<typeof useProfile>,
}

export function Menu(props: MenuProps) {
  const {importFolder} = useImporter();
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.bg}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.root}>
          <MenuHeader {...props}/>
          <MenuItem
            label={<Trans>Dashboard</Trans>}
            icon="ph:squares-four"
            path="/"
          />
          <MenuItem
            label={<Trans>Inbox</Trans>}
            icon="ph:tray"
            path="/inbox"
          />
          <MenuSection
            label={<Trans>Media</Trans>}
            action={{
              label: 'Import Files',
              icon: 'ph:upload',
              onPress: importFolder,
            }}>
            <MenuItem
              label={<Trans>Files</Trans>}
              icon="ph:folder"
              path="/browse"
            />
            <MenuItem
              label={<Trans>Docs</Trans>}
              icon="ph:file-text"
              path="/browse/documents"
            />
            <MenuItem
              label={<Trans>Music</Trans>}
              icon="ph:music-notes"
              path="/browse/music"
            />
            <MenuItem
              label={<Trans>Pictures</Trans>}
              icon="ph:image"
              path="/browse/pictures"
            />
            <MenuItem
              label={<Trans>Movies</Trans>}
              icon="ph:video"
              path="/browse/videos"
            />
            <MenuItem
              label={<Trans>Games</Trans>}
              icon="ph:game-controller"
              path="/browse/games"
            />
            <MenuItem
              label={<Trans>Books</Trans>}
              icon="ph:book-open-text"
              path="/browse/books"
            />
          </MenuSection>
          <MenuSection label={<Trans>World</Trans>}>
            <MenuItem
              label={<Trans>Map</Trans>}
              icon="ph:map-trifold"
              path="/map"
            />
            <MenuItem
              label={<Trans>News</Trans>}
              icon="ph:rss"
              path="/news"
            />
            <MenuItem
              label={<Trans>Calendar</Trans>}
              icon="ph:calendar-dots"
              path="/calendar"
            />
          </MenuSection>
          {/* <MenuSection label={<Trans>Favorites</Trans>}>
            {lists.map(({id}) =>
              <MenuItem
                key={id}
                label={<Text>{id}</Text>}
                color={theme.palette.purple400}
                icon="ph:rocket"
                path={`/note/${id}`}
                mode="subitem"
              />
            )}
          </MenuSection> */}
          {__DEV__ &&
            <MenuSection label={<Trans>Dev Mode</Trans>} closed>
              <MenuItem
                label={<Trans>Design</Trans>}
                icon="ph:palette"
                path="/design"
              />
              <MenuItem
                label={<Trans>Library</Trans>}
                icon="ph:package"
                path="/library"
              />
            </MenuSection>
          }
          <View style={styles.spacer}/>
          <View style={styles.footer}>
            <StorageWidget actions={
              <MenuItem
                label={<Trans>Storage</Trans>}
                icon="ph:hard-drives"
                path="/storage"
                mode="action"
              />
            }/>
          </View>
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
    flexDirection: 'column',
    paddingStart: theme.display.space2,
    borderStartWidth: rt.hairlineWidth,
    borderColor: theme.colors.border,
  },
  footer: {
    gap: theme.display.space2,
    marginTop: theme.display.space5,
    marginBottom: theme.display.space2,
  },
  spacer: {
    flex: 1,
  },
}));
