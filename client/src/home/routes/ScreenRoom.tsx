import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {useParams} from 'react-exo/navigation';
import {LegendList} from '@legendapp/list';

import {Message} from 'home/stacks/Message';
import {MessageEmbed} from 'home/stacks/MessageEmbed';
import {useMessages} from 'home/hooks/useMessages';
import {bytesize} from 'app/utils/formatting';

import {View} from 'react-native';
import {Page} from 'app/interface/Page';

export default function ScreenRoom() {
  const {room} = useParams<{room: string}>();
  const {styles} = useStyles(stylesheet);
  const messages = useMessages(room);

  return (
    <Page margin="none">
      <LegendList
        data={messages}
        recycleItems
        alignItemsAtEnd
        maintainScrollAtEnd
        contentContainerStyle={styles.container}
        showsHorizontalScrollIndicator={false}
        maintainScrollAtEndThreshold={0.1}
        keyExtractor={item => item.id}
        estimatedItemSize={40}
        ListHeaderComponent={() => <View style={styles.header} />}
        ListFooterComponent={() => <View style={styles.footer} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({item: {ts, embed, body, hasPrev, hasNext}}) => {
          const time = new Date(ts)
            .toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'});
          const mode = embed ? 'Embedded' 
            : !hasPrev && !hasNext ? 'Default'
            : !hasPrev ? 'Start'
            : !hasNext ? 'End'
            : 'Middle';
          const complete = (mode === 'Default'
            || mode === 'End'
            || mode === 'Embedded');
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
                emote={''}
                embed={embed ? (
                  <MessageEmbed
                    path={embed.url}
                    name={embed.name}
                    origin={self ? 'Local' : 'Remote'}
                  />
                ) : undefined}
              />
            </View> 
          );
        }}
      />
    </Page>
  );
}

const stylesheet = createStyleSheet(theme => ({
  widget: {
    flex: 1,
    gap: theme.display.space2,
    justifyembed: 'flex-end',
    alignItems: 'flex-end',
  },
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
