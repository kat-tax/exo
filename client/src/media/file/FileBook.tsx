import {Book} from 'react-exo/book';

import {View} from 'react-native';
import {forwardRef, useEffect, useState} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useScheme} from 'app/hooks/useScheme';
import {useFileData} from 'media/hooks/useFileData';

import type {FileProps} from 'media/file';
import type {BookRef} from 'react-exo/book';

export interface FileBook extends FileProps {
  name: string,
  maximized: boolean,
  extension: string,
}

export type {BookRef};

export default forwardRef((props: FileBook, ref: React.Ref<BookRef>) => {
  const EPUB_URL = 'https://alice.dita.digital/manifest.json'; // Sample for web
  const [title, setTitle] = useState('');
  const [chapter, setChapter] = useState('');
  const {styles} = useStyles(stylesheet);
  const [scheme] = useScheme();
  const epub = useFileData(props.path, 'dataUrl', 'application/epub+zip');

  // Pull title from manifest (fallback to file name)
  useEffect(() => {
    fetch(EPUB_URL)
      .then((res) => res.json())
      .then((data) => setTitle(data.metadata.title || props.name))
      .catch(() => setTitle(props.name));
  }, [props.name]);

  // Update the title bar when the book title or chapter changes
  useEffect(() => {
    props.setBarTitle(`${title} - ${chapter}`);
    props.setBarIcon('https://alice.dita.digital/images/cover.jpg');
  }, [title, chapter, props.setBarTitle, props.setBarIcon]);

  return epub ? (
    <View style={styles.root}>
      <Book
        ref={ref}
        url={EPUB_URL}
        style={props.maximized ? styles.maximized : undefined}
        theme={scheme === 'light' ? 'default' : 'night'}
        onLocationChange={(e) => e.title && setChapter(e.title)}
        onTableOfContents={console.log}
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
