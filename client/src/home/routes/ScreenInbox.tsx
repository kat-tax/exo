import {useLingui} from '@lingui/react/macro';
import {useStyles, createStyleSheet} from 'react-native-unistyles';
import {LegendList} from '@legendapp/list';

import {Message} from 'home/stacks/Message';
import {MessageEmbed} from 'home/stacks/MessageEmbed';
import {useMessages} from 'home/hooks/useMessages';

import {View} from 'react-native';
import {Page} from 'app/interface/Page';

export default function ScreenInbox() {
  const messages = useMessages();
  const {styles} = useStyles(stylesheet);
  const {t} = useLingui();

  return (
    <Page
      title={t`Inbox`}
      message={t`${messages.length} messages`}
      widget={
        <View style={styles.widget}>
        </View>
      }>
      <LegendList
        data={messages}
        recycleItems
        alignItemsAtEnd
        maintainScrollAtEnd
        showsHorizontalScrollIndicator={false}
        maintainScrollAtEndThreshold={0.1}
        keyExtractor={(_,i) => i.toString()}
        estimatedItemSize={40}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({item}) => {
          const mode = item.embed ? 'Embedded' 
            : !item.hasPrev && !item.hasNext ? 'Default'
            : !item.hasPrev ? 'Start'
            : !item.hasNext ? 'End'
            : 'Middle';
          const complete = (mode === 'Default'
            || mode === 'End'
            || mode === 'Embedded');
          return (
            <View style={[
              complete && styles.complete,
              item.emote && styles.emoted,
            ]}>
              <Message
                mode={mode}
                message={item.message}
                timestamp={!item.hasNext ? new Date(item.timestamp).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'}) : ''}
                origin={item.local ? 'Local' : 'Remote'}
                emote={item.emote || ''}
                embed={item.embed
                  ? <MessageEmbed
                      path={item.embed}
                      origin={item.local ? 'Local' : 'Remote'}
                    />
                  : undefined
                }
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
  complete: {
    paddingBottom: theme.display.space2,
  },
  emoted: {
    paddingBottom: theme.display.space5,
  },
  separator: {
    height: 1,
  },
}));
