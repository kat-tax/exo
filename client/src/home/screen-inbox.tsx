import {Screen} from 'app/ui/screen';
import {Teaser} from 'app/ui/teaser';

export default function ScreenInbox(_: ReactNavigation.ScreenProps<'HomeInbox'>) {
  return (
    <Screen>
      <Teaser/>
    </Screen>
  );
}
