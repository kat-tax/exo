import {StyleSheet} from 'react-native-unistyles';
import {Pressable, View} from 'react-native';
import {useMemo, useRef} from 'react';
import {useLingui} from '@lingui/react/macro';
import {useLists} from 'tasks/hooks/use-lists';
import {useQuery} from 'app/data';
import {getListItems} from 'app/data/queries';
import {Icon, TextInput} from 'app/ui/base';

import type {ListId, ListCategoryId} from 'app/data/types';
import type {TextInput as TextInputType} from 'react-native';

interface ListGroupProps {
  id: ListId | null;
  categoryId: ListCategoryId | null;
  categoryName: string | null;
}

export function ListGroup({id, categoryId, categoryName}: ListGroupProps) {
  const ref = useRef<TextInputType>(null);
  const lists = useLists();
  const listId = useMemo(() => lists.getId(id ?? ''), [id]);
  const listItems = useQuery(getListItems(listId, categoryId));

  const create = lists.createItem.bind(null, listId, categoryId);
  const {t} = useLingui();

  const resetInput = () => {
    ref.current?.clear();
    setTimeout(() => {
      ref.current?.focus();
    }, 100);
  };

  const handleSingleLine = (text: string) => {
    if (text.length > 0) {
      if (!handleMultiLine(text)) {
        create(text);
        resetInput();
      }
    }
  };

  const handleMultiLine = (text: string) => {
    const lines = text.split(/\r?\n/).filter(line => line.trim().length > 0);
    if (lines.length > 1) {
      lines.forEach(line => {
        const trimmedLine = line.trim();
        if (trimmedLine.length > 0) {
          create(trimmedLine);
          resetInput();
        }
      });
      resetInput();
      return true;
    }
    return false;
  }

  if (listItems.length === 0 && categoryId === null) {
    return null;
  }

  return (
    <View style={styles.root}>
      {categoryName !== null && (
        <TextInput
          style={styles.input}
          placeholder={t`Category`}
          value={categoryName}
          editable={false}
        />
      )}
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
                  uniProps={(theme) => ({
                    color: theme.colors.mutedForeground,
                  })}
                />
              ) : (
                <Icon
                  name="ph:square"
                  size={24}
                  uniProps={(theme) => ({
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
              // Clear item if backspace is pressed and the item is empty
              onKeyPress={(e) => {
                if (e.nativeEvent.key === 'Backspace') {
                  if (item.textContent === '') {
                    lists.removeItem(item.id);
                    ref.current?.focus();
                  }
                }
              }}
              // Clear item if it is empty and the user blurs the input
              onBlur={() => {
                if (item.textContent === '') {
                  lists.removeItem(item.id);
                }
              }}
              // Focus new item input when user submits the current item
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
            uniProps={(theme) => ({
              color: theme.colors.mutedForeground,
            })}
          />
          <TextInput
            ref={ref}
            style={styles.itemInput}
            placeholder={t`New item...`}
            autoFocus={true}
            multiline={true}
            maxLength={1000}
            defaultValue={''}
            numberOfLines={1}
            submitBehavior="blurAndSubmit"
            // Prevent new lines in input field (web workaround for submitBehavior)
            onKeyPress={e => {
              if (e.nativeEvent.key === 'Enter') {
                e.preventDefault();
                handleSingleLine(ref.current?.value?.trim() ?? '');
              }
            }}
            // Detect multi-line input
            onChangeText={text => {
              if (text.includes('\n') || text.includes('\r')) {
                handleMultiLine(text);
              }
            }}
            // Native submission behavior (native since onKeyPress handles web)
            onSubmitEditing={e => {
              handleSingleLine(e.nativeEvent.text.trim());
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
