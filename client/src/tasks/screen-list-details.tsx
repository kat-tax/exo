import {Icon} from 'react-exo/icon';
import {StyleSheet} from 'react-native-unistyles';
import {Platform, Pressable, View} from 'react-native';
import {useNavigate, useParams} from 'react-exo/navigation';
import {useMemo} from 'react';
import {useLingui} from '@lingui/react/macro';
import {useLists} from 'tasks/hooks/use-lists';
import {useQuery} from 'app/data';
import {Panel} from 'app/ui/panel';
import {ListGroup} from 'tasks/stacks/list-group';
import {getList, getListCounts, getListCategories} from 'app/data/queries';

export default function ScreenList() {
  const {id} = useParams<{id: string}>();
  const lists = useLists();
  const listId = useMemo(() => lists.getId(id), [id]);
  const listData = useQuery(getList(listId))[0];
  const listCounts = useQuery(getListCounts(listId))[0];
  const listCategories = useQuery(getListCategories(listId));

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
        <Pressable
          style={styles.icon}
          onPress={() => nav(`/list/${listId}/edit`)}>
          <Icon.Remote
            name={listData.icon ?? 'ph:list-checks'}
            size={'50%'}
            uniProps={(theme) => ({
              color: listData.color ?? theme.colors.foreground,
            })}
          />
        </Pressable>
      }>
      <View style={styles.root}>
        <ListGroup
          id={listId}
          categoryId={null}
          categoryName={null}
        />
        {listCategories?.map((category) => (
          <ListGroup
            key={category.id}
            id={listId}
            categoryId={category.id}
            categoryName={category.name}
          />
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
