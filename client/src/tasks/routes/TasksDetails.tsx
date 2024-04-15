import {useLingui} from '@lingui/react';
import {useParams} from 'react-exo/navigation';
import {useTasks} from 'tasks/hooks/useTasks';
import {TasksList} from 'tasks/base/TasksList';
import {TasksInput} from 'tasks/base/TasksInput';
import {Page} from 'common/base/Page';

export default function TasksDetails() {
  const {id} = useParams<{id: string}>();
  const tasks = useTasks(id);
  useLingui();
  return (
    <Page title={id}>
      <TasksList {...tasks}/>
      <TasksInput onSubmit={tasks.addActive}/>
    </Page>
  );
}
