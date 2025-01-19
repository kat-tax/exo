import {View, ScrollView} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useLingui} from '@lingui/react/macro';
import {useHfsImporter} from 'media/dir/hfs';
import {StorageWidget} from 'media/stacks/StorageWidget';

import {MenuItem} from './MenuItem';
import {MenuHeader} from './MenuHeader';
import {MenuSection} from './MenuSection';

import type {AppContext} from 'app/hooks/useAppContext';

export interface MenuProps {
  context: AppContext,
}

export function Menu(props: MenuProps) {
  const {filesystem} = props.context;
  const {importFile} = useHfsImporter();
  const {styles} = useStyles(stylesheet);
  const {t} = useLingui();

  return (
    <View style={styles.bg}>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View style={styles.root}>
          <MenuHeader {...props}/>
          <MenuItem
            label={t`Dashboard`}
            icon="ph:squares-four"
            path="/"
          />
          <MenuItem
            label={t`Inbox`}
            icon="ph:tray"
            path="/inbox"
          />
          <MenuSection
            label={t`Media`}
            actions={[
              {
                id: 'create-folder',
                icon: 'ph:folder-simple-plus',
                label: t`Create Folder`,
                onPress: () => {
                  const name = prompt(t`Enter folder name`);
                  if (name) {
                    filesystem?.createDirectory?.(name);
                  }
                },
              },
              {
                id: 'import',
                icon: 'ph:upload',
                label: t`Import Files`,
                onPress: importFile,
              },
            ]}>
            <MenuItem
              label={t`Files`}
              icon="ph:folder"
              path="/browse"
            />
            <MenuItem
              label={t`Docs`}
              icon="ph:file-text"
              path="/browse/documents"
            />
            <MenuItem
              label={t`Music`}
              icon="ph:music-notes"
              path="/browse/music"
            />
            <MenuItem
              label={t`Pictures`}
              icon="ph:image"
              path="/browse/pictures"
            />
            <MenuItem
              label={t`Videos`}
              icon="ph:video"
              path="/browse/videos"
            />
            <MenuItem
              label={t`Games`}
              icon="ph:game-controller"
              path="/browse/games"
            />
            <MenuItem
              label={t`Books`}
              icon="ph:book-open-text"
              path="/browse/books"
            />
          </MenuSection>
          <MenuSection label={t`World`}>
            <MenuItem
              label={t`Map`}
              icon="ph:map-trifold"
              path="/map"
            />
            <MenuItem
              label={t`News`}
              icon="ph:rss"
              path="/news"
            />
            <MenuItem
              label={t`Calendar`}
              icon="ph:calendar-dots"
              path="/calendar"
            />
          </MenuSection>
          {/* <MenuSection label={t`Social`}>
            <MenuItem
              label={t`Live`}
              icon="ph:video"
              path="/live"
            />
          </MenuSection> */}
          {/* <MenuSection label={t`Favorites`}>
            {lists.map(({id}) =>
              <MenuItem
                key={id}
                label={id}
                icon="ph:rocket"
                path={`/note/${id}`}
                mode="subitem"
              />
            )}
          </MenuSection> */}
          {__DEV__ &&
            <MenuSection label={t`Dev Mode`} closed>
              <MenuItem
                label={t`Design`}
                icon="ph:palette"
                path="/design"
              />
              <MenuItem
                label={t`Library`}
                icon="ph:package"
                path="/library"
              />
            </MenuSection>
          }
          <View style={styles.spacer}/>
          <View style={styles.footer}>
            <StorageWidget actions={
              <View style={styles.actions}>
                <MenuItem
                  label={t`Storage`}
                  icon="ph:hard-drives"
                  path="/storage"
                  mode="action"
                />
                <MenuItem
                  label={t`Settings`}
                  icon="ph:gear"
                  path="/settings"
                  mode="action"
                />
              </View>
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
    backgroundColor: theme.colors.neutral,
    borderColor: theme.colors.border,
    borderRightWidth: {
      initial: rt.hairlineWidth,
      sm: 0,
    },
  },
  root: {
    flex: 1,
    flexDirection: 'column',
    paddingStart: theme.display.space2,
    paddingRight: {
      initial: theme.display.space2,
      sm: 0,
    },
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
  actions: {
    flexDirection: 'row',
  },
}));