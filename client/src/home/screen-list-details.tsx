import {StyleSheet} from 'react-native-unistyles';
import {Platform, Pressable, View} from 'react-native';
import {useNavigate, useParams} from 'react-exo/navigation';
import {useMemo, useRef} from 'react';
import {useLingui} from '@lingui/react/macro';
import {useLists} from 'home/hooks/use-lists';
import {useQuery} from 'app/data';
import {Panel} from 'app/ui/panel';
import {Icon, IconRemote, TextInput} from 'app/ui/base';
import {getList, getListItems} from 'app/data/queries';

import type {TextInput as TextInputType} from 'react-native';

export default function ScreenList() {
  const {id} = useParams<{id: string}>();
  const ref = useRef<TextInputType>(null);
  const lists = useLists();
  const listId = useMemo(() => lists.getId(id), [id]);
  const listData = useQuery(getList(listId))[0];
  const listItems = useQuery(getListItems(listId));

  const create = lists.createItem.bind(null, listId);
  const nav = useNavigate();
  const {t} = useLingui();

  if (!listData) {
    nav('/lists');
    return null;
  }

  return (
    <Panel
      title={listData.name || t`Untitled`}
      message={`${listItems.filter((item) => item.isCompleted).length} / ${listItems.length} completed`}
      back={'/lists'}
      right={
        <View style={styles.icon}>
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
          <View style={styles.items}>
            {listItems.map((item) => (
              <View key={item.id} style={styles.item}>
                <Pressable onPress={() => {
                  lists.updateItemStatus(item.id, !item.isCompleted);
                }}>
                  {item.isCompleted ? (
                    <Icon
                      name="ph:check-square"
                      size={24}
                      uniProps={(theme: any) => ({
                        color: theme.colors.mutedForeground,
                      })}
                    />
                  ) : (
                    <Icon
                      name="ph:square"
                      size={24}
                      uniProps={(theme: any) => ({
                        color: theme.colors.mutedForeground,
                      })}
                    />
                  )}
                </Pressable>
                <TextInput
                  style={styles.input}
                  placeholder={t`Edit Item...`}
                  value={item.textContent ?? ''}
                  maxLength={1000}
                  onChangeText={(value) => {
                    lists.updateItemText(item.id, value);
                  }}
                  onBlur={() => {
                    if (item.textContent === '') {
                      lists.removeItem(item.id);
                    }
                  }}
                />
              </View>
            ))}
            <View style={styles.item}>
              <Icon
                name="ph:plus"
                size={24}
                uniProps={(theme: any) => ({
                  color: theme.colors.mutedForeground,
                })}
              />
              <TextInput
                ref={ref}
                style={styles.input}
                placeholder={t`New item...`}
                maxLength={1000}
                defaultValue={''}
                onSubmitEditing={(e) => {
                  create(e.nativeEvent.text);
                  ref.current?.clear();
                }}
              />
            </View>
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
  icon: {
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
  items: {
    flexDirection: 'column',
    gap: theme.display.space2,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.display.space2,
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
    fontFamily: theme.font.family,
    fontSize: theme.font.inputSize,
    fontWeight: theme.font.inputWeight,
    lineHeight: theme.font.inputHeight,
    letterSpacing: theme.font.inputSpacing,
  },
}));
