import {Screen} from 'app/ui/screen';
import {Teaser} from 'app/ui/teaser';

export default function ScreenDocs(_: ReactNavigation.ScreenProps<'MediaViewDocs'>) {
  return (
    <Screen>
      <Teaser/>
    </Screen>
  );
}
