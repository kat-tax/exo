import {StyleSheet} from 'react-native-unistyles';
import {Pressable, View} from 'react-native';
import {useMemo, useRef} from 'react';
import {useLingui} from '@lingui/react/macro';
import {useLists} from 'home/hooks/use-lists';
import {useQuery} from 'app/data';
import {Icon, TextInput} from 'app/ui/base';
import {getListItems} from 'app/data/queries';

import type {ListId} from 'app/data/types';
import type {TextInput as TextInputType} from 'react-native';

interface ListGroupProps {
  id: ListId | null;
}

export function ListGroup({id}: ListGroupProps) {
  const ref = useRef<TextInputType>(null);
  const lists = useLists();
  const listId = useMemo(() => lists.getId(id ?? ''), [id]);
  const listItems = useQuery(getListItems(listId));

  const create = lists.createItem.bind(null, listId);
  const {t} = useLingui();

  return (
    <View style={styles.root}>
      <TextInput
        style={styles.input}
        placeholder={t`Category`}
        defaultValue={'H-E-B'}
      />
      <View style={styles.list}>
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
              style={styles.itemInput}
              placeholder={t`Edit Item...`}
              value={item.textContent ?? ''}
              maxLength={1000}
              selectTextOnFocus={true}
              onChangeText={(value) => {
                lists.updateItemText(item.id, value);
              }}
              onBlur={() => {
                if (item.textContent === '') {
                  lists.removeItem(item.id);
                }
              }}
              onSubmitEditing={() => {
                ref.current?.focus();
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
            style={styles.itemInput}
            placeholder={t`New item...`}
            autoFocus={true}
            maxLength={1000}
            defaultValue={''}
            onSubmitEditing={(e) => {
              create(e.nativeEvent.text);
              ref.current?.clear();
              setTimeout(() => {
                ref.current?.focus();
              }, 100);
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    flexDirection: 'column',
    gap: theme.display.space2,
  },
  input: {
    fontFamily: theme.font.family,
    color: theme.colors.foreground,
    fontSize: theme.font.titleSize,
    fontWeight: theme.font.titleWeight,
    lineHeight: theme.font.titleHeight,
    letterSpacing: theme.font.titleSpacing,
  },
  list: {
    flexDirection: 'column',
    gap: theme.display.space2,
  },
  item: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.display.space2,
  },
  itemInput: {
    width: '100%',
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
