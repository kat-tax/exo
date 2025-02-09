import {View, ScrollView} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useLingui} from '@lingui/react/macro';
import {useHfsAdd} from 'media/dir/hfs';
import {StorageWidget} from 'media/stacks/widgets/storage';

import {MenuHeader} from './menu-header';
import {MenuSection} from './menu-section';
import {MenuItemTab} from './menu-item-tab';
import {MenuItem} from './menu-item';

import type {AppContext} from 'app/hooks/use-app-context';

export interface MenuProps {
  context: AppContext,
  hasTabs?: boolean,
}

export function Menu(props: MenuProps) {
  const {importFile, createFolder} = useHfsAdd();
  const {styles} = useStyles(stylesheet);
  const {t} = useLingui();

  if (props.hasTabs) {
    return (
      <View style={styles.tabs}>
        <MenuItemTab
          label={t`Dashboard`}
          icon="ph:squares-four"
          path="/"
        />
        <MenuItemTab
          label={t`Inbox`}
          icon="ph:tray"
          path="/inbox"
        />
        <MenuItemTab
          label={t`Files`}
          icon="ph:folder"
          path="/browse"
        />
        <MenuItemTab
          label={t`World`}
          icon="ph:globe"
          path="/world"
        />
        <MenuItemTab
          label={t`Settings`}
          icon="ph:gear"
          path="/settings"
        />
      </View>
    );
  }

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
                    createFolder(name);
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
          <MenuSection label={t`Rooms`}>
            {[{
              name: 'Synkat',
              icon: 'ph:cat',
              path: '/matrix/!lwpprIOUgIZkrvffNC:matrix.org',
            }, {
              name: 'TheUltDev',
              icon: 'ph:smiley-meh',
              path: '/matrix/!oQWmCmkFrOESaZryui:matrix.org',
            }].map(({name, icon, path}) =>
              <MenuItem key={name} label={name} {...{icon, path}} mode="subitem"/>
            )}
          </MenuSection>
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
  tabs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderColor: theme.colors.border,
    borderTopWidth: rt.hairlineWidth,
    backgroundColor: theme.colors.background,
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
