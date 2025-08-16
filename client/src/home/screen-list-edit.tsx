import {Platform, View, Pressable} from 'react-native';
import {StyleSheet} from 'react-native-unistyles';
import {useLingui} from '@lingui/react/macro';
import {useMemo, useRef} from 'react';
import {useNavigate, useParams} from 'react-exo/navigation';
import {useLists} from 'home/hooks/use-lists';
import {Panel, PanelSection, PanelItem} from 'app/ui/panel';
import {IconRemote, TextInput, Icon} from 'app/ui/base';
import {getList, getListCategories} from 'app/data/queries';
import {useQuery} from 'app/data';
import {Button} from 'design';

import type {TextInput as TextInputType} from 'react-native';

export default function ScreenListEdit() {
  const {id} = useParams<{id: string}>();
  const lists = useLists();
  const listId = useMemo(() => lists.getId(id), [id]);
  const listData = useQuery(getList(listId))[0];
  const categories = useQuery(getListCategories(listId));
  const categoryInputRef = useRef<TextInputType>(null);

  const update = lists.update.bind(null, listId);
  const nav = useNavigate();
  const {t} = useLingui();

  const removeCategory = lists.removeCategory.bind(null, listId);
  const createCategory = (text: string) => {
    if (text.length > 0) {
      lists.createCategory(listId, text);
      categoryInputRef.current?.clear();
      categoryInputRef.current?.focus();
    }
  };

  if (!listData) {
    nav('/lists');
    return null;
  }

  return (
    <Panel
      title={listData.name || t`Untitled`}
      message={t`Configure list`}
      right={
        <View style={styles.list}>
          <IconRemote
            name={listData.icon ?? 'ph:list-checks'}
            size={'50%'}
            uniProps={(theme: any) => ({
              color: listData.color ?? theme.colors.foreground,
            })}
          />
        </View>
      }>
        <View style={styles.root}>
          <PanelSection title={t`General`}>
            <PanelItem
              label={t`Name`}
              description={t`The display name of the list.`}>
              <TextInput
                style={styles.input}
                maxLength={25}
                placeholder={t`List name`}
                onChangeText={update.bind(null, 'name')}
                value={listData.name ?? ''}
              />
            </PanelItem>
            <PanelItem
              label={t`Categories`}
              description={t`Add section names for items.`}>
              <View style={styles.categoryList}>
                {categories.map((category) => (
                  <View key={category.id} style={styles.categoryRow}>
                    <Pressable
                      style={styles.categoryDelete}
                      onPress={() => removeCategory(category.id)}>
                      <Icon
                        name="ph:x"
                        size={16}
                        uniProps={(theme: any) => ({
                          color: theme.colors.mutedForeground,
                        })}
                      />
                    </Pressable>
                    <TextInput
                      style={[styles.input, styles.categoryInput]}
                      value={category.name ?? ''}
                      maxLength={50}
                      onChangeText={text => {
                        lists.updateCategory(category.id, text);
                      }}
                      onKeyPress={e => {
                        if (e.nativeEvent.key === 'Backspace' && (category.name ?? '') === '') {
                          removeCategory(category.id);
                        }
                      }}
                      onBlur={() => {
                        if (!category.name || category.name.trim() === '') {
                          removeCategory(category.id);
                        }
                      }}
                    />
                  </View>
                ))}
                <TextInput
                  ref={categoryInputRef}
                  style={styles.input}
                  placeholder={t`Add category...`}
                  maxLength={50}
                  onBlur={e => {
                    createCategory(e.nativeEvent.text.trim());
                  }}
                  onSubmitEditing={(e) => {
                    createCategory(e.nativeEvent.text.trim());
                  }}
                />
              </View>
            </PanelItem>
          </PanelSection>
          <PanelSection title={t`Appearance`}>
            <PanelItem
              label={t`Icon`}
              description={t`The icon to display for the list.`}>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                maxLength={25}
                placeholder={`ph:list-checks`}
                onChangeText={update.bind(null, 'icon')}
                value={listData.icon ?? ''}
              />
            </PanelItem>
            <PanelItem
              label={t`Color`}
              description={t`The color of the list icon.`}>
              <TextInput
                style={styles.input}
                autoCapitalize="none"
                maxLength={25}
                placeholder={`#888`}
                onChangeText={update.bind(null, 'color')}
                value={listData.color ?? ''}
              />
            </PanelItem>
          </PanelSection>
          <View style={styles.actions}>
            <Button
              label={t`Go Back`}
              mode="Secondary"
              state="Default"
              onPress={() => nav('/lists')}
            />
            <Button
              label={t`Delete`}
              mode="Destructive"
              state="Default"
              onPress={() => {
                lists.remove(listId);
                nav('/lists');
              }}
            />
          </View>
        </View>
    </Panel>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    ...Platform.select({
      ios: {
        gap: 0,
      },
      default: {
        gap: theme.display.space8,
      },
    }),
  },
  actions: {
    flexDirection: 'row',
    marginBottom: theme.display.space5,
    gap: theme.display.space4,
  },
  input: {
    width: {
      initial: '100%',
      xxs: 120,
      sm: 215,
    },
    padding: theme.display.space2,
    paddingHorizontal: theme.display.space3,
    color: theme.colors.foreground,
    fontSize: theme.typography.size2,
    fontWeight: theme.typography.weightLight,
    lineHeight: theme.typography.lineHeight2,
    letterSpacing: theme.typography.letterSpacing2,
    fontFamily: theme.font.family,
    backgroundColor: theme.colors.card,
    borderRadius: theme.display.radius3,
    borderColor: theme.colors.border,
    borderWidth: 1,
  },
  list: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.display.radius3,
    borderColor: theme.colors.border,
    borderWidth: 1,
    overflow: 'hidden',
  },
  categoryList: {
    alignItems: 'flex-end',
    gap: theme.display.space2,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.display.space2,
  },
  categoryInput: {
    flex: 1,
  },
  categoryDelete: {
    padding: theme.display.space1,
    borderRadius: theme.display.radius2,
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
