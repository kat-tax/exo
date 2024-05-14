import {t} from '@lingui/macro';
import {Link} from 'react-exo/navigation';
import {Text} from 'react-native';
import {useStyles, createStyleSheet} from 'design/styles';
import {useLingui} from '@lingui/react';
import {useLists} from 'tasks/hooks/useLists';
import {Page} from 'core/base/Page';

export default function TasksList() {
  const {styles} = useStyles(stylesheet);
  const tasks = useLists();
  useLingui();
  return (
    <Page title={t`Tasks`}>
      {tasks.map(id =>
        <Link key={id} to={`/tasks/${id}`}>
          <Text style={styles.link}>{`• ${id}`}</Text>
        </Link>
      )}
    </Page>
  );
}

const stylesheet = createStyleSheet(theme => ({
  link: {
    color: theme.colors.foreground,
  },
}));

