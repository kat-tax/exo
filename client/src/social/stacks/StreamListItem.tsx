import {useRef, useEffect, useState} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {View, Text} from 'react-native';
import {Link} from 'react-exo/navigation';
import {isTouch} from 'app/utils/platform';

import type {StreamProps} from 'social/stacks/Stream';

export function StreamListItem(props: StreamProps) {
  const ref = useRef(null);
  const {styles} = useStyles(stylesheet);
  const [i, setI] = useState(0);
  const {name, tokens} = props;

  useEffect(() => {
    if (ref.current) {
      // @ts-ignore
      ref.current.style.flex = '1';
    }
  }, []);

  return (
    <Link to={`/live/${name}`} ref={ref}>
      <View style={styles.root}>
        {/* <Image
          style={styles.image}
          url={`https://localhost/live/images/${name}/?${i}`}
        /> */}
        <View style={styles.image}>
          <img
            src={`https://localhost/live/fallback?room=${name}&r=${i}`}
            style={{width: '100%', height: '100%'}}
            loading={'lazy'}
            onLoad={() => {
              setI(i + 1);
            }}
            alt={name}
          />
        </View>
        <Text style={[styles.text, styles.tokens]}>
          {tokens?.toLocaleString()}
        </Text>
        <Text style={styles.text}>
          {name}
        </Text>
      </View>
    </Link>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  root: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingVertical: theme.display.space1,
    gap: theme.display.space2,
  },
  text: {
    fontFamily: theme.font.family,
    fontSize: theme.font.size,
    fontWeight: theme.font.weight,
    lineHeight: theme.font.height,
    letterSpacing: theme.font.spacing,
    color: theme.colors.foreground,
    ...isTouch() && {
      fontSize: theme.font.contentSize,
      letterSpacing: theme.font.contentSpacing,
      lineHeight: 32,
    },
  },
  tokens: {
    position: 'absolute',
    top: theme.display.space2,
    right: theme.display.space2,
    color: theme.colors.warning,
  },
  image: {
    flex: 1,
    minWidth: 180,
    aspectRatio: 16/9,
    borderRadius: 6,
    backgroundColor: theme.colors.secondary,
  },
}));
