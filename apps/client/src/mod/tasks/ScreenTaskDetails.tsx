import {useLingui} from '@lingui/react';
import {useParams} from 'react-exo/navigation';
import {useTasks} from 'mod/tasks/hooks/useTasks';
import {TasksList} from 'mod/tasks/base/TasksList';
import {TasksInput} from 'mod/tasks/base/TasksInput';
import {Page} from 'mod/core/base/Page';

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
