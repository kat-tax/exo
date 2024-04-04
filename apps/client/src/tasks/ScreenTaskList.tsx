import {t} from '@lingui/macro';
import {Link} from 'react-exo/router';
import {useLingui} from 'react-exo/i18n';
import {useLists} from 'tasks/hooks/useLists';
import {Page} from 'core/components/Page';

export default function ScreenTaskList() {
  const tasks = useLists();
  useLingui();
  return (
    <Page title={t`Tasks`}>
      {tasks.map(id =>
        <Link key={id} to={`/tasks/${id}`} style={{color: 'white'}}>
          {id}
        </Link>
      )}
    </Page>
  );
}
