import {hashFile} from 'react-exo/fs';
import {useCallback} from 'react';

import {Trans} from '@lingui/react';
import {Trans as T} from '@lingui/macro';
import {Text, View, Button} from 'react-native';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useAppContext} from 'app/hooks/useAppContext';
import {useWeather} from 'home/hooks/useWeather';
import {useClock} from 'home/hooks/useClock';
import {getDayGreeting} from 'home/utils/time';
import {AiPrompt} from 'home/base/AiPrompt';
import {Page} from 'app/base/Page';

export default function ScreenHome() {
  const {device, profile} = useAppContext();
  const {styles} = useStyles(stylesheet);
  const weather = useWeather(device?.coords);
  const clock = useClock('medium');

  const test = useCallback(() => {
    async function test() {
      try {
        // @ts-ignore
        const [fileHandle] = await window.showOpenFilePicker();
        const opfsRoot = await navigator.storage.getDirectory();
        const targetDir = await opfsRoot.getDirectoryHandle('example', {create: true});
        const targetFile = await targetDir.getFileHandle('test.zip', {create: true});
        const sourceFile: File = await fileHandle.getFile();
        const stream = await targetFile.createWritable();
        await sourceFile.stream().pipeTo(stream);
        const hash = await hashFile('example/test.zip', 1, (bytes) => {
          console.log('[fs] progress', (bytes / sourceFile.size) * 100);
        });
        console.log('[fs] file', hash);
      } catch (error) {
        console.error('[fs] error', error);
      }
    }
    test();
  }, []);

  return (
    <Page
      title={<Trans id={getDayGreeting().id}/>}
      message={profile
        ? <T>{`Welcome, ${profile.name}`}</T>
        : <T>{'Welcome, Human'}</T>
      }
      widget={
        <View style={styles.widget}>
          <Text style={styles.clock}>
            {clock}
          </Text>
          <Text style={styles.weather}>
            {weather.text}
          </Text>
        </View>
      }>
      <AiPrompt/>
      <Button
        title="Test"
        onPress={test}
      />
    </Page>
  );
}

const stylesheet = createStyleSheet(theme => ({
  widget: {
    flex: 1,
    gap: theme.display.space2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  clock: {
    fontWeight: '200',
    fontFamily: theme.font.family,
    fontSize: theme.font.headerSize,
    letterSpacing: theme.font.headerSpacing,
    color: theme.colors.foreground,
  },
  weather: {
    alignSelf: 'flex-end',
    fontWeight: '200',
    fontFamily: theme.font.family,
    fontSize: theme.font.contentSize,
    letterSpacing: theme.font.contentSpacing,
    color: theme.colors.mutedForeground,
  },
}));
