import {t} from '@lingui/macro';
import {Link} from 'react-exo/navigation';
import {useLingui} from '@lingui/react';
import {useLists} from 'mod/tasks/hooks/useLists';
import {Page} from 'mod/core/base/Page';

export function ScreenTaskList() {
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
