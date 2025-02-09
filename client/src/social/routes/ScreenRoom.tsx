import {useParams, Route} from 'react-exo/navigation';
import {StreamMedia} from 'social/stacks/StreamMedia';

export default function ScreenRoom() {
  const {name} = useParams<{name: string}>();
  return name ? <StreamMedia name={name}/> : <Route path="/live"/>;
}
