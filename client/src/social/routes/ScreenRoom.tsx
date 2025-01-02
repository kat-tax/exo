import {useParams, Route} from 'react-exo/navigation';
import {Stream} from 'social/stacks/Stream';

export default function ScreenRoom() {
  const {name} = useParams<{name: string}>();
  return name ? <Stream name={name}/> : <Route path="/live"/>;
}
