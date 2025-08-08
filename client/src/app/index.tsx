import {Data} from 'app/data';
import {I18n} from 'app/i18n';
import {Theme} from 'app/theme';
import {Router} from 'app/router';

export default () => {
  return (
    <Data>
      <I18n>
        <Theme>
          <Router/>
        </Theme>
      </I18n>
    </Data>
  )
}
