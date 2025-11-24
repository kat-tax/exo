import {Screen} from 'app/ui/screen';
import {Teaser} from 'app/ui/teaser';

export default function ScreenBooks(_: ReactNavigation.ScreenProps<'MediaViewBooks'>) {
  return (
    <Screen>
      <Teaser/>
    </Screen>
  );
}
