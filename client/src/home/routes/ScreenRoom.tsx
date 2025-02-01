import {useParams} from 'react-exo/navigation';
import {useState, useCallback} from 'react';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {LegendList} from '@legendapp/list';
import {Message} from 'home/stacks/Message';
import {MessageEmbed} from 'home/stacks/MessageEmbed';
import {MessageAvatar} from 'home/stacks/MessageAvatar';
import {useMessages} from 'home/hooks/useMessages';
import {bytesize} from 'app/utils/formatting';
import {debounce} from 'app/utils/delay';

import {View} from 'react-native';
import {Page} from 'app/interface/Page';

export default function ScreenRoom() {
  const [layout, setLayout] = useState<[number, number]>();
  const {room} = useParams<{room: string}>();
  const {styles} = useStyles(stylesheet);
  const messages = useMessages(room);
  const resize = useCallback(debounce((w: number, h: number) =>
    setLayout([w, h]), 100), []);
  return (
    <Page margin="none">
      <View style={{flex: 1}}>
        <LegendList
          key={layout?.[0].toString()}
          data={layout ? messages : []}
          recycleItems
          alignItemsAtEnd
          maintainScrollAtEnd
          waitForInitialLayout
          contentContainerStyle={styles.container}
          showsHorizontalScrollIndicator={false}
          maintainScrollAtEndThreshold={0.1}
          keyExtractor={item => item.id}
          estimatedItemSize={40}
          onContentSizeChange={resize}
          ListHeaderComponent={() => <View style={styles.header} />}
          ListFooterComponent={() => <View style={styles.footer} />}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({item: {ts, self, sender, embed, body, hasPrev, hasNext}}) => {
            const mode = embed ? 'Embedded' 
              : !hasPrev && !hasNext ? 'Default'
              : !hasPrev ? 'Start'
              : !hasNext ? 'End'
              : 'Middle';
            const complete = (mode === 'Default'
              || mode === 'End'
              || mode === 'Embedded');
            const time = new Date(ts)
              .toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'});
            return (
              <View style={[
                complete && styles.complete,
                //item.emote && styles.emoted,
              ]}>
                <Message
                  mode={mode}
                  origin={self ? 'Local' : 'Remote'}
                  message={body ?? `${embed?.name} (${bytesize(embed?.size ?? 0)})` ?? ''}
                  timestamp={!hasNext ? time : ''}
                  emote=""
                  avatar={!hasPrev
                    ? <MessageAvatar sender={sender}/>
                    : undefined}
                  embed={embed ? (
                    <MessageEmbed
                      path={embed.url}
                      name={embed.name}
                      origin={self ? 'Local' : 'Remote'}
                      layout={layout}
                    />
                  ) : undefined}
                />
              </View> 
            );
          }}
        />
      </View>
    </Page>
  );
}

const stylesheet = createStyleSheet(theme => ({
  container: {
    paddingHorizontal: theme.display.space5,
  },
  complete: {
    paddingBottom: theme.display.space2,
  },
  emoted: {
    paddingBottom: theme.display.space5,
  },
  header: {
    height: theme.display.space5,
  },
  footer: {
    height: theme.display.space5,
  },
  separator: {
    height: 1,
  },
}));
