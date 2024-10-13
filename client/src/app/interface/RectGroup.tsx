import {View} from 'react-native';
import {useState, useEffect, useCallback, Children} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {getRectLayout} from 'app/utils/rect';

import type {LayoutRectangle, LayoutChangeEvent} from 'react-native';
import type {RectLayout} from 'app/utils/rect';

interface RectGroupProps extends React.PropsWithChildren {
  aspectRatio?: number;
}

export function RectGroup(props: RectGroupProps) {
  const [layout, setLayout] = useState<RectLayout>();
  const [rect, setRect] = useState<LayoutRectangle>();
  const {styles} = useStyles(stylesheet);
  const onLayout = useCallback((e: LayoutChangeEvent) => {
    setRect(e.nativeEvent.layout);
  }, []);

  useEffect(() => {
    const layout = getRectLayout({
      count: Children.count(props.children),
      width: rect?.width || 0,
      height: rect?.height || 0,
      aspectRatio: props.aspectRatio,
    });
    setLayout(layout);
    console.log('layout', layout);
  }, [rect, props.children, props.aspectRatio]);

  return (
    <View style={styles.root} onLayout={onLayout}>
      <View style={[styles.inner, {maxWidth: layout ? layout.width * layout.cols : '100%'}]}>
        {Children.map(props.children, (child, index) => (
          <View key={index ?? 0} style={[styles.rect, {width: layout?.width, height: layout?.height}]}>
            {child}
          </View>
        ))}
      </View>
    </View>
  );
}

const stylesheet = createStyleSheet(() => ({
  root: {
    flex: 1,
    margin: 4,
    overflow: 'hidden',
    alignItems: 'center',
  },
  inner: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  rect: {
    padding: 4,
  },
}));
