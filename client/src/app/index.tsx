import {Data} from 'app/data';
import {I18n} from 'app/i18n';
import {Interface} from 'app/ui';
import {Navigator} from 'app/nav';

export default () => {
  return (
    <Data>
      <I18n>
        <Interface>
          <Navigator/>
        </Interface>
      </I18n>
    </Data>
  )
}
