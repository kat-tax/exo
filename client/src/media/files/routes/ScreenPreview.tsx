import {useParams} from 'react-exo/navigation';
import {Page} from 'app/base/Page';

export default function ScreenPreview() {
  const {id} = useParams<{id: string}>();
  return (
    <Page title={id}>
    </Page>
  );
}
