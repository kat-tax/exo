import {Screen} from 'app/ui/screen';
import {Teaser} from 'app/ui/teaser';

export default function ScreenGames(_: ReactNavigation.ScreenProps<'MediaViewGames'>) {
  return (
    <Screen>
      <Teaser/>
    </Screen>
  );
}
