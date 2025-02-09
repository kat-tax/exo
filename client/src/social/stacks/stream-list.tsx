import {View} from 'react-native';
import {useState, useEffect} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {StreamListItem} from 'social/stacks/stream-list-item';

import type {StreamMediaProps} from 'social/stacks/stream-media';

export function StreamList() {
  const [streams, setStreams] = useState<StreamMediaProps[]>([]);
  const {styles} = useStyles(stylesheet);

  useEffect(() => {
    const fetchStreams = async () => {
      const response = await fetch('https://localhost/api/list?l=100');
      const data = await response.json();
      setStreams(data);
    };
    fetchStreams();
  }, []);

  return (
    <View style={styles.root}>
      {streams.map(stream => (
        <StreamListItem
          key={stream.name}
          {...stream}
        />
      ))}
      <View style={styles.footer}/>
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  root: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: theme.display.space2,
  },
  footer: {
    minHeight: 30,
    width: '100%',
  },
}));
