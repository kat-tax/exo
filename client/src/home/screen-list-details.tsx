import {useMemo} from 'react';
import {useLingui} from '@lingui/react/macro';
import {StyleSheet} from 'react-native-unistyles';
import {Platform, View} from 'react-native';
import {useNavigate, useParams} from 'react-exo/navigation';
import {Panel} from 'app/ui/panel';
import {IconRemote, TextInput} from 'app/ui/base';
import {useLists} from 'home/hooks/use-lists';
import {useQuery} from 'app/data';
import {getList} from 'app/data/queries';
import {Button} from 'design';

export default function ScreenList() {
  const {id} = useParams<{id: string}>();
  const lists = useLists();
  const listId = useMemo(() => lists.getId(id), [id]);
  const listData = useQuery(getList(listId))[0];

  const update = lists.update.bind(null, listId);
  const nav = useNavigate();
  const {t} = useLingui();

  if (!listData) {
    nav('/lists');
    return null;
  }

  return (
    <Panel
      title={listData.name || t`Untitled`}
      message={`${0} / ${12} completed`}
      right={
        <View style={styles.list}>
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
          <View style={styles.actions}>
            <Button
              label={t`Go Back`}
              mode="Secondary"
              state="Default"
              onPress={() => nav('/lists')}
            />
          </View>
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
  actions: {
    flexDirection: 'row',
    marginBottom: theme.display.space5,
    gap: theme.display.space4,
  },
  input: {
    width: {
      initial: '100%',
      xxs: 120,
      sm: 215,
    },
    padding: theme.display.space2,
    paddingHorizontal: theme.display.space3,
    color: theme.colors.foreground,
    fontSize: theme.typography.size2,
    fontWeight: theme.typography.weightLight,
    lineHeight: theme.typography.lineHeight2,
    letterSpacing: theme.typography.letterSpacing2,
    fontFamily: theme.font.family,
    backgroundColor: theme.colors.card,
    borderRadius: theme.display.radius3,
    borderColor: theme.colors.border,
    borderWidth: 1,
  },
  list: {
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
