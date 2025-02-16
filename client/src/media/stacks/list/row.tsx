import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {View, Text} from 'react-native';
import {Thumb} from 'media/stacks/thumb';
import {bytesize} from 'app/utils/formatting';
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
}

export function ListRow(props: ListRow) {
  const title = useMediaName(props.name);
  const {styles} = useStyles(stylesheet);
  const {name, size, ext, dir, opt, img} = props;
  const {focused, selected, dragging, dropping} = opt ?? {};
  const isGrid = opt?.layout === 'grid';
  const thumbSize = isGrid ? 4 : __TOUCH__ ? 1 : 0;
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
        <Text
          style={[styles.text, isGrid && styles.textCell]}
          numberOfLines={isGrid ? 2 : 1}
          ellipsizeMode="middle">
          {title}
        </Text>
        <Text
          style={[styles.text, styles.size, isGrid && styles.textCell]}
          numberOfLines={1}>
          {dir ? '‎' : bytesize(size ?? 0)}
        </Text>
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
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
  },
  size: {
    color: theme.colors.mutedForeground,
    fontSize: 11,
    flexShrink: 0,
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
