import {StyleSheet} from 'react-native-unistyles';
import {Platform, View} from 'react-native';
import {useNavigate, useParams} from 'react-exo/navigation';
import {useMemo} from 'react';
import {useLingui} from '@lingui/react/macro';
import {useLists} from 'home/hooks/use-lists';
import {useQuery} from 'app/data';
import {Panel} from 'app/ui/panel';
import {IconRemote} from 'app/ui/base';
import {ListGroup} from 'home/stacks/list-group';
import {getList, getListCounts} from 'app/data/queries';

export default function ScreenList() {
  const {id} = useParams<{id: string}>();
  const lists = useLists();
  const listId = useMemo(() => lists.getId(id), [id]);
  const listData = useQuery(getList(listId))[0];
  const listCounts = useQuery(getListCounts(listId))[0];
  const listGroups = [{
    id: 'heb',
    name: 'H-E-B',
  }];

  const nav = useNavigate();
  const {t} = useLingui();

  if (!listData) {
    nav('/lists');
    return null;
  }

  return (
    <Panel
      title={listData.name || t`Untitled`}
      message={`${listCounts.completed ?? 0} / ${listCounts.total ?? 0} completed`}
      back={'/lists'}
      right={
        <View style={styles.icon}>
          <IconRemote
            name={listData.icon ?? 'ph:list-checks'}
            size={'50%'}
            uniProps={(theme: any) => ({
              color: listData.color ?? theme.colors.foreground,
            })}
          />
        </View>
      }>
      <View style={styles.root}>
        {listGroups.map((group) => (
          <ListGroup key={group.id} id={listId}/>
        ))}
      </View>
    </Panel>
  );
}

const styles = StyleSheet.create((theme) => ({
  root: {
    ...Platform.select({
      ios: {
        gap: 0,
      },
      default: {
        gap: theme.display.space8,
      },
    }),
  },
  icon: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.display.radius3,
    borderColor: theme.colors.border,
    borderWidth: 1,
    overflow: 'hidden',
  },
}));
