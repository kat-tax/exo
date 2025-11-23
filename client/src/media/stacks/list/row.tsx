import {StyleSheet} from 'react-native-unistyles';
import {View, Text} from 'react-native';
import {TextInput} from 'react-exo/textinput';
import {bytesize} from 'react-exo/fs';
import {Thumb} from 'media/stacks/thumb';
import {ThumbSize} from 'media/stacks/thumb';
import {useMediaName} from 'media/hooks/use-media-name';

import type {HfsOpt} from 'media/dir/types/hfs';

export const HEIGHT_ROW = __TOUCH__ ? 40 : 26;
export const HEIGHT_CELL = 130;

interface ListRow {
  name: string,
  size?: number,
  ext?: string,
  dir?: boolean,
  img?: (() => Promise<string | null>) | string,
  opt?: Partial<HfsOpt>,
  onRename?: (name?: string | null) => Promise<void>,
}

export function ListRow(props: ListRow) {
  const title = useMediaName(props.name);
  const {name, size, ext, dir, opt, img} = props;
  const {focused, selected, dragging, dropping, renaming} = opt ?? {};
  const isGrid = opt?.layout === 'grid';
  const thumbSize = isGrid
    ? ThumbSize.LG
    : __TOUCH__
      ? ThumbSize.SM
      : ThumbSize.XS;
  const vstyles = {
    root: [
      styles.root,
      selected?.self && styles.selected,
      selected?.prev && styles.selectedPrev,
      selected?.next && styles.selectedNext,
      (dropping || focused) && !dragging && styles.outline,
      dragging && styles.disabled,
      isGrid && styles.cell,
    ],
  };

  return (
    <View style={vstyles.root}>
      <View style={[styles.thumb, isGrid && styles.thumbCell]}>
        <Thumb size={thumbSize} {...{name, ext, img, dir}}/>
      </View>
      <View style={[styles.info, isGrid && styles.infoCell]}>
        {renaming ? (
          <TextInput
            style={[styles.text, styles.input, isGrid && styles.textCell]}
            placeholder={name}
            defaultValue={name}
            spellCheck={false}
            ref={(ref) => {
              if (ref && !ref.isFocused()) {
                setTimeout(() => ref.focus(), 100);
              }
            }}
            selection={(() => {
              const idx = name.indexOf('.');
              const end = idx === -1 ? name.length : idx;
              return {start: 0, end};
            })()}
            onKeyPress={(e) => {
              if (e.nativeEvent.key === 'Escape') {
                props.onRename?.(null);
              }
            }}
            onSubmitEditing={async (e) => {
              if (props.onRename) {
                const newName = e.nativeEvent.text?.trim();
                if (newName && name !== newName) {
                  await props.onRename(newName);
                } else {
                  await props.onRename(null);
                }
              }
            }}
            onBlur={async () => {
              if (props.onRename) {
                await props.onRename(null);
              }
            }}
          />
        ) : (
          <Text
            style={[styles.text, isGrid && styles.textCell]}
            numberOfLines={isGrid ? 2 : 1}
            ellipsizeMode="middle">
            {title}
          </Text>
        )}
        {!renaming && (
          <Text
            style={[styles.text, styles.size, isGrid && styles.textCell]}
            numberOfLines={1}>
            {dir ? '‎' : bytesize(size ?? 0)}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    gap: 6,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: HEIGHT_ROW,
    paddingHorizontal: theme.display.space2,
    paddingVertical: theme.display.space1,
    borderRadius: theme.display.radius1,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0)',
  },
  cell: {
    gap: theme.display.space1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: HEIGHT_CELL,
    borderRadius: theme.display.radius1,
    paddingVertical: theme.display.space1,
    paddingHorizontal: theme.display.space1,
  },
  thumb: {
    width: 16,
  },
  thumbCell: {
    width: '100%',
  },
  info: {
    gap: theme.display.space2,
    flex: 1,
    flexDirection: 'row',
  },
  infoCell: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    columnGap: 9999,
    rowGap: theme.display.space1,
    marginBottom: theme.display.space1,
    width: '100%',
  },
  text: {
    fontFamily: theme.font.family,
    fontSize: theme.font.size,
    fontWeight: theme.font.weight,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
    color: theme.colors.foreground,
    ...__TOUCH__ && {
      fontSize: theme.font.contentSize,
      lineHeight: theme.font.contentHeight,
      letterSpacing: theme.font.contentSpacing,
    },
  },
  textCell: {
    textAlign: 'center',
    alignSelf: 'center',
    _web: {
      overflowWrap: 'normal',
    },
  },
  size: {
    color: theme.colors.mutedForeground,
    fontSize: 11,
    flexShrink: 0,
  },
  input: {
    flex: 1,
    width: '100%',
    padding: 0,
    margin: 0,
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  /* States */
  outline: {
    borderColor: theme.colors.outline,
  },
  disabled: {
    opacity: 0.5,
  },
  selected: {
    backgroundColor: theme.colors.muted,
  },
  selectedPrev: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  selectedNext: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
}));
