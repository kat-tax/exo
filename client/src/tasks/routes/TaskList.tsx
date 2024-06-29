import {Text} from 'react-native';
import {Link} from 'react-exo/navigation';
import {Trans} from '@lingui/macro';
import {useLingui} from '@lingui/react';
import {useStyles, createStyleSheet} from 'design/styles';
import {useLists} from 'tasks/hooks/useLists';
import {Page} from 'app/base/Page';

export default function TasksList() {
  const {styles} = useStyles(stylesheet);
  const tasks = useLists();
  useLingui();
  return (
    <Page title={<Trans>Tasks</Trans>}>
      {tasks.map(({id, complete}) =>
        <Link key={id} to={`/tasks/${id}`}>
          <Text style={[styles.link, complete && styles.strike]}>
            {`• ${id}`}
          </Text>
        </Link>
      )}
    </Page>
  );
}

const stylesheet = createStyleSheet(theme => ({
  link: {
    color: theme.colors.foreground,
  },
  strike: {
    textDecorationLine: 'line-through',
  },
}));

