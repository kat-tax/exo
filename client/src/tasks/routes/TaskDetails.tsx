import {useParams} from 'react-exo/navigation';
import {useTasks} from 'tasks/hooks/useTasks';
import {TaskItems} from 'tasks/base/TaskItems';
import {TasksInput} from 'tasks/base/TasksInput';
import {Page} from 'app/base/Page';

export default function TasksDetails() {
  const {id} = useParams<{id: string}>();
  const tasks = useTasks(id);
  return (
    <Page title={id}>
      <TaskItems {...tasks}/>
      <TasksInput onSubmit={tasks.addActive}/>
    </Page>
  );
}
