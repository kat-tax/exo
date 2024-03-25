import {useLingui} from '@lingui/react';
import {useParams} from 'react-exo/navigation';
import {useTasks} from 'modules/tasks/hooks/useTasks';
import {TasksList} from 'modules/tasks/base/TasksList';
import {TasksInput} from 'modules/tasks/base/TasksInput';
import {Page} from 'common/base/Page';

export function ScreenTaskDetails() {
  const {id} = useParams<{id: string}>();
  const tasks = useTasks(id);
  useLingui();
  return (
    <Page title={id}>
      <TasksList {...tasks} />
      <TasksInput onSubmit={tasks.addActive}/>
    </Page>
  );
}
