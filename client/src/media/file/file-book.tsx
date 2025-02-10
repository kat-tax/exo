import {Book} from 'react-exo/book';
import {View, Platform} from 'react-native';
import {useLingui} from '@lingui/react/macro';
import {useEffect, useState, useCallback, forwardRef} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useTheme} from 'app/hooks/use-display';
import {useFile} from 'media/file/hooks/use-file';

import type {FileProps} from 'media/file';
import type {BookRef} from 'react-exo/book';

const EPUB_URL = 'https://alice.dita.digital/manifest.json'; // TODO

export interface FileBook extends FileProps {}

export type {BookRef};

export default forwardRef((props: FileBook, ref: React.Ref<BookRef>) => {  
  const source = useFile(props.path, 'dataUrl', 'application/epub+zip');
  const [title, setTitle] = useState('');
  const [chapter, setChapter] = useState('');
  const {styles} = useStyles(stylesheet);
  const [scheme] = useTheme();
  const {t} = useLingui();

  // Workaround: send resize event to force render
  const forceRender = useCallback(() => {
    if (Platform.OS === 'web') {
      window.dispatchEvent(new Event('resize'));
    }
  }, []);

  // Pull title from manifest (fallback to file name)
  useEffect(() => {
    fetch(EPUB_URL)
      .then((res) => res.json())
      .then((data) => {
        setTitle(data.metadata.title || props.name);
        setChapter(t`by ${data.metadata.author}`);
      })
      .catch(() => setTitle(props.name));
  }, [props.name, t]);

  // Update the title bar when the book title or chapter changes
  useEffect(() => {
    props.actions.setInfo(chapter);
    props.actions.setTitle(title);
    props.actions.setCover('https://alice.dita.digital/images/cover.jpg');
  }, [title, chapter, props.actions]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: force render when min/maximized
  useEffect(forceRender, [props.maximized]);

  return source ? (
    <View style={styles.root}>
      <Book
        ref={ref}
        url={EPUB_URL}
        style={props.maximized ? styles.maximized : undefined}
        theme={scheme === 'light' ? 'default' : 'night'}
        onTableOfContents={console.log}
        onLocationChange={(e) => {
          props.actions.setCurrent((e.locations?.totalProgression || 0) * 100);
          props.actions.setDuration(100);
          e.title && setChapter(e.title);
        }}
      />
    </View>
  ) : null;
});

const stylesheet = createStyleSheet((theme) => ({
  root: {
    flex: 1,
    padding: theme.display.space3,
  },
  maximized: {
    margin: 0,
  },
}));
