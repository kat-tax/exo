import {Trans} from '@lingui/macro';
import {View, ScrollView, Text} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {StorageIndicator} from 'media/interface/StorageIndicator';
import {useFileSystem} from 'media/hooks/useFileSystem';
import {useLists} from 'media/hooks/useLists';

import {NavMenuItem} from './NavMenuItem';
import {NavMenuHeader} from './NavMenuHeader';
import {NavMenuSection} from './NavMenuSection';

import type {useProfile} from 'app/data';

export interface NavMenuProps {
  profile?: ReturnType<typeof useProfile>,
}

export function NavMenu(props: NavMenuProps) {
  const lists = useLists();
  const {importFile} = useFileSystem();
  const {styles, theme} = useStyles(stylesheet);

  return (
    <View style={styles.bg}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.root}>
          <NavMenuHeader {...props}/>
          <NavMenuItem
            label={<Trans>Dashboard</Trans>}
            icon="ph:squares-four"
            path="/"
          />
          <NavMenuItem
            label={<Trans>Inbox</Trans>}
            icon="ph:tray"
            path="/inbox"
          />
          <NavMenuSection
            label={<Trans>Media</Trans>}
            action={{
              label: 'Import Files',
              icon: 'ph:upload',
              onPress: importFile,
            }}>
            <NavMenuItem
              label={<Trans>Files</Trans>}
              icon="ph:folder"
              path="/browse"
            />
            <NavMenuItem
              label={<Trans>Docs</Trans>}
              icon="ph:file-text"
              path="/browse/documents"
            />
            <NavMenuItem
              label={<Trans>Music</Trans>}
              icon="ph:music-notes"
              path="/browse/music"
            />
            <NavMenuItem
              label={<Trans>Pictures</Trans>}
              icon="ph:image"
              path="/browse/pictures"
            />
            <NavMenuItem
              label={<Trans>Movies</Trans>}
              icon="ph:video"
              path="/browse/videos"
            />
            <NavMenuItem
              label={<Trans>Games</Trans>}
              icon="ph:game-controller"
              path="/browse/games"
            />
            <NavMenuItem
              label={<Trans>Books</Trans>}
              icon="ph:book-open-text"
              path="/browse/books"
            />
          </NavMenuSection>
          <NavMenuSection label={<Trans>World</Trans>}>
            <NavMenuItem
              label={<Trans>Map</Trans>}
              icon="ph:map-trifold"
              path="/map"
            />
            <NavMenuItem
              label={<Trans>News</Trans>}
              icon="ph:rss"
              path="/news"
            />
            <NavMenuItem
              label={<Trans>Calendar</Trans>}
              icon="ph:calendar-dots"
              path="/calendar"
            />
          </NavMenuSection>
          <NavMenuSection label={<Trans>Favorites</Trans>}>
            {lists.map(({id}) =>
              <NavMenuItem
                key={id}
                label={<Text>{id}</Text>}
                color={theme.palette.purple400}
                icon="ph:rocket"
                path={`/note/${id}`}
                mode="subitem"
              />
            )}
          </NavMenuSection>
          {__DEV__ &&
            <NavMenuSection label={<Trans>Dev Mode</Trans>} closed>
              <NavMenuItem
                label={<Trans>Design</Trans>}
                icon="ph:palette"
                path="/design"
              />
              <NavMenuItem
                label={<Trans>Library</Trans>}
                icon="ph:package"
                path="/library"
              />
            </NavMenuSection>
          }
          <View style={styles.spacer}/>
          <View style={styles.footer}>
            <StorageIndicator actions={
              <NavMenuItem
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
