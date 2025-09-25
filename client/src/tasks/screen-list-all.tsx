import {View} from 'react-native';
import {Icon} from 'react-exo/icon';
import {StyleSheet} from 'react-native-unistyles';
import {useNavigation} from '@react-navigation/native';
import {useLingui} from '@lingui/react/macro';
import {Panel} from 'app/ui/panel';
import {Grid} from 'app/ui/grid';
import {GridCell} from 'app/ui/grid';
import {useQuery} from 'app/data';
import {getLists} from 'app/data/queries';
import {useLists} from 'tasks/hooks/use-lists';

export default function ScreenLists() {
  const lists = useLists();
  const data = useQuery(getLists);
  const nav = useNavigation();
  const {t} = useLingui();

  return (
    <Panel
      title={t`Lists`}
      message={t`Organize your tasks`}>
      <Grid>
        {data?.filter(list => list.name)?.map(({id, name, icon, color}) => (
          <GridCell
            key={id}
            focusKey={`list-${id}`}
            onPress={() => nav.navigate('TasksListDetails', {id})}
            onEditSelect={() => nav.navigate('TasksListEdit', {id})}>
            <View style={[styles.list, !name && styles.listAdd]}>
              <Icon.Remote
                name={icon ?? ''}
                size={'50%'}
                uniProps={(theme) => ({
                  color: color ?? theme.colors.foreground,
                })}
              />
            </View>
          </GridCell>
        ))}
        <GridCell
          focusKey="list-add"
          onPress={() => {
            const id = data?.find(list => !list.name)?.id ?? lists.create();
            if (id) nav.navigate('TasksListEdit', {id});
          }}>
          <View style={[styles.list, styles.listAdd]}>
            <Icon
              name="ph:plus"
              size={32}
              uniProps={(theme) => ({
                color: theme.colors.mutedForeground,
              })}
            />
          </View>
        </GridCell>
      </Grid>
    </Panel>
  );
}

const styles = StyleSheet.create((theme) => ({
  clock: {
    fontFamily: theme.font.family,
    fontSize: theme.typography.size7,
    fontWeight: theme.typography.weightThin,
    letterSpacing: theme.font.headerSpacing,
    color: theme.colors.foreground,
  },
  list: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.display.radius3,
    borderColor: theme.colors.border,
    borderWidth: 1,
    overflow: 'hidden',
  },
  listAdd: {
    backgroundColor: theme.colors.accent,
  },
}));
